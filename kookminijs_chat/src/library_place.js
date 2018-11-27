import * as firebase from 'firebase';
import Request from 'request';


const cheerio = require('cheerio');
const url = 'https://www.kookmin.ac.kr/site/ecampus/info/library.htm';

export const library = () => {
    var output ='';
    Request(url, function (error, response, html) {
        if (error) {
            throw error
        };

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

                        output +=  library ;
                        output += library_totalsit;
                        output += library_availablesit;
                        output += library_unavailabletime;
                    }
                });
            });
        } catch (error) {
            console.error(error);
        }
    });
    return output;
}


//export default {output}