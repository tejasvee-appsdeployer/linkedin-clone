// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvB63z9XIjjr0hITusquzHVEfotJDhG0k",
  authDomain: "connectin-4d628.firebaseapp.com",
  projectId: "connectin-4d628",
  storageBucket: "connectin-4d628.appspot.com",
  messagingSenderId: "1010749080819",
  appId: "1:1010749080819:web:7bb2fd57eb061f755f6386"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const userAuth = getAuth();
const database = getFirestore(app);
const storage = getStorage(app);


export {app, userAuth, database, storage};