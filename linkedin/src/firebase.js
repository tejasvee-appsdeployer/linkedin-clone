// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
// import 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8AwOC9AnVhyHXXQSj21G7Uw5j_2Ck_vA",
  authDomain: "connectin-18eb8.firebaseapp.com",
  projectId: "connectin-18eb8",
  storageBucket: "connectin-18eb8.appspot.com",
  messagingSenderId: "732818305022",
  appId: "1:732818305022:web:c790c32d9e491ecb985aaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const userAuth = getAuth();
const database = getFirestore(app);
const storage = getStorage(app);

export {app, userAuth, database, storage};