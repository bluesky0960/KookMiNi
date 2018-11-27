import React, { Component } from "react";
import firebase, { auth, provider } from "./firebase";
import { connect } from "react-redux";
import "./App.css";
import { sendMessage } from "./chat";

var request = require("request");
var lib_data = require("./library_place.js");
var data1 = lib_data.lib();
console.log(data1);

class App extends Component {
  constructor(props) {
    super(props); // 리액트 클래스의 생성자를 미리 실행후 state설정을 해준다.

    this.checkAuthState();

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      input: "",
      user: null
    };
  }

  _handleText = e => {
    console.log(typeof e.target.value);
    this.setState({ input: e.target.value });
  };

  //login 버튼 실행시 google login popup 뜨고 login 성공 시 user set
  login = () => {
    auth.signInWithRedirect(provider);
  };
  getRedirect = () => {
    auth.getRedirectResult().then(function(result) {
      const user = result.user;
      this.setState({
        user
      });
    });
  };

  //logout 버튼 실행시 user값 null
  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
    window.location.reload(); //페이지 새로고침
  };

  //login 상태 확인
  checkAuthState = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  };
  //입력 눌렀을 때 실행
  inputText = input => {
    const { sendMessage } = this.props;
    if (input === "") {
      return 0;
    } else {
      sendMessage(input);
      this.keyReset();
      this.setState({ input: "" });
      var d = document.getElementById("message");
      d.scrollTop = d.scrollHeight + 20;
      console.log(d);
    }
  };

  //메모 함수 구현
  note = input => {
    if (this.state.user === null) {
      alert("Google login 해주세요.");
    } else {
      var memoRef = firebase.database().ref("memos/" + this.state.user.uid);
      var txt = input;
      if (txt === "") {
        return;
      }
      memoRef.push({
        txt: txt,
        creatData: new Date().getTime()
      });
      alert("저장되었습니다.");
      this.setState({
        input: ""
      });
      this.keyReset();
    }
  };

  //검색 함수 : 일반 게시판처럼 단어 검색하면 그 단어 들어간 메모 출력해주는 함수
  search = input => {
    const { sendMessage } = this.props;
    if (this.state.user === null) {
      alert("로그인 먼저 해주세요");
      return 0;
    } else {
      var ref = firebase.database().ref("memos/" + this.state.user.uid);
      ref.on("child_added", function(e) {
        var message = e.val().txt;
        if (input === "") {
          sendMessage(message, "MEMO_LIST", "bot");
        } else {
          if (message.match(input)) {
            //console.log(message);
            sendMessage(message, "MEMO_LIST", "bot");
          }
        }
      });
      this.keyReset();
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
    /*
        if (!confirm('삭제하시겠습니까?')) {
            return;
        }
    */
  };

  //입력창 초기화
  keyReset() {
    document.getElementById("message_box").value = "";
  }

  //화면에 랜더링(표시)
  render() {
    const { feed } = this.props;
    return (
      <div className="Whole_container">
        <header className="Header">
          <div className="In_header">
            <div className="In_in_header">
              <h1>Kookmini</h1>
            </div>
            <div id="user-container">
              {this.state.user ? (
                <button className="sign_button" onClick={this.logout}>
                  sign Out
                </button>
              ) : (
                <button className="sign_button" onClick={this.login}>
                  Sign in with Google
                </button>
              )}
            </div>
          </div>
        </header>
        <main>
          <div className="in_main">
            <div className="in_in_main">
              <div className="message_card">
                <div id="search_from">
                  <textarea
                    type="text"
                    id="search_box"
                    onChange={this._handleText}
                    placeholder="?"
                  />
                  <button
                    id="button_2"
                    onClick={() => {
                      this.search(this.state.input);
                    }}
                  >
                    검색
                  </button>
                </div>
                <div id="message">
                  {feed.map(entry => (
                    <div sender={entry.sender}> {entry.text} </div>
                  ))}
                </div>
                <div id="message-form">
                  <textarea
                    type="text"
                    id="message_box"
                    value={this.state.input}
                    onChange={this._handleText}
                    placeholder="궁금한점?"
                  />
                  <button
                    id="button_2"
                    onClick={() => {
                      this.inputText(this.state.input);
                    }}
                  >
                    입력
                  </button>
                  <button
                    id="button_2"
                    onClick={() => {
                      this.note(this.state.input);
                    }}
                  >
                    메모
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  feed: state
});

export default connect(
  mapStateToProps,
  {
    sendMessage
  }
)(App);
