import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWNrAber3NsbFlG34gxIqO48Wo2wIAab4",
  authDomain: "linkedin-c801c.firebaseapp.com",
  projectId: "linkedin-c801c",
  storageBucket: "linkedin-c801c.appspot.com",
  messagingSenderId: "278138510034",
  appId: "1:278138510034:web:b18869660d7f58f6396b0b"
};

const app = initializeApp(firebaseConfig);
const userAuth = getAuth();
const database = getFirestore(app);
const storage = getStorage(app);

export { app, userAuth, database, storage };