//// That API file handle the requests for both the 'users' and 'posts' collections.
import { firestore } from "../firebaseConfig";
import { toast } from "react-toastify";

import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

// Creates a reference to a specific collection in the DB.
// If the collection does not exists, when I first insert a document, it will be created automatically.
const postsRef = collection(firestore, "posts");
const usersRef = collection(firestore, "users");

export const postStatus = (postData) => {
  // addDoc returns a promise (response = promise). Here I add a new document to the "posts" collection.
  const response = addDoc(postsRef, postData);
  return response;
};

// Retrieving data from firestore "posts" collection.
// Using setState as the function param to change the state in "PostUpdate" component.
export const getPosts = async (setAllPosts) => {
  // Using the "onSnapshot" function to get real time updates whenever one of the documents that matches the query changes.
  // The "onSnapShot" function is being called whenever I add/delete/change a document to the firestore collection.
  // NOTE - It will be called automatically without the need to call the "getPosts()" function. This is a built in feature in firebase.
  // This is why the useEffect only needs to executes once.
  const allPostQuery = query(postsRef, orderBy("timeStamp"));
  onSnapshot(allPostQuery, (res) => {
    const postsArray = res.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setAllPosts(postsArray); // allPosts objects will contain an addition 'id' property.
  });
};

// Getting all the posts for a specific user in order to see his posts in his profile page.
export const getSingleUserPosts = (setAllPosts, id) => {
  const getPostsQuery = query(postsRef, where("userID", "==", id)); // Getting all the posts that their 'userEmail' is equal to the post's 'userEmail' that the user has pressed.
  onSnapshot(getPostsQuery, (res) => {
    const postsArray = res.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setAllPosts(postsArray);
  });
};

// Getting a specific user by his email adress.
export const getSingleUser = (setCurrentUser, email) => {
  const getUserQuery = query(usersRef, where("email", "==", email)); // I compare the email from the 'users' collection with the 'userEmail' from the posts collection.

  onSnapshot(getUserQuery, (res) => {
    const singleUser = res.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    })[0]; // Accessing the single user that matches the query.
    setCurrentUser(singleUser);
  });
};
// Adding new user to the 'users' collection.
export const postUserData = (userDataObject) => {
  addDoc(usersRef, userDataObject)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

// Passing setState as a function param to find the current user that logged in.
export const getCurrentUser = (setCurrentUser) => {
  // I retrieve all the users from the "users" collection and filter them until I find the current user.
  // The proccess using a combination of "map" and "filter" functions returns an array with 1 item so I'm accessing index 0.
  onSnapshot(usersRef, (res) => {
    setCurrentUser(
      res.docs
        .map((doc) => {
          // Here I overwrite the 'userID' property to be the auto generated ID of firebase in order to access the current user later in the app with this id.
          return { ...doc.data(), id: doc.id }; // Getting all users
        })
        .filter((user) => {
          return user.email === localStorage.getItem("userEmail"); // Checking if a user's email from firestore's "users" collection is equal to the current user's email.
        })[0]
    );
  });
};

// Edit the profile page (update the document).
export const editProfile = (userID, updatedData) => {
  const userToEditRef = doc(usersRef, userID);
  updateDoc(userToEditRef, updatedData)
    .then(() => {
      toast.success("Profile has been updated successfully!");
    })
    .catch((err) => {
      console.log(err);
      toast.error("Could not update profile");
    });
};
