import { firestore } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

// Creates a reference to a specific collection in the DB.
// If the collection does not exists, when we first insert a document, it will be created automatically.
const dbRef = collection(firestore, "posts");

export const postStatus = async (status) => {
  const object = {
    status: status,
  };
  try {
    // addDoc returns a promise
    const response = await addDoc(dbRef, object);
    return response;
  } catch (error) {
    return error;
  }
};
