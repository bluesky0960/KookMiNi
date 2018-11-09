import {ApiAiClient} from 'api-ai-javascript';
import {applyMiddleware,createStore} from 'redux';

const accessToken = 'bc9ce7abbed5492895de4cc772b1439a';
const client = new ApiAiClient({accessToken});

const ON_MESSAGE = 'ON_MESSAGE';

export const sendMessage = (text, sender='user') => ({
    type: ON_MESSAGE,
    payload: {text, sender}
});

const messageMiddleware = () => next => action =>{
    next(action);
    function onSuccess(response){
        const {result: {fulfillment}} = response;
        next(sendMessage(fulfillment.speech,'bot'));
    }

    if(action.type === ON_MESSAGE){
        const {text} = action.payload;

        client.textRequest(text)
            .then(onSuccess)


    }
};

//const initState = [{ text: 'hey' }];

const messageReducer = (state = [], action) => {
  switch(action.type){

      case  ON_MESSAGE:
          return [...state, action.payload];

      default:
          return state;
  }
};

export const store = createStore(messageReducer, applyMiddleware(messageMiddleware));