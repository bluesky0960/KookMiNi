import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

import crawling
import lib

# Fetch the service account key JSON file contents
cred = credentials.Certificate('./kookmini-73ede-firebase-adminsdk-3e0v6-b7d2bdc17f.json')
# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://kookmini-73ede.firebaseio.com/'
})

data_weather = crawling.data_organizer(crawling.get_weather(crawling.url_builder('Seoul')))
data_lib = lib.get_lib()

# Save data
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

ref_lib = db.reference('/lib')
ref_lib.set(
    {
        'data' : data_lib
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