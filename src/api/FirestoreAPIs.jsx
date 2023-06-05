//// That API file handle the requests for both the 'users' and 'posts' collections.
import { firestore, storage } from "../firebaseConfig";
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
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Creates a reference to a specific collection in the DB.
// If the collection does not exists, when I first insert a document, it will be created automatically.
const postsRef = collection(firestore, "posts");
const usersRef = collection(firestore, "users");
const likesRef = collection(firestore, "likes");
const commentsRef = collection(firestore, "comments");
const connectionsRef = collection(firestore, "connections");

export const postStatus = (postData) => {
  // addDoc returns a promise (response = promise<pending>). Here I add a new document to the "posts" collection.
  const response = addDoc(postsRef, postData);
  return response;
};

// Deleting post.
export const deletePost = async (postID) => {
  const postRef = doc(postsRef, postID);
  await deleteDoc(postRef);
};

export const updatePostStatus = async (status, postID) => {
  const postRef = doc(postsRef, postID);
  await updateDoc(postRef, { status: status });
};

// Retrieving data from firestore "posts" collection.
// Using setState as the function param to change the state in "PostUpdate" component.
export const getPosts = (setAllPosts, setLoading) => {
  // Using the "onSnapshot" function to get real time updates whenever one of the documents that matches the query changes.
  // The "onSnapShot" function is being called whenever I add/delete/change a document to the firestore collection.
  // NOTE - It will be called automatically without the need to call the "getPosts()" function. This is a built in feature in firebase.
  // This is why the useEffect only needs to executes once.
  setLoading(true);
  const allPostQuery = query(postsRef, orderBy("timeStamp"));
  const closeSocketConnection = onSnapshot(allPostQuery, (res) => {
    const postsArray = res.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setAllPosts(postsArray); // allPosts objects will contain an additional 'id' property.
    setLoading(false);
  });
  return closeSocketConnection;
};

// Getting all the posts for a specific user in order to see his posts in his profile page.
export const getSingleUserPosts = (setAllPosts, id) => {
  const getPostsQuery = query(postsRef, where("userID", "==", id)); // Getting all the posts that their 'userEmail' is equal to the post's 'userEmail' that the user has pressed.
  const closeSocketConnection = onSnapshot(getPostsQuery, (res) => {
    const postsArray = res.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setAllPosts(postsArray);
  });
  return closeSocketConnection;
};

// Getting a specific user by his id.
export const getSingleUser = (setCurrentProfile, id) => {
  const getUserQuery = query(usersRef, where("userID", "==", id)); // I compare the userId from the users collection with the id of the user.

  const closeSocketConnection = onSnapshot(getUserQuery, (res) => {
    const singleUser = res.docs.map((doc) => {
      return { ...doc.data(), id: doc.id }; // Adding the firebase id so I can get a reference to a specific document using the "doc" function.
    })[0]; // Accessing the single user that matches the query.
    setCurrentProfile(singleUser);
  });

  return closeSocketConnection;
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
  // The proccess using a combination of "map" and "filter" functions returns an array with 1 item so I retrieve the item at index 0.
  const closeSocketConnection = onSnapshot(usersRef, (res) => {
    const currentUser = res.docs
      .map((doc) => {
        // Here I add the auto generated 'id' that firebase provides.
        return { ...doc.data(), id: doc.id }; // Getting all users
      })
      .filter((user) => {
        return user.email === localStorage.getItem("userEmail"); // Checking if a user's email from firestore's "users" collection is equal to the current user's email.
      })[0];
    setCurrentUser(currentUser);
  });
  return closeSocketConnection;
};

