import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import {getStorage} from '@firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyArJpCrCr3JWGA8ESbM_7TMlDkuN-coVtk",
  authDomain: "connectin-2e973.firebaseapp.com",
  projectId: "connectin-2e973",
  storageBucket: "connectin-2e973.appspot.com",
  messagingSenderId: "816172636908",
  appId: "1:816172636908:web:6da1f2a32902e15be023c9"
};

const app = initializeApp(firebaseConfig);
const userAuth = getAuth();
const database = getFirestore(app);
const storage = getStorage(app);

export {app, userAuth, database, storage};
