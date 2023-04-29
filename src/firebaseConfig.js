// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5ryj2eqzBI2Ji6MdfkqwxB8VHEQz_hJg",
  authDomain: "linkedin-clone-e72cc.firebaseapp.com",
  projectId: "linkedin-clone-e72cc",
  storageBucket: "linkedin-clone-e72cc.appspot.com",
  messagingSenderId: "1015836878977",
  appId: "1:1015836878977:web:d304caafa497bf2a854580",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const firestore = getFirestore(app); //// Creates a firestore instance that I can use to interact with the DB.
export { auth, app, firestore };
