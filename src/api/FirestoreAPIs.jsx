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
  setDoc,
  deleteDoc,
} from "firebase/firestore";

// Creates a reference to a specific collection in the DB.
// If the collection does not exists, when I first insert a document, it will be created automatically.
const postsRef = collection(firestore, "posts");
const usersRef = collection(firestore, "users");
const likesRef = collection(firestore, "likes");

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
export const getSingleUser = (setCurrentProfile, email) => {
  const getUserQuery = query(usersRef, where("email", "==", email)); // I compare the email from the 'users' collection with the 'userEmail' from the posts collection.

  onSnapshot(getUserQuery, (res) => {
    const singleUser = res.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    })[0]; // Accessing the single user that matches the query.
    setCurrentProfile(singleUser);
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
          // Here I add the auto generated 'id' that firebase provided.
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

// Here I check if the user already liked the post, if he did, I delete his document from the "likes" collection, else, I add him.
export const likePost = async (userId, postId, likedPost) => {
  try {
    const likedPostRef = doc(likesRef, `${userId}_${postId}`); // Creating a refernce to a document that does not exists and give it the 'id' of "postId_userId".

    if (!likedPost) {
      await setDoc(likedPostRef, { userId, postId }); // Here I set a new "like" to the "likes" collection with the 'id' that I created.
    } else {
      await deleteDoc(likedPostRef); // Delete the document from the "likes" collection.
    }
  } catch (error) {
    console.log(error);
  }
};

// Getting the number of likes (users who liked) for each post.
// For example, if I have 3 users that liked a specific post, the "likes" collection
// will have an addition of 3 documents, then I can find those documents with a query and find the length of the array.
// The length of the array is equal to the number of users that liked this post.
// It will be the same if one user liked 3 different posts.
export const getLikesByUser = (
  userId,
  postId,
  setNumberOfLikesPerPost,
  setLikedPost
) => {
  const likedPostQuery = query(likesRef, where("postId", "==", postId)); // Find the specifc post.
  onSnapshot(likedPostQuery, (res) => {
    const usersWhoLiked = res.docs.map((doc) => doc.data());
    const usersCount = usersWhoLiked.length;
    const isLiked = usersWhoLiked.some((doc) => doc.userId === userId); // Checking if the current user already like the post. Then using the result in the "handleLike" function.
    setLikedPost(isLiked);
    setNumberOfLikesPerPost(usersCount); // Using setState to update the count in the page.
  });
};
