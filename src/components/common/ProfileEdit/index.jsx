import React, { useState, useContext } from "react";
import { editProfile } from "../../../api/FirestoreAPIs";
import { userCtx } from "../../../layouts/ProfileLayout";
import "./index.scss";

const ProfileEdit = (props) => {
  const { onEdit } = props;
  const currentUser = useContext(userCtx);
  const [editInputs, setEditInputs] = useState({});
  const getInput = (event) => {
    const { name, value } = event.target;
    const inputObj = { [name]: value };
    // Here I use the spread operator to access the 'inputObj' key value pair and add them to the 'editInputs' object.
    // If a key already exists in 'editInputs' object, 'inputObj' will overwrite it with a new value.
    setEditInputs({ ...editInputs, ...inputObj });
  };

  const updateProfileData = () => {
    // Calling the 'editProfile' function from the firestore API file, to update a specific document from the 'users' collection.
    editProfile(currentUser.userID, editInputs);
  };
  return (
    <div className="profile-card">
      <div className="edit-btn">
        <button onClick={onEdit}>Go back</button>
      </div>
      <div className="profile-edit-inputs">
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Name"
          name="name"
        />
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Headline"
          name="headline"
        />
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Location"
          name="location"
        />
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Company"
          name="company"
        />
        <input
          onChange={getInput}
          className="common-input"
          placeholder="College"
          name="college"
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
