import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSRt3hjm0IgkFyftRzz-e65dQ2KFnu0SA",
  authDomain: "olx-clone-3a2b3.firebaseapp.com",
  projectId: "olx-clone-3a2b3",
  storageBucket: "olx-clone-3a2b3.appspot.com",
  messagingSenderId: "206030609894",
  appId: "1:206030609894:web:a54b562b30fe9b52980a27",
  measurementId: "G-Q1Q527H6N4"
};


export default firebase.initializeApp(firebaseConfig)