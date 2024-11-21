import React, { useEffect, useState } from "react";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(JSON.parse(localStorage.getItem("bookmarks")) || []);
  }, []);

  const handleRemoveBookmark = (articleUrl) => {
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.url !== articleUrl
    );
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Bookmarked Articles
      </h1>
      <ul className="space-y-6">
        {bookmarks.map((article, index) => (
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
                onClick={() => handleRemoveBookmark(article.url)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Remove Bookmark
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookmarks;
