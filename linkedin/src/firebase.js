// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDaropDCLadWq_C0jT8ppfc-WZ77yBG-bU",
	authDomain: "connectin-c7f41.firebaseapp.com",
	projectId: "connectin-c7f41",
	storageBucket: "connectin-c7f41.appspot.com",
	messagingSenderId: "324264830639",
	appId: "1:324264830639:web:997f1a832dc122d765165a",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const userAuth = getAuth();
const database = getFirestore(app);
const storage = getStorage(app);

export { app, userAuth, database, storage };
