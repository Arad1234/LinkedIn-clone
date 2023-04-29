import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
export const LoginAPI = (email, password) => {
  // Returning a promise ('response' = Promise {<pending>}) so i can use it to handle try/catch blocks in the app.
  let response = signInWithEmailAndPassword(auth, email, password);
  return response;
};

export const RegisterAPI = (email, password) => {
  // Returning a promise ('response' = Promise {<pending>}) so i can use it to handle try/catch blocks in the app.
  let response = createUserWithEmailAndPassword(auth, email, password);
  return response;
};

export const GoogleSingInAPI = async () => {
  let googleProvider = new GoogleAuthProvider();
  try {
    let res = await signInWithPopup(auth, googleProvider);
    return res;
  } catch (error) {
    return error;
  }
};

export const onLogout = async () => {
  try {
    let res = await signOut(auth);
    return res;
  } catch (error) {
    return error;
  }
};
