import React, { useContext, useRef } from "react";
import { AiFillCamera } from "react-icons/ai";
import { profileUserContext } from "../../../layouts/ProfileLayout";
import { Space, Spin } from "antd";

const ProfileImage = (props) => {
  const currentUser = useContext(profileUserContext);
  const { loading, url, currentProfile, setShowModal } = props;
  const isProfileOfCurrentUser = currentUser.id === currentProfile.id;

  return (
    <div
      className="image-input-container"
      onClick={() => isProfileOfCurrentUser && setShowModal(true)}
    >
      {url ? (
        loading ? (
          <Space size="middle">
            <Spin size="large" />
          </Space>
        ) : (
          <img
            className="profile-image"
            src={url}
            alt="Selected"
          />
        )
      ) : isProfileOfCurrentUser ? (
        <>
          <label className="select-image-label">Select Image</label>
          <AiFillCamera size={"25px"} />
        </>
      ) : (
        <h3>No photo</h3>
      )}
    </div>
  );
};
export default ProfileImage;

// return (
//   <div
//     className="image-input-container"
//     onClick={() => isProfileOfCurrentUser && fileInputRef.current.click()}
//   >
//     {url ? (
//       loading ? (
//         <Space size="middle">
//           <Spin size="large" />
//         </Space>
//       ) : (
//         <>
//           <img
//             className="profile-image"
//             src={url}
//             alt="Selected"
//           />
//           {isProfileOfCurrentUser && (
//             // Stopping the propergation from continue to the div element when clicking on the label element
//             <label
//               className="change-profile-label"
//               onClick={(event) => event.stopPropagation()}
//             >
//               Change Image
//               {inputElement}
//             </label>
//           )}
//         </>
//       )
//     ) : isProfileOfCurrentUser ? (
//       <>
//         {/* Stopping the propergation from continue to the div element when clicking on the label element  */}
//         <label
//           onClick={(event) => {
//             event.stopPropagation();
//           }}
//         >
//           Select Image
//           {inputElement}
//         </label>
//         <AiFillCamera size={"25px"} />
//       </>
//     ) : (
//       <h3>No photo</h3>
//     )}
//   </div>
// );
