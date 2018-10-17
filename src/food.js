var cheerio = require('cheerio');
var request = require('request');

var url = "http://kmucoop.kookmin.ac.kr/restaurant/restaurant.php?w=1";

request(url, function(error, response, html){
  if (error) throw error;

  var $ = cheerio.load(html);

  try{
      $('table.ft1').find('tr').find('td').each(function(index, elem){

              //if(index==3) {
                  var date = $(this).text();


                  console.log(date);
              //}

        //console.log($(this).text());
      });
  }catch (error) {
      console.log(error);
  }


});

