import React, { useContext, useState, useEffect, useRef } from "react";
import PostsCard from "../PostsCard";
import { BiPencil } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { profileUserContext } from "../../../layouts/ProfileLayout";
import {
  getSingleUser,
  getSingleUserPosts,
  getProfileImage,
} from "../../../api/FirestoreAPIs";
import { uploadBytes } from "firebase/storage";
import "./index.scss";
import Loader from "../Loader";
import ProfileImage from "./ProfileImage";

const ProfileCard = (props) => {
  const { onEdit } = props;
  // I'm getting the currentUser to check if I clicked the current user's post or another user's post.
  const currentUser = useContext(profileUserContext);
  // With the useLocation hook I can check what profile to render according to what the user clicked.
  // Using the state object passed from the 'navigate' instance that located in 'PostsCard' folder.
  const location = useLocation();
  const [allPosts, setAllPosts] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileReference, setFileReference] = useState(null);
  const [currentProfile, setCurrentProfile] = useState({});

  // Using useEffect to open the initial websocket connection with firestore.
  useEffect(() => {
    const closeUserConnection = getSingleUser(
      setCurrentProfile,
      location.state.id
    );

    // Getting the posts of the user that I'm in his profile page.
    const closePostsConnection = getSingleUserPosts(
      setAllPosts,
      location.state.id
    );

    const profileImageFolderRef = getProfileImage(setUrl, setLoading);
    setFileReference(profileImageFolderRef);
    return () => {
      // Closing sockets connections.
      closeUserConnection();
      closePostsConnection();
    };
  }, []);

  const handleFileSelected = async (event) => {
    const file = event.target.files[0];
    // Uploading the image with the same reference (fileReference) so it will replace the existing image.
    await uploadBytes(fileReference, file);
    // Getting the new profile image that the user just uploaded and setting it's url accordingly.
    getProfileImage(setUrl, setLoading);
  };

  // If the current profile or all posts has not been fetched yet, render the Loader component.
  if (
    Object.keys(currentProfile).length === 0 ||
    allPosts.length === 0 ||
    !fileReference
  ) {
    return <Loader />;
  }
  return (
    <>
      <div className="profile-card">
        <div className="image-edit-icons">
          <ProfileImage
            loading={loading}
            url={url}
            handleFileSelected={handleFileSelected}
          />
          {/* Checking if the user entered his own profile. If he does, he can edit, else, unshow the pencil icon */}
          {location?.state?.id === currentUser.userID ? (
            <div className="edit-btn">
              <BiPencil
                size={23}
                className="edit-icon"
                onClick={onEdit}
              />
            </div>
          ) : null}
        </div>

        <div className="profile-info">
          <div>
            <h4 className="userName">{currentProfile.name}</h4>
            <p className="headline">{currentProfile.headline}</p>
            <p className="location">
              {!currentProfile.city && !currentProfile.country
                ? null
                : `${currentProfile.city} ${currentProfile.country}`}
            </p>
            {/* I created <a> tag to enter the website of the user. */}
            <a
              href={currentProfile.website}
              target="_blank" // To open the link in a new tab.
              className="website"
            >
              {currentProfile.website}
            </a>
            <p className="skills">
              <span className="skill-label">Skills:</span>&nbsp;
              {currentProfile.skills}
            </p>
          </div>
          <div className="right-info">
            <p className="college">{currentProfile.college}</p>
            <p className="company">
              {currentProfile.company
                ? `Company: ${currentProfile.company}`
                : null}
            </p>
          </div>
        </div>
      </div>
      <div className="about-card">
        <label>About</label>
        <p>{currentProfile.about}</p>
      </div>

      {/* using 'post-status-main' className from index.scss that located in PostUpload folder */}
      <div className="post-status-main">
        {allPosts.map((post) => {
          return (
            <div key={post.postID}>
              <PostsCard post={post} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProfileCard;
