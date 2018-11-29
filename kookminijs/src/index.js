import React, {Compoent} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App2 from './App';
import * as serviceWorker from './serviceWorker';
import request from 'react-http-request';
const cheerio = require('cheerio');



export default class App extends Compoent {
    render(){
        return (
            <request 
            url = 'https://www.kookmin.ac.kr/site/ecampus/info/library.htm'
            method = 'get'
            accept = 'application/json'
            verbose = {true}
    >
    {
        ({error, result, loading}) => {
            if( loading){
                return <div>loading...</div>;
            }else{
        return <div>{JSON.stringify(result)} </div>;
    }
}
}
            </request>
        );
}
}



ReactDOM.render(<App2 />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

