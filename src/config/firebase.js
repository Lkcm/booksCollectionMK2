import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBI3_RZUajXB6tKOXlpwjuXWwk0gOKYH1s",
  authDomain: "n-bkcollection.firebaseapp.com",
  projectId: "n-bkcollection",
  storageBucket: "n-bkcollection.appspot.com",
  messagingSenderId: "259644019855",
  appId: "1:259644019855:web:7efaeea481cb8e79688cfa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider() 