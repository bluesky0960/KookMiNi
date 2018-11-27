var cheerio = require('cheerio');  
var request = require('request');

var url = 'https://www.kookmin.ac.kr/site/ecampus/info/library.htm';  
request(url, function(error, response, html){  
    if (error) {throw error};
  
    var $ = cheerio.load(html);

    var seat = $('td' , $('.library-content-inner'));

    seat.each(function(){
        console.log($(this).text());
    })

    
});