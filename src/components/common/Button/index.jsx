import React from "react";
import "./index.scss";
const Button = (props) => {
  const { title, onClick } = props;
  return (
    <button
      className="common-btn"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