// Edit the profile page (update the document).
export const editProfile = (userID, updatedData) => {
  const userToEditRef = doc(usersRef, userID);
  // Sends a PATCH request (firebase).
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
export const likePost = async (userID, postID, likedPost) => {
  try {
    const likedPostRef = doc(likesRef, `${userID}_${postID}`); // Creating a refernce to a document that does not exists and give it the 'id' of "postId_userId".
    if (!likedPost) {
      // This line automatically calls the onSnapshot in the "getLikesByUser" endpoint.
      await setDoc(likedPostRef, { userID, postID }); // Here I set a new "like" to the "likes" collection with the 'id' that I created.
    } else {
      // This line automatically calls the onSnapshot in the "getLikesByUser" endpoint.
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
export const getLikesByUser = (
  userId,
  postId,
  setNumberOfLikesPerPost,
  setLikedPost
) => {
  const likedPostQuery = query(likesRef, where("postID", "==", postId)); // Find the specifc post.
  const closeSocketConnection = onSnapshot(likedPostQuery, (res) => {
    const usersWhoLiked = res.docs.map((doc) => doc.data());
    const usersCount = usersWhoLiked.length;
    const isLiked = usersWhoLiked.some((doc) => doc.userID === userId); // Checking if the current user already like the post. Then using the result in the "handleLike" function that is located in the "LikeButton" folder.
    setLikedPost(isLiked);
    setNumberOfLikesPerPost(usersCount); // Using setState to update the likes count in the page.
  });
  return closeSocketConnection;
};

// Add new comment to the "comments" collection
// Transferring the promise to the "postComment" funtion call - handling the errors there.
export const postComment = (postID, userName, comment, timeStamp) => {
  // This line calls the onSnapshot in the "getComments" endpoint.
  const res = addDoc(commentsRef, { postID, userName, comment, timeStamp });
  return res;
};

// Getting the number of comments for each post.
export const getComments = (postID, setAllComments) => {
  const singlePostQuery = query(commentsRef, where("postID", "==", postID));

  const closeSocketConnection = onSnapshot(singlePostQuery, (res) => {
    const comments = res.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }; // Spreading the doc.data() to retrieve the fields separately.
    });
    setAllComments(comments);
  });
  return closeSocketConnection;
};

// Getting all users from the users collection.
export const getAllUsers = async (setAllUsers) => {
  const querySnapshot = await getDocs(usersRef);
  const allUsers = [];
  querySnapshot.forEach((doc) => {
    allUsers.push({ ...doc.data(), id: doc.id });
  });
  setAllUsers(allUsers);
};

export const getSearchedUsers = async (setAllUsers, searchQuery) => {
  const usersQuery = query(
    usersRef,
    where("name", ">=", searchQuery),
    where("name", "<=", searchQuery + "\uf8ff")
  );
  const usersArray = [];
  const usersQuerySnapshot = await getDocs(usersQuery);
  usersQuerySnapshot.forEach((doc) => {
    usersArray.push(doc.data());
  });
  setAllUsers(usersArray);
};
export const uploadProfileImage = async (file, currentProfileID, setUrl) => {
  // Getting a reference of the profileImage for each user using the "currentProfileID".
  const profileImageFolderRef = ref(
    storage,
    `images/${currentProfileID}/profileImage.jpeg`
  );
  try {
    // Uploading new profile image to replace the existing one or to create a new one
    await uploadBytes(profileImageFolderRef, file);
    const url = await getDownloadURL(profileImageFolderRef);
    // Updates the user's "ProfileImageUrl" property in the users collection.
    const currentProfileRef = doc(usersRef, currentProfileID);
    await updateDoc(currentProfileRef, { ProfileImageUrl: url });
    setUrl(url);
  } catch (error) {
    console.log(error);
  }
};

export const getProfileImage = async (currentProfileID, setUrl) => {
  // Every time the component mounts this function will be called.
  const currentProfileRef = doc(usersRef, currentProfileID);
  const userSnapShot = await getDoc(currentProfileRef);
  const docData = userSnapShot.data();
  if (docData.ProfileImageUrl) {
    setUrl(docData.ProfileImageUrl);
  }
};

// currentUserID is the current user that logged to the app, userConnectionID is the user to add to the connections of the current user.
export const addConnection = async (currentUserID, userConnectionID) => {
  const connectionToAddRef = doc(
    connectionsRef,
    `${currentUserID}_${userConnectionID}`
  );
  await setDoc(connectionToAddRef, { currentUserID, userConnectionID });
  toast.success("Connection Added!");
};

// Getting all the connections of the current user.
export const getConnections = (userID, userWhoUploadPostID, setIsConnected) => {
  try {
    const connectedQuery = query(
      connectionsRef,
      where("currentUserID", "==", userID)
    );

    var closeConnectionsSocket = onSnapshot(connectedQuery, (res) => {
      const connections = res.docs.map((doc) => {
        return doc.data();
      });
      // Check if the connections array - all the connections of the current user, contains the user that upload that specific post.
      const isConnected = connections.some(
        (connection) => connection.userConnectionID === userWhoUploadPostID
      );
      setIsConnected(isConnected);
    });
  } catch (error) {
    console.log(error);
  }
  return closeConnectionsSocket;
};
