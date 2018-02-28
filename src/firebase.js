
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAwopwTKsm4GC4dhFWXaAym4_Gmw9jPHig",
    authDomain: "crypto-tracker-1111.firebaseapp.com",
    databaseURL: "https://crypto-tracker-1111.firebaseio.com",
    projectId: "crypto-tracker-1111",
    storageBucket: "",
    messagingSenderId: "198571235688"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
