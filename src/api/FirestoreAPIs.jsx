import { firestore } from "../firebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

// Creates a reference to a specific collection in the DB.
// If the collection does not exists, when we first insert a document, it will be created automatically.
const dbRef = collection(firestore, "posts");

export const postStatus = async (postData) => {
  try {
    // addDoc returns a promise. Here we add a new document to the "posts" collection.
    const response = await addDoc(dbRef, postData);
    return response;
  } catch (error) {
    return error;
  }
};

// Retrieving data from firestore "posts" collection.
// Using setState as the function param to change the state in "PostUpdate" component.
export const getPosts = (setAllPosts) => {
  // Using the "onSnapshot" function to get real time updated whenever one of the documents that matches the query changes.
  onSnapshot(dbRef, (response) => {
    setAllPosts(
      response.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};
