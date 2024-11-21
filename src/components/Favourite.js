import React from "react";
import { useSelector } from "react-redux";

const Favourite = () => {
  const favourites = useSelector((state) => state.favourites);
  return (
    <div>
      <h1>Favourite</h1>
      {favourites.map((article, index) => (
        <div key={index}>{article.title}</div>
      ))}
    </div>
  );
};

export default Favourite;
