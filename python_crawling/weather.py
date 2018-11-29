import requests
import datetime
import json
import urllib.request
from bs4 import BeautifulSoup

def time_converter(time):
    converted_time = datetime.datetime.fromtimestamp(
        int(time)
    ).strftime('%I:%M %p')
    return converted_time

def get_html(url):
    _html = ""
    resp = requests.get(url)
    resp.encoding = None
    _html = resp.text
    soup = BeautifulSoup(_html, 'lxml')
    return soup


def url_builder(city_name):
    user_api = "a67bdedd22efbcc7a837bfa787649500"
    unit = 'metric'  # For Fahrenheit use imperial, for Celsius use metric, and the default is Kelvin.
    api = 'http://api.openweathermap.org/data/2.5/weather?q='

    full_api_url = api + str(city_name) + '&mode=json&units=' + unit + '&APPID=' + user_api
    return full_api_url

def get_weather(full_api_url):
    url = urllib.request.urlopen(full_api_url)
    output = url.read().decode('utf-8')
    raw_api_dict = json.loads(output)
    url.close()
    return raw_api_dict

def data_organizer(raw_api_dict):
    data = dict(
        city=raw_api_dict.get('name'),
        temp=raw_api_dict.get('main').get('temp'),
        temp_max=raw_api_dict.get('main').get('temp_max'),
        temp_min=raw_api_dict.get('main').get('temp_min'),
        humidity=raw_api_dict.get('main').get('humidity'),
        sky=raw_api_dict['weather'][0]['main'],
        dt=time_converter(raw_api_dict.get('dt'))
    )
    return data

def data_output(data):
    m_symbol = '\xb0' + 'C'
    print('---------------------------------------')
    print('���� {} ����:'.format(data['city']))
    print('���� ���: {}'.format(data['temp']), m_symbol, '����: {}'.format(data['sky']))
    print('�ְ� ���: {}, �������: {}'.format(data['temp_max'], data['temp_min']))
    print('')
    print('����: {}%'.format(data['humidity']))
    print('�ֱ� ������Ʈ�� �ð�: {}'.format(data['dt']))
    print('')
    print('---------------------------------------')

