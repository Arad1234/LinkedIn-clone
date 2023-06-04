import React, { useEffect, useContext, useState } from "react";
import "./index.scss";
import { connectionsUserContext } from "../../../layouts/ConnectionsLayout";
import defaultUserPhoto from "../../../assets/defaultUser.png";
import { useNavigate } from "react-router-dom";
import { getConnections } from "../../../api/FirestoreAPIs";
const ConnectionCard = (props) => {
  const { user, handleAddConnection } = props;
  const currentUser = useContext(connectionsUserContext);
  // Setting isConnected to be true initially because I set by default that all the users are connected to show an empty page and fill it accordingly
  const [isConnected, setIsConnected] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const closeConnectionsSocket = getConnections(
      currentUser.userID,
      user.userID,
      setIsConnected
    );

    return () => {
      closeConnectionsSocket();
    };
  }, []);
  // If the user is already connected, don't show him as an option.
  return isConnected ? (
    <></>
  ) : (
    <div className="connection-card">
      <img
        onClick={() => navigate("/profile", { state: { id: user.userID } })}
        className="profile-image-connection"
        src={user.ProfileImageUrl ? user.ProfileImageUrl : defaultUserPhoto}
      />
      <p
        onClick={() => navigate("/profile", { state: { id: user.userID } })}
        className="user-name"
      >
        {user.name}
      </p>
      <p className="user-headline">{user.headline}</p>
      <button
        onClick={() => handleAddConnection(user.userID)}
        className="connect-button"
      >
        Connect
      </button>
    </div>
  );
};

export default ConnectionCard;
