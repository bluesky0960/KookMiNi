var cheerio = require('cheerio');
var request = require('request');
var answer="";
var url = 'https://www.kookmin.ac.kr/site/ecampus/info/library.htm';
request(url, function (error, response, html) {
    if (error) { throw error };

    var $ = cheerio.load(html);

    try {
        var library = '';
        var library_totalsit = '';
        var library_availablesit = '';
        var library_unavailabletime = '';

        $('table').find('tr').each(function (index, elem)
        {
            $(this).find('td').each(function (index, elem)
            {
                if(index==0){

                    library = $(this).text();
                    library_totalsit = $(this).next().text();
                    library_availablesit = $(this).next().next().text();
                    library_unavailabletime = $(this).next().next().next().text();

                    console.log(library);
                    console.log('총 좌석 -> ' + library_totalsit);
                    console.log('잔여좌석 -> ' + library_availablesit);
                    console.log('사용불가기간 -> ' + library_unavailabletime + '\n');
                    answer=library+"\n"
                }
            });
        });
    } catch (error) {
        console.error(error);
    }
});
