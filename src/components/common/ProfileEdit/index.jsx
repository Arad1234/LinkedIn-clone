import React, { useState, useContext } from "react";
import { editProfile } from "../../../api/FirestoreAPIs";
import { AiOutlineClose } from "react-icons/ai";
import { profileUserContext } from "../../../layouts/ProfileLayout";
import "./index.scss";

const ProfileEdit = (props) => {
  const { onEdit } = props;
  const currentUser = useContext(profileUserContext);
  const [editInputs, setEditInputs] = useState(currentUser); // Setting the 'editInputs' to be equal to the 'currentUser' as initial value.
  const getInput = (event) => {
    const { name, value } = event.target;
    const inputObj = { [name]: value };
    // Here I use the spread operator to access the 'inputObj' key value pair and add them to the 'editInputs' object.
    // If a key already exists in 'editInputs' object, 'inputObj' will overwrite it with a new value.
    setEditInputs({ ...editInputs, ...inputObj });
  };

  const updateProfileData = async () => {
    // Calling the 'editProfile' function from the firestore API file, to update a specific document from the 'users' collection.
    editProfile(currentUser.id, editInputs);
    onEdit(); // Going back to the profile page.
  };
  return (
    <div className="profile-card">
      <div className="edit-btn">
        <AiOutlineClose
          className="close-icon"
          size={23}
          onClick={onEdit}
        />
      </div>
      <div className="profile-edit-inputs">
        <label>Full name</label>
        <input
          onChange={getInput}
          className="common-input"
          name="name"
          value={editInputs.name}
        />
        <label>Headline</label>
        <input
          onChange={getInput}
          className="common-input"
          name="headline"
          value={editInputs.headline}
        />
        <label>Country</label>
        <input
          onChange={getInput}
          className="common-input"
          name="country"
          value={editInputs.country}
        />
        <label>City</label>
        <input
          onChange={getInput}
          className="common-input"
          name="city"
          value={editInputs.city}
        />
        <label>Company</label>
        <input
          onChange={getInput}
          className="common-input"
          name="company"
          value={editInputs.company}
        />
        <label>Industry</label>
        <input
          onChange={getInput}
          className="common-input"
          name="industry"
          value={editInputs.industry}
        />
        <label>College</label>
        <input
          onChange={getInput}
          className="common-input"
          name="college"
          value={editInputs.college}
        />
        <label>Website</label>
        <input
          type="url"
          onChange={getInput}
          className="common-input"
          name="website"
          value={editInputs.website}
        />
        <label>About</label>
        <textarea
          onChange={getInput}
          className="common-textArea"
          name="about"
          placeholder="Tell us about yourself..."
          rows={5}
          value={editInputs.about}
        />
        <label>Skills</label>
        <input
          onChange={getInput}
          className="common-input"
          name="skills"
          value={editInputs.skills}
        />
      </div>
      <div className="save-container">
        <button
          onClick={updateProfileData}
          className="save-btn"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
