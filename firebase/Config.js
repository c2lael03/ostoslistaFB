// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection,addDoc } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "apikey",
  authDomain: "shoppinglist-83441.firebaseapp.com",
  projectId: "shoppinglist-83441",
  storageBucket: "shoppinglist-83441.appspot.com",
  messagingSenderId: "452011294357",
  appId: "1:452011294357:web:699d03a95269c42705659c"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
const firestore = getFirestore();

const MESSAGES = 'messages';

export{
    firestore,
    collection,
    addDoc,
    MESSAGES
};