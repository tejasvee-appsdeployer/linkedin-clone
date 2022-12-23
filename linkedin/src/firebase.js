import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy1ZARGCTM8z1qcMyW4IjImhxqr_Aysrc",
  authDomain: "linkedin-clone-c472f.firebaseapp.com",
  projectId: "linkedin-clone-c472f",
  storageBucket: "linkedin-clone-c472f.appspot.com",
  messagingSenderId: "443160916387",
  appId: "1:443160916387:web:18f5d62bfd9fdda2f82a16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const userAuth = getAuth();
const database = getFirestore(app);
const storage = getStorage(app);

export {app, userAuth, database, storage};