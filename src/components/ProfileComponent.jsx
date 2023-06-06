import React, { useEffect, useState } from "react";
import ProfileCard from "./common/ProfileCard";
import ProfileEdit from "../components/common/ProfileEdit";
const ProfileComponent = () => {
  const [isEdit, setIsEdit] = useState(false);
  const onEdit = () => {
    setIsEdit(!isEdit);
  };

  return isEdit ? (
    <ProfileEdit onEdit={onEdit} />
  ) : (
    <ProfileCard onEdit={onEdit} />
  );
};

export default ProfileComponent;
