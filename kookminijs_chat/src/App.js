import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import {sendMessage} from'./chat';

class App extends Component {

    keyReset(){
        document.getElementById("question").value='';
    }

    //화면에 랜더링(표시)
    render() {
        const {feed, sendMessage} = this.props;
        return (
            <div>
                <h1>Kookmini</h1>
                <ul>
                    {feed.map(entry => <li> {entry.text} </li> )}
                </ul>
                <input type="text" id="question"
                       onKeyDown={(e) =>e.key === 'Enter' ? sendMessage(e.target.value):null}
                       onKeyPress={this.keyReset}
                />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    feed: state
});

export default connect(mapStateToProps, {
    sendMessage
})(App);
