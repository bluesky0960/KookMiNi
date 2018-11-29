import requests
import datetime
import json
import urllib.request
from bs4 import BeautifulSoup

def get_html(url):
    _html = ""
    resp = requests.get(url)
    resp.encoding = None
    _html = resp.text
    soup = BeautifulSoup(_html, 'lxml')
    return soup

def get_lib():
    html = get_html('https://www.kookmin.ac.kr/site/ecampus/info/library.htm')
    link = html.select('tbody')
    link = link[0].select('td')
    data = ""
    for i in range(3):
        data += '열람실명 : ' + link[i * 4 + 0].text + '\n'
        data += '총 좌석 : ' + link[i * 4 + 1].text + '\n'
        data += '잔여 좌석 : ' + link[i * 4 + 2].text + '\n'

    return(data)
