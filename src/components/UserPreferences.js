import { useEffect, useState } from "react";

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
      <nav className="flex items-center justify-between bg-gray-800 text-white px-4 py-2">
        <div className="text-lg font-bold">User Preferences</div>
        <div className="flex space-x-4">
          {preferences.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category
                  ? "bg-blue-500"
                  : "hover:bg-gray-700"
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
            className="p-2 bg-gray-400 hover:bg-gray-500 rounded"
          >
            Manage Preferences
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="mt-4 p-4 border border-gray-400 rounded bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">Manage Preferences</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={preferences.includes(category)}
                  onChange={() => handleCheckboxChange(category)}
                  className="cursor-pointer"
                  aria-label={`Toggle ${category}`}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
          <button
            onClick={savePreferences}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      )}
    </>
  );
};

export default UserPreferences;
