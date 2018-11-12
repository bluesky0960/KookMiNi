import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import {sendMessage} from'./chat';

class App extends Component {
    constructor(props){
        super(props);// 리액트 클래스의 생성자를 미리 실행후 state설정을 해준다.

        this.state={
            input:"",
        };
    }

    _handleText=(e)=>{
        this.setState({input: e.target.value});
    };

    keyReset(){
        document.getElementById("question").value='';
    }

    //화면에 랜더링(표시)
    render() {
        const {feed, sendMessage} = this.props;
        return (
            <div>
                <h1>Kookmini</h1>
                <div style={{textAlign:'left'}}>
                    {feed.map(entry => <div> {entry.text} </div> )}
                </div>
                <div>
                    <textarea id="question" onChange={this._handleText} placeholder="궁금한점?"/>
                    <button >메모</button>
                    <button onClick={()=>{sendMessage(this.state.input)}}>입력</button>
                </div>
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
