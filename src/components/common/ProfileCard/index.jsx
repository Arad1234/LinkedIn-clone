import React, { useContext, useState, useEffect } from "react";
import PostsCard from "../PostsCard";
import { BiPencil } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { profileUserContext } from "../../../layouts/ProfileLayout";
import { getSingleUser, getSingleUserPosts } from "../../../api/FirestoreAPIs";
import "./index.scss";

const ProfileCard = (props) => {
  const { onEdit } = props;
  const currentUser = useContext(profileUserContext);
  // With the useLocation hook I can check what profile to render according to what the user clicked.
  const location = useLocation();
  // Using the state object passed from the 'navigate' instance that located in 'PostsCard' folder.
  const [allPosts, setAllPosts] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  // I'm using setState inside the useEffect so it will not enter an infinite loop.
  useEffect(() => {
    // I'm using 'email' and 'id' because I want to distinguish between if the user enter his own profile, or if he entered someone's else through the posts.
    if (location?.state?.email) {
      var closeUserConnection = getSingleUser(
        setCurrentProfile,
        location.state.email
      );
    }
    // Getting the posts of the user that I'm in his profile page.
    if (location?.state?.id) {
      var closePostsConnection = getSingleUserPosts(
        setAllPosts,
        location.state.id
      );
    }
    return () => {
      closeUserConnection();
      closePostsConnection();
    };
  }, []);

  return (
    <>
      <div className="profile-card">
        {/* Checking if the user entered his own profile. If he does, he can edit, else, unshow the pencil icon */}
        {!location?.state?.email ||
        location?.state?.email === currentUser.email ? (
          <div className="edit-btn">
            <BiPencil
              size={23}
              className="edit-icon"
              onClick={onEdit}
            />
          </div>
        ) : null}

        <div className="profile-info">
          <div>
            <h4 className="userName">
              {/* Checking the length of the currentProfile values array, to decide if I need to render the 'currentUser' or some other user profile that the user clicked on.*/}
              {Object.values(currentProfile).length
                ? currentProfile.name
                : currentUser.name}
            </h4>
            <p className="headline">
              {Object.values(currentProfile).length
                ? currentProfile.headline
                : currentUser.headline}
            </p>
            <p className="location">
              {Object.values(currentProfile).length
                ? `${currentProfile.city}, ${currentProfile.country}`
                : `${currentUser.city}, ${currentUser.country}`}
            </p>
            {/* I created <a> tag to enter the website of the user. */}
            <a
              href={
                Object.values(currentProfile).length
                  ? currentProfile.website
                  : currentUser.website
              }
              target="_blank" // To open the link in a new tab.
              className="website"
            >
              {Object.values(currentProfile).length
                ? currentProfile.website
                : currentUser.website}
            </a>
            <p className="skills">
              <span className="skill-label">Skills:</span>&nbsp;
              {Object.values(currentProfile).length
                ? currentProfile.skills
                : currentUser.skills}
            </p>
          </div>
          <div className="right-info">
            <p className="college">
              {Object.values(currentProfile).length
                ? currentProfile.college
                : currentUser.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length
                ? currentProfile.company
                : currentUser.company}
            </p>
          </div>
        </div>
      </div>
      <div className="about-card">
        <label>About</label>
        <p>
          {Object.values(currentProfile).length
            ? currentProfile.about
            : currentUser.about}
        </p>
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
