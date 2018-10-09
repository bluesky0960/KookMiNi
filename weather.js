//사용하기 위해서는 cheerio-httpcli 모듈이 필요하므로 
//cmd에 npm install cheerio - httpchli를 하여 모듈 설치

//기상 RSS
var RSS = "http://web.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109";
//모듈로드
var client = require('cheerio-httpcli');
//RSS모듈 다운로드
client.fetch(RSS, {}, function (err, $, res) {
    if (err) { console.log("error"); return; }
    //필요한 항목만 추출해서 표시
    var city = $("location:nth-child(1) > city").text();
    $("location:nth-child(1) > data").each(function (idx) {

        var tmEf = $(this).find('tmEf').text();//날짜
        var wf = $(this).find('wf').text();//날씨
        var tmn = $(this).find('tmn').text();//시간 처음
        var tmx = $(this).find('tmx').text();//시간 끝

        console.log(city + " " + tmEf + " " + wf + " " + tmn + "~" + tmx);
    });
});