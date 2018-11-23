import * as firebase from 'firebase';

//let database;

let config = {
    apiKey: "AIzaSyBzCweZbwlYmy7MZLeO8vi2kMfpCvWxLKc",
    authDomain: "kookmini-73ede.firebaseapp.com",
    databaseURL: "https://kookmini-73ede.firebaseio.com",
    projectId: "kookmini-73ede",
    storageBucket: "kookmini-73ede.appspot.com",
    messagingSenderId: "99482876663"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

//database = firebase.database();

export default firebase;


/**
export const fire = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
  database = firebase.database();
};*/
