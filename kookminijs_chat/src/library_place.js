'use strict';
var fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const url = 'https://www.kookmin.ac.kr/site/ecampus/info/library.htm';

 module.exports.lib = function () {
    request(url, function (error, response, html) {
        if (error) { throw error };

        var $ = cheerio.load(html);

        try {
            var library = '';
            var library_totalsit = '';
            var library_availablesit = '';
            var library_unavailabletime = '';
            var data='';

            $('table').find('tr').each(function (index, elem) {
                $(this).find('td').each(function (index, elem) {
                    if(index===0){
                        library = $(this).text();
                        library_totalsit = $(this).next().text();
                        library_availablesit = $(this).next().next().text();
                        library_unavailabletime = $(this).next().next().next().text();

                        let seat={
                            Library:library,
                            Total_seat:library_totalsit,
                            Remain_seat:library_availablesit,
                            No_seat: library_unavailabletime
                        };

                        let data1 = JSON.stringify(seat);
                        fs.writeFileSync('library1.json',data1);

              // console.log(library);
              // console.log('총 좌석 -> ' + library_totalsit);
              // console.log('잔여좌석 -> ' + library_availablesit);
              // console.log('사용불가기간 -> ' + library_unavailabletime + '\n');
                        data += (library+'\n');
                        data += ('총 좌석 -> ' + library_totalsit+'\n');
                        data += ('잔여좌석 -> ' + library_availablesit+'\n');
                        data += ('사용불가기간 -> ' + library_unavailabletime + '\n'+ '\n');
              //fs.appendFileSync('library.txt', library+'\n'+library_totalsit+'\n'+library_availablesit+'\n'+library_unavailabletime);
                    }
                });
            });
        } catch (error) {
            console.error(error);
        }
        console.log(data);
    });
 }
