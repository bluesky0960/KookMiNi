var cheerio = require('cheerio');
var request = require('request');

var url = "https://weather.naver.com/rgn/cityWetrMain.nhn";
request(url, function (error, response, html) {
  if (error) {throw error};

  var $ = cheerio.load(html);

  try{
      var place;
      $('tbody').find('tr').each(function(index, elem){
              $(this).find('th').find('a').each(function (index, elem) {
                  if(index==0) {
                      place = $(this).text().trim();
                      console.log(place);
                  }
              });
              $(this).find('td').find('li').each(function (index, elem) {
                  if(index==0 || index==1) {
                      var weather = $(this).text().trim();
                      console.log(weather);
                  }
              });

      });

  }catch (error) {
      console.error(error);
  }
});


