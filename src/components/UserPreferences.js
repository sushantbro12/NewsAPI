import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const categories = ["Science", "Art", "Politics", "Technology", "Sports"];

const UserPreferences = ({ selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPreferences =
      JSON.parse(localStorage.getItem("userPreferences")) || categories;
    setPreferences(savedPreferences);
  }, []);

  const handleCategoryClick = (category) => {
    setLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setLoading(false), 1000);
  };

  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (category) => {
    setPreferences((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const savePreferences = () => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    setIsOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-blue-900 text-white px-6 py-4 shadow-md">
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight hover:text-blue-400"
          >
            NewsApp
          </Link>
          <div className="flex space-x-6">
            <Link
              to="/favourites"
              className="text-lg font-medium hover:text-blue-400 transition duration-300"
            >
              Favourites
            </Link>
            <Link
              to="/bookmarks"
              className="text-lg font-medium hover:text-blue-400 transition duration-300"
            >
              Bookmarks
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {preferences.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
              disabled={loading}
            >
              {loading && selectedCategory === category
                ? "Loading..."
                : category}
            </button>
          ))}

          <button
            onClick={toggleButton}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-md text-white font-medium transition duration-300"
          >
            Preferences
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="absolute top-0 right-0 mt-16 bg-white p-6 rounded-lg shadow-lg w-72 max-w-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            User Preferences
          </h2>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={category}
                  checked={preferences.includes(category)}
                  onChange={() => handleCheckboxChange(category)}
                  className="cursor-pointer"
                />
                <label htmlFor={category} className="text-lg text-gray-700">
                  {category}
                </label>
              </div>
            ))}
          </div>
          <button
            onClick={savePreferences}
            className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            Save Preferences
          </button>
        </div>
      )}
    </>
  );
};

export default UserPreferences;
