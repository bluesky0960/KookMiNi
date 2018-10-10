const request = require('request');
const cheerio = require('cheerio');
var Iconv = require('iconv').Iconv;

const url = "http://kmucoop.kookmin.ac.kr/restaurant/restaurant.php?w=1";

request(url, (error, response, body) => {
  if (error) throw error;

//    var strContents = new Buffer(body, 'binary');
//    var iconv = new Iconv('EUC-KR', 'UTF-8//TRANSLIT');
//    var strContents8 = iconv.convert(strContents).toString();
//    var $ = cheerio.load(strContents8);

    var $ = cheerio.load(body);
    console.log($('body > div > div > div.dv1 > div.smid > div.detail > table:nth-child(3) > tbody').text().trim());

});
/*
var strContents = new Buffer(body, 'binary');
    var iconv = new Iconv('euc-kr', 'utf-8');
    strContents = iconv.convert(strConTents).toString('utf-8');
    var $ = cheerio.load(strContents);


$('table').find('tr').each(function (index, elem) {
      if (index % 6 === 0) {
        krDay = $(this).find('th').text().trim();

        console.log(`${krDay}`);
      } else {
        corner = $(this).find('th').text().trim();
        menu = $(this).find('th').next().text().trim();

        console.log(`${corner} -> ${menu}`);
      }
    });
    */
