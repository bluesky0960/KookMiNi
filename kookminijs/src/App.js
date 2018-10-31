import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  //생성자 props는 부모 클래스에서 받아오는변하지 않는 값. 받아온 값은 수정할 수 없음
  //동적인 데이터는 state로 관리
    constructor(props){
        super(props);// 리액트 클래스의 생성자를 미리 실행후 state설정을 해준다.
        this.state={input:""};
    }
    //버튼이 클릭되었을때 input값을 Text입력값으로 변경
    _handleText=(e)=>{
        this.setState({input: e.target.value});
    };
    //input값으로 검색 default는 검색어가 스위치문에 없을시 실행
    search =(input)=>{
      switch (input) {
          case input = "드랍각":
              alert("말다했냐?");
              return 0;
          default:
              alert("아 몰라 시댕");
              return 0;
      }
    };
    //메모 함수 구현
    note=()=>{

    };
    //화면에 랜더링(표시)
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            이번에만 알려줄거임(사실 구라)
          </p>
          <input type="text"
              onChange={this._handleText}
                 placeholder="자 입력해 보아라"
          />
          <button
              onClick={
                () => this.search(this.state.input)}>
            검색
          </button>
          <button
              onClick={
                () => this.note()
              }>
            메모
          </button>
        </header>
      </div>
    );
  }
}

export default App;
