import * as firebase from 'firebase';
import 'firebase/auth'

export var firebaseConfig = {
  apiKey: "AIzaSyCZtt7Q8kDbGKrwisQ8hbSENNoYfiiBfWk",
  authDomain: "thenews-953b4.firebaseapp.com",
  databaseURL: "https://thenews-953b4.firebaseio.com",
  projectId: "thenews-953b4",
  storageBucket: "thenews-953b4.appspot.com",
  messagingSenderId: "83690664361",
  appId: "1:83690664361:web:724657d699c193a847d4b8"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);