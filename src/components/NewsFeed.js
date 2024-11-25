import React, {
  useState,
  useEffect,
  useContext,
  useDeferredValue,
} from "react";
import useNewsQuery from "../customHooks/useNewsQuery";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../redux/favouriteSlice";

import { NewsContext } from "../context/NewsContext";
import { LazyImage } from "../utils/LazyImage";
const NewsFeed = () => {
  const { query, setQuery } = useContext(NewsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites);
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );

  const isFavourite = (article) =>
    favourites.some((fav) => fav.url === article.url);

  const isBookmarked = (article) =>
    bookmarks.some((bookm) => bookm.url === article.url);

  const toggleFavourite = (article) => {
    if (isFavourite(article)) {
      dispatch(removeFavourite(article.url));
    } else {
      dispatch(addFavourite(article));
    }
  };

  const toggleBookmark = (article) => {
    let updatedBookmarks;

    if (isBookmarked(article)) {
      updatedBookmarks = bookmarks.filter((bookm) => bookm.url !== article.url);
    } else {
      updatedBookmarks = [...bookmarks, article];
    }

    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  useEffect(() => {
    setIsFetching(true);
    const debounce = setTimeout(() => {
      setDebouncedQuery(query);
      setIsFetching(false);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [query]);

  const deferredQuery = useDeferredValue(debouncedQuery);

  const { data, isLoading, isError } = useNewsQuery(deferredQuery, currentPage);

  const totalPages = data ? Math.ceil(data.totalResults / 10) : 1;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">News Feed</h1>

      <input
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg text-lg"
      />

      {isLoading || isFetching ? (
        <div className="text-center">
          <p className="text-lg">Fetching news...</p>
        </div>
      ) : isError ? (
        <p className="text-red-500">Error fetching news. Try again later.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {data.articles.map((article, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-2">{article.title}</h2>

                <LazyImage
                  src={article.urlToImage}
                  alt={article.title}
                  fallback="https://picsum.photos/200/300"
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
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => toggleFavourite(article)}
                    className={`px-4 py-2 rounded-lg ${
                      isFavourite(article)
                        ? "bg-red-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {isFavourite(article) ? "Unfavorite" : "Favorite"}
                  </button>

                  <button
                    className={`px-4 py-2 rounded-lg ${
                      isBookmarked(article)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => toggleBookmark(article)}
                  >
                    {isBookmarked(article) ? "Remove Bookmark" : "Bookmark"}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsFeed;
