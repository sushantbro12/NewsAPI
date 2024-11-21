import React, { useEffect, useState } from "react";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(JSON.parse(localStorage.getItem("bookmarks")) || []);
  }, [bookmarks]);

  return (
    <div>
      <h1>Bookmarks</h1>
      {bookmarks.map((article, index) => (
        <div key={index}>{article.title}</div>
      ))}
    </div>
  );
};

export default Bookmarks;
