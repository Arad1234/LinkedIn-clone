import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
export const LoginAPI = (email, password) => {
  try {
    let response = signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    return error;
  }
};

export const RegisterAPI = (email, password) => {
  try {
    let response = createUserWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    return error;
  }
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
