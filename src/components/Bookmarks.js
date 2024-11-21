import React from "react";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = React.useState(
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );

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
