import React from "react";
import "../main.css";

const Header = (props) => {
  return (
    <div className="navbar navbar-dark bg-dark sticky-top">
      <h2 className="header">{props.title}</h2>
    </div>
  );
};

export default Header;
