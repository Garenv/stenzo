import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCplXmTeVE4yshtL4oz5W2GIsbvXCIDptQ",
    authDomain: "stenzo.firebaseapp.com",
    databaseURL: "https://stenzo.firebaseio.com",
    projectId: "stenzo",
    storageBucket: "stenzo.appspot.com",
    messagingSenderId: "891482764185"
};

const fire = firebase.initializeApp(config);
export default fire;