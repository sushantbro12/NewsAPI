import React, { useState, useDeferredValue, useEffect } from "react";
import useNewsQuery from "../customHooks/useNewsQuery";

const NewsFeed = ({ query, setQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isFetching, setIsFetching] = useState(false);

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
