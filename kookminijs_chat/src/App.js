//최종
import React, { Component } from "react";
import firebase, { auth, provider } from "./firebase";
import { connect } from "react-redux";
import "./App.css";
import { sendMessage } from "./chat";

class App extends Component {
    constructor(props) {
        super(props); // 리액트 클래스의 생성자를 미리 실행후 state설정을 해준다.

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            input: "",
            user: null
        };
    }

    
    _handleText = e => {
        this.setState({ input: e.target.value });
    };

    //login 버튼 실행시 google login popup 뜨고 login 성공 시 user set
    login = () => {
        auth.signInWithRedirect(provider);
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

    //자동으로 스크롤 내리기
    autoscroll() {
        var d = document.getElementById("message");
        d.scrollTop = d.scrollHeight;
        console.log(d);
    }     
    componentDidMount() {
        this.checkAuthState();
        this.autoscroll();
    }
    
    componentDidUpdate() {
        this.autoscroll();
    }
    //입력 눌렀을 때 실행
    inputText = input => {
        const { sendMessage } = this.props;
        if (input === "") {
            return 0;
        }
        else {
            sendMessage(input);
            this.keyReset();
            this.setState({ input: "" });
            this.autoscroll();
        }
        this.autoscroll();
    };

    //메모 함수 구현
    note = input => {
        if (this.state.user === null) {
            alert("Google login 해주세요.");
        }
        else {
            var memoRef = firebase.database().ref("memos/" + this.state.user.uid);
            var txt = input;
            if (txt === "") {
                return;
            }
        memoRef.push({
            txt: txt,
            creatData: new Date().getTime()
        });
        //alert("저장되었습니다.");
        this.setState({
            input: ""
        });
        this.keyReset();
        }
    };

    //search + list
    search = input => {
        const {sendMessage} = this.props;
        if (this.state.user === null) {
            alert("로그인 먼저 해주세요");
            return 0;
        }
        else {
            var ref = firebase.database().ref("memos/" + this.state.user.uid);
            ref.on("child_added", function (e) {
                var message = e.val().txt;
                var key = e.key;
                if (input === "") {
                    sendMessage(message, "MEMO_LIST", "bot_list", key);
                }
                else {
                    if (message.match(input)) {
                        sendMessage(message, "MEMO_LIST", "bot_list", key);

                    }
                }
            });
            this.keyReset();
        }
    }

    //삭제 함수
    delete(e){
        //x버튼을 누루면
        var tmp_key = firebase.database().ref("memos/" + this.state.user.uid + '/' + e);
        console.log(e);
        if (window.confirm("삭제 할거임?")) {
            tmp_key.remove();
        }
        else {
            return;
        }
    };

    //입력창 초기화
    keyReset() {
        document.getElementById("message_box").value = "";
        document.getElementById("search_box").value = "";
        this.setState({ input: "" });
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
                                <button className="sign_button" onClick={this.logout}>sign Out</button>
                            ): (
                                <button className="sign_button" onClick={this.login}>Sign in with Google</button>
                                )}
                            <button className="os_button">☆</button>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="in_main">
                        <div className="in_in_main">
                            <div className="message_card">
                                <div id="search_from">
                                    <textarea type="text" id="search_box"   placeholder="?" />
                                    <button id="button_2" onClick={() => { this.search(document.getElementById("search_box").value); }}>검색</button>

                                </div>
                                <div id="message">{feed.map(entry => (
                                    <div sender={entry.sender}>
                                        {entry.text}
                                        <button sender={entry.sender} onClick={() => {this.delete(entry.key);}}>X</button>      
                                    </div>
                                ))}
                                </div>
                                <div id="message-form">
                                    <textarea type="text" id="message_box" value={this.state.input}  onChange={this._handleText} placeholder="궁금한점?"/>
                                    <button id="button_2" onClick={() => {this.inputText(this.state.input);}}>입력</button>
                                    <button id="button_2" onClick={() => {this.note(this.state.input);}}>메모</button>
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
