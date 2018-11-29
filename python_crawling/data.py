import requests
from bs4 import BeautifulSoup
def get_html(url):
        _html = ""
        resp = requests.get(url)
        resp.encoding = None
        _html = resp.text
        soup = BeautifulSoup(_html, 'lxml')
        return soup

    
def get_lib():
    html= get_html('https://www.kookmin.ac.kr/site/ecampus/info/library.htm')
    link = html.select('tbody')
    link = link[0].select('td')
    data = "";
    for i in range(3):
        data += '열람실 명 : ' + link[i*4+0].text + '\n'
        data += '총 좌석 : ' + link[i*4+1].text + '\n'
        data += '잔여 좌석 : ' + link[i*4+2].text + '\n'

    return data


def get_food():
    data = ""
    data += '법식'
    html = get_html("http://kmucoop.kookmin.ac.kr/restaurant/restaurant.php?w=1")
    link = html.select('table')
    link = link[3].select('td > table')
    food = ['','','','','','',''];
    for i in range(7):
        for j in range(7):
            tmp = link[i*7+j].find_all('td')
            s = '';
            for k in tmp:
                s += str(k);
            l = s.split('<')
            l = [l[i] for i in range(len(l)) if( i%2 == 1)]
            l = [x.split('>')[1] for x in l]
            l = [x for x in l if(x != "")]
            
            for k in range(0,len(l)-1,2):
                s = ''
                if( ',' in l[k+1] ):
                    s = l[k] + ' : ' + l[k+1] + "\n"
                    k += 1
                else :
                    s = l[k]
                    s += l[k+1]
                    k += 1
                food[j] += s

    return food

def get_hak():
    data = ""
    data += '학식'
    html = get_html("http://kmucoop.kookmin.ac.kr/restaurant/restaurant.php?w=2")
    link = html.select('table')
    link = link[3].select('td > table')
    food = ['','','','','','',''];
    for i in range(9):#11
        for j in range(7):#7
            tmp = link[i*7+j].find_all('td')
            
            s = '';
            for k in tmp:
                s += str(k);
            l = s.split('<')
            #print(l)
            #l = [l[i] for i in range(len(l)) if( i%2 == 1)]
            #print(l)
            l = [x for x in l if(x != "")]
            l = [x.split('>')[1] for x in l]
            #print(l)
            l = [x for x in l if( (x != "")and(len(x)>=3) )]
            #print(l)
            l = [x.replace('\n', '') for x in l ]
            '''
            for k in range(len(l)):
                s = ''
                if( ',' in l[k+1] ):
                    s = l[k] + ' : ' + l[k+1] + "\n"
                    k += 1
                else :
                    s = l[k]
                    s += l[k+1]
                    k += 1
                food[j] += s
            '''
            s = ''
            for k in range(len(l)):
                
                if( k == len(l)-1):
                    s = s + ' : ' + l[k] + "\n"
                else :
                    s = s + l[k]
            food[j] += s
            
        
    return food

