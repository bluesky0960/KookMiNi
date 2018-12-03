import {ApiAiClient} from 'api-ai-javascript';
import {applyMiddleware,createStore} from 'redux';
import "./App.css";
import firebase from "./firebase";

const accessToken = 'bc9ce7abbed5492895de4cc772b1439a';
const client = new ApiAiClient({accessToken});

//const ON_MESSAGE = 'ON_MESSAGE';
//memo = memo.replace("\n", "<br>");
export const sendMessage = (text, type = 'ON_MESSAGE', sender='user', key) => ({
    type: type,
    payload: { text, sender, key }
});

const messageMiddleware = () => next => action =>{
    next(action);
    function onSuccess(response){
        const {result: Result} = response;
        //console.log(Result.metadata.intentName);
        //console.log(action.type);
        const intent = Result.metadata.intentName;
        //console.log(intent);
        switch(intent){
            case 'library_seat':
                var lib = firebase.database().ref("lib/");
                lib.on("child_added", function (e) {
                    var txt = e.val();
                    var key = e.key;
                    next(sendMessage(txt, action.type, action.sender='bot'));
                });
                break;


            case 'food':
                var time = new Date();
                var dd = time.getDate().toString();
                var month = (time.getMonth()+1).toString();
                var year = time.getFullYear().toString();
                if(dd<10){dd='0'+dd};
                if(month<10){month ='0' + month};
                var today = year+'-'+month+'-'+dd;
                console.log(today);
                var food = firebase.database().ref("food/"+today);
                food.on("child_added", function (e) {
                    var txt = e.val();

                    next(sendMessage(txt, action.type, action.sender='bot'));
                });
                break;
            case 'weather':
                var weather = firebase.database().ref("weather/Seoul/");
                weather.on("value", function (e) {
                    var txt = e.val();
                    var result ="현재 기온 : " + txt.temp  +
                        "\n대기 상태 : " + txt.sky +
                        "\n현재 습도 : "+ txt.humidity + "%" +
                        "\n최고 기온 : " + txt.temp_max +
                        "\n최저 기온 : " + txt.temp_min +
                        "\n갱신 시각 : " + txt.dt ;
                    //var key = e.key;
                    next(sendMessage(result, action.type, action.sender='bot'));
                });
                break;

            default:
                next(sendMessage(Result.fulfillment.speech, action.type, action.sender='bot'));
        }





        /*if(Result.metadata.intentName === 'library_seat'){
            console.log(Result.metadata.intentName);
            var ref = firebase.database().ref("lib/");
            ref.on("child_added", function (e) {
                e.val();
            });
        }*/
    }
    if(action.type === 'ON_MESSAGE'){
        const {text} = action.payload;

        client.textRequest(text)
            .then(onSuccess)
    }
};

//const initState = [{ text: "안녕, 난 국미니라고 해~" }];

const messageReducer = (state = [], action) => {
    switch (action.type) {
        case 'MEMO_LIST':
          console.log(action.payload);
          return [...state, action.payload];

         case  'ON_MESSAGE':
            //console.log(action.payload);
            return [...state, action.payload];

        case 'LIB_LIST':
            return [...state, action.payload];

        case 'WEATHER_LIST':
            console.log(action.payload);
            return [...state, action.payload];


        default:
            return state;
  }
};

export const store = createStore(messageReducer, applyMiddleware(messageMiddleware));