import React from "react";
import "./index.scss";
const Comments = (props) => {
  const { commentObj } = props;
  return (
    <div className="comment-container">
      <p className="comment-username">{commentObj.userName}</p>
      <p className="comment">{commentObj.comment}</p>
      {/* <p>•</p> */}
      <p className="timestamp">{commentObj.timeStamp}</p>
    </div>
  );
};

export default Comments;
