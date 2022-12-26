// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPWJJSTO1ksqlYfyOYQc3krmm3OEVcwe0",
  authDomain: "connectin-dacbf.firebaseapp.com",
  projectId: "connectin-dacbf",
  storageBucket: "connectin-dacbf.appspot.com",
  messagingSenderId: "488403830313",
  appId: "1:488403830313:web:12abd4a3cbedcb5515be38"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const userAuth = getAuth();
const database = getFirestore(app);
const storage = getStorage(app);

export { app, userAuth, database, storage };
