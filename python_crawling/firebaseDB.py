import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import datetime
import pandas

import weather
import data

# Fetch the service account key JSON file contents
cred = credentials.Certificate('./kookmini-73ede-firebase-adminsdk-3e0v6-b7d2bdc17f.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://kookmini-73ede.firebaseio.com/'
})

monday = pandas.date_range(start='20180901', end='20201231',freq='W-MON')

friday = monday + datetime.timedelta(+4)

print(monday)
print(friday)

# Save data
def db_weather():
    data_weather = weather.data_organizer(weather.get_weather(weather.url_builder('jeju')))
    ref_weather = db.reference('/weather')
    ref_weather.set(
        {
            data_weather['city']:
                                {
                                'temp' : data_weather['temp'],
                                'temp_max' : data_weather['temp_max'],
                                'temp_min' : data_weather['temp_min'],
                                'humidity' : data_weather['humidity'],
                                'sky': data_weather['sky'],
                                'dt' : data_weather['dt']
                                },
        }
    )

def db_lib():
    data_lib = data.get_lib()
    ref_lib = db.reference('/lib')
    ref_lib.set(
        {
            'data' : data_lib
        }
    )
    
def db_food():
    data_food_hak = data.get_hak()
    data_food_bup = data.get_bup()
    ref_food = db.reference('/food')
    ref_food.set(
        {
            '법학관' :
                    {
                        '월요일' : data_food_bup[0],
                        '화요일' : data_food_bup[1],
                        '수요일' : data_food_bup[2],
                        '목요일' : data_food_bup[3],
                        '금요일' : data_food_bup[4],
                        '토요일' : data_food_bup[5],
                        '일요일' : data_food_bup[6],
                    },
            '학생식당' :
                    {
                        '월요일' : data_food_hak[0],
                        '화요일' : data_food_hak[1],
                        '수요일' : data_food_hak[2],
                        '목요일' : data_food_hak[3],
                        '금요일' : data_food_hak[4],
                        '토요일' : data_food_hak[5],
                        '일요일' : data_food_hak[6],
                    }        
        }
    )   


"""
# Update data
ref = db.reference('boxes')
box_ref = ref.child('box001')
box_ref.update({
    'color': '
    blue'
})

# Multi-path update data
ref = db.reference('boxes')
ref.update({
    'box001/color': 'red',
    'box002/color': 'blue'
})

"""