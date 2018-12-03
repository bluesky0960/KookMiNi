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
        if(Result.metadata.intentName === 'library_seat'){
            var ref = firebase.database().ref("lib/");
            ref.on("child_added", function (e) {
                e.val();
            });
        }
        next(sendMessage(Result.fulfillment.speech, action.type, action.sender='bot'));
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
          
        case 'ON_MESSAGE':
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