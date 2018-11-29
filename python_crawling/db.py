import firebaseDB as db
import schedule
import time

'''
db.db_weather()
db.db_food()
db.db_lib()
'''
schedule.every(1).minutes.do(db.db_lib)
schedule.every().monday.at("09:00").do(db.db_food)
schedule.every(60).minutes.do(db.db_weather)
while 1:
    schedule.run_pending()
    



