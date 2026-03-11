import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBet3IgN1ZCyhmRndnyEp2OYmsjrEUle98",
  authDomain: "aimsbbsr-30950.firebaseapp.com",
  projectId: "aimsbbsr-30950",
  storageBucket: "aimsbbsr-30950.firebasestorage.app",
  messagingSenderId: "93298011279",
  appId: "1:93298011279:web:b0cd2e984825bdd7f4d4fa",
  measurementId: "G-EQLQRC17TJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
