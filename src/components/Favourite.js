import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavourite } from "../redux/favouriteSlice";

const Favourite = () => {
  const favourites = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  const handleRemoveFavourite = (articleUrl) => {
    dispatch(removeFavourite(articleUrl));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Favourite Articles
      </h1>
      <ul className="space-y-6">
        {favourites.map((article, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-96 mb-4 rounded-lg"
            />
            <p className="text-lg mb-4">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Read More
            </a>
            <div className="mt-4">
              <button
                onClick={() => handleRemoveFavourite(article.url)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Remove from Favourites
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourite;
