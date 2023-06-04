import React, { useEffect, useState, useContext } from "react";
import { getAllUsers, addConnection } from "../../../api/FirestoreAPIs";
import ConnectionCard from "../ConnectionCard.jsx";
import { connectionsUserContext } from "../../../layouts/ConnectionsLayout";
import Loader from "../Loader";
import "./index.scss";

const AllConnections = () => {
  const currentUser = useContext(connectionsUserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllUsers(setAllUsers).then(() => {
      setLoading(false);
    });
  }, []);

  const handleAddConnection = (userConnectionID) => {
    // currentUser.id is the current user that logged to the app, userConnectionID is the user to add to the connections of the current user.
    addConnection(currentUser.userID, userConnectionID);
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="page-title">Connections Page</h1>
      <div className="main-connections">
        <div className="all-connections">
          {allUsers.map((user) => {
            if (user.userID === currentUser.userID) {
              return;
            }
            return (
              <div
                className="connection-card-container"
                key={user.userID}
              >
                <ConnectionCard
                  user={user}
                  handleAddConnection={handleAddConnection}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default AllConnections;
