import {ApiAiClient} from 'api-ai-javascript';
import {applyMiddleware,createStore} from 'redux';
import "./App.css";

const accessToken = 'bc9ce7abbed5492895de4cc772b1439a';
const client = new ApiAiClient({accessToken});

//const ON_MESSAGE = 'ON_MESSAGE';
//memo = memo.replace("\n", "<br>");
export const sendMessage = (text, type = 'ON_MESSAGE', sender='user') => ({
    type: type,
    payload: { text, sender }
});

const messageMiddleware = () => next => action =>{
    next(action);
    function onSuccess(response){
        const {result: {fulfillment}} = response;
        next(sendMessage(fulfillment.speech, action.type, action.sender='bot'));
    }
    if(action.type === 'ON_MESSAGE'){
        const {text} = action.payload;

        client.textRequest(text)
            .then(onSuccess)
    }
};

//const initState = [{ text: "안녕, 난 국미니라고 해~" }];

const messageReducer = (state = [], action) => {
  switch(action.type){
      case 'MEMO_LIST':
          //console.log(action.payload);
          return [...state, action.payload];

      case  'ON_MESSAGE':
          //console.log(action.payload);
          return [...state, action.payload];

      default:
          return state;
  }
};

export const store = createStore(messageReducer, applyMiddleware(messageMiddleware));