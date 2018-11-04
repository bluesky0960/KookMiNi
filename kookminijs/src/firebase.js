import * as firebase from 'firebase';

let database;

let config = {
    apiKey: "AIzaSyAphXzqH9dI-x4hveZ2LiaSTJrYZg3mAWU",
    authDomain: "kookmini-75897.firebaseapp.com",
    databaseURL: "https://kookmini-75897.firebaseio.com",
    projectId: "kookmini-75897",
    storageBucket: "kookmini-75897.appspot.com",
    messagingSenderId: "1639863058"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

database = firebase.database();

export default firebase;


/**
export const fire = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
  database = firebase.database();
};*/
