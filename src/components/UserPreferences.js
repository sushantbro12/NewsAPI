const categories = ["Science", "Art", "Politics", "Technology"];

const UserPreferences = ({ selectedCategory, setSelectedCategory }) => {
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    localStorage.setItem("userPreference", category);
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white px-4 py-2">
      <div className="text-lg font-bold">User Preferences</div>
      <div className="flex space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category
                ? "bg-blue-500"
                : "hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default UserPreferences;
