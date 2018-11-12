import React, { Component } from 'react';
import firebase, {auth, provider}from './firebase';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  //생성자 props는 부모 클래스에서 받아오는변하지 않는 값. 받아온 값은 수정할 수 없음
  //동적인 데이터는 state로 관리
    constructor(props){
        super(props);// 리액트 클래스의 생성자를 미리 실행후 state설정을 해준다.
        
        this.login = this.login.bind(this); 
        this.logout = this.logout.bind(this); 
        
        this.state={
          input:"",
          user: null
        };

        this.checkAuthState();
    }
    //버튼이 클릭되었을때 input값을 Text입력값으로 변경
    _handleText=(e)=>{
        this.setState({input: e.target.value});
    };

    //logout 버튼 실행시 user값 null
    logout = () =>{
      auth.signOut().then(() => {
          this.setState({
            user: null
          });
        });
    }
    //login 버튼 실행시 google login popup 뜨고 login 성공 시 user set
    login = () =>{
      auth.signInWithPopup(provider).then((result) => {
          const user = result.user;
          this.setState({
            user
          });
        });
    }
    //login 상태 확인
    checkAuthState = () =>{
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
        } 
      });
    }  
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
    note = (input) => {

        if (this.state.user === null) {
            alert("Google login 해주세요.");
        } else {
            var memoRef = firebase.database().ref('memos/' + this.state.user.uid);
            var txt = input;
            if (txt === '') {
                return;
            }
            memoRef.push({
                txt: txt,
                creatData: new Date().getTime()
            })
            alert("저장되었습니다.");
            this.setState({
                input:''
            })
          

      }     
    };

    //수정함수
    updata = () => {
        /**memoRef.update({
            txt: txt,
            createData: new Date().getTime(),
            updateData: new Date().getTime()
        });*/
    };


    //삭제 함수
    remove = () => {
    //x버튼을 누루면 
        if (!confirm('삭제하시겠습니까?')) {
            return;
        }
    };

    //검색 함수 : 일반 게시판처럼 단어 검색하면 그 단어 들어간 메모 출력해주는 함수
    search = (input) => {
        //https://firebase.google.com/docs/database/web/lists-of-data
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
          {this.state.user ?
            <button onClick={this.logout}>sign Out</button>                
            :
            <button onClick={this.login}>Sign in with Google</button>              
          }
          <button
              onClick={
                () => this.note(this.state.input)
              }>
            메모
          </button>
        </header>
      </div>
    );
  }
}

export default App;
