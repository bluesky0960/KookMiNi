import * as firebase from 'firebase'
let database;
let config = {
    apiKey: "AIzaSyAphXzqH9dI-x4hveZ2LiaSTJrYZg3mAWU",
    authDomain: "kookmini-75897.firebaseapp.com",
    databaseURL: "https://kookmini-75897.firebaseio.com",
    projectId: "kookmini-75897",
    storageBucket: "kookmini-75897.appspot.com",
    messagingSenderId: "1639863058"
}

export const fire = () => {
   	firebase.initializeApp(config);
 	database = firebase.database()
}