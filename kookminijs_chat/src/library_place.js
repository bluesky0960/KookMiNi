import * as firebase from 'firebase';
import Request from 'request';

const myInit = {
    method: 'GET',
    mode: 'no-cors',
    cache: 'default',
    credentials: 'include'};

const cheerio = require('cheerio');
const url = 'https://www.kookmin.ac.kr/site/ecampus/info/library.htm';
const myrequest = new Request(url, myInit);

export const library = () => {
    myrequest(url, function (error, response, html) {
        if (error) {
            throw error
        }
        ;

        var $ = cheerio.load(html);

        try {
            var library = '';
            var library_totalsit = '';
            var library_availablesit = '';
            var library_unavailabletime = '';

            $('table').find('tr').each(function (index, elem) {
                $(this).find('td').each(function (index, elem) {
                    if (index === 0) {

                        library = $(this).text();
                        library_totalsit = $(this).next().text();
                        library_availablesit = $(this).next().next().text();
                        library_unavailabletime = $(this).next().next().next().text();

                        var memoRef = firebase.database().ref('memos/' + this.state.user.uid);

                        memoRef.push({
                            libarary_name: library,
                            libarary_totalsit: library_totalsit,
                            library_availablesit: library_availablesit,
                            library_unavailabletime: library_unavailabletime
                        });
                        alert("저장되었습니다.");

                        //console.log(library);
                        //console.log('총 좌석 -> ' + library_totalsit);
                        //console.log('잔여좌석 -> ' + library_availablesit);
                        //console.log('사용불가기간 -> ' + library_unavailabletime + '\n');
                    }
                });
            });
        } catch (error) {
            console.error(error);
        }
    });
}