import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDWQorVh6enbFtMQ6wi1p985dL9qy6gdrs",
    authDomain: "olx-clone-292a8.firebaseapp.com",
    projectId: "olx-clone-292a8",
    storageBucket: "olx-clone-292a8.appspot.com",
    messagingSenderId: "481940484985",
    appId: "1:481940484985:web:69702bcdb20a0c8f44b5a8",
    measurementId: "G-5SW3FLPTQJ"
  };


export default firebase.initializeApp(firebaseConfig)