import React from "react";
import "../main.css";

const Meme = ({ currentItem, onClick }) => {
  const { id, url, name } = currentItem;
  return (
    <img
      key={id}
      src={url}
      alt={name}
      onClick={onClick}
      className="img-wrapper hover-zoom"
    />
  );
};

export default Meme;
