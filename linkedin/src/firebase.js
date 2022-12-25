// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeq811ybbqm5vmjjV7tsMi4-wMEQ_wB2A",
  authDomain: "connectin-41e2b.firebaseapp.com",
  projectId: "connectin-41e2b",
  storageBucket: "connectin-41e2b.appspot.com",
  messagingSenderId: "340680771310",
  appId: "1:340680771310:web:924ab4fd96f17d84e955ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const userAuth = getAuth();
const database = getFirestore(app);
const storage = getStorage(app);


export {app, userAuth, database, storage};