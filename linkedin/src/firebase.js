import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getStorage } from "@firebase/storage";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCEOWfEbhAh8QE0xTPxYXCOfIZb6l-eQqw",
  authDomain: "connectin-7497a.firebaseapp.com",
  projectId: "connectin-7497a",
  storageBucket: "connectin-7497a.appspot.com",
  messagingSenderId: "970468099847",
  appId: "1:970468099847:web:86b5130b1278cb32b5a7a2"
};
const app = initializeApp(firebaseConfig);
const userAuth = getAuth();
const database = getFirestore(app);
const storage = getStorage(app);

export {app, userAuth, database, storage};