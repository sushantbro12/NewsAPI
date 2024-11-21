import { useEffect, useState } from "react";
import "./App.css";
import NewsFeed from "./components/NewsFeed";
import UserPreferences from "./components/UserPreferences";
import Favourite from "./components/Favourite";
import Bookmarks from "./components/Bookmarks";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("science");

  useEffect(() => {
    const savedPreference = localStorage.getItem("userPreference") || "";
    setSelectedCategory(savedPreference);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setQuery(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <>
      <UserPreferences
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <NewsFeed query={query} setQuery={setQuery} />
      <Favourite />
      <Bookmarks />
    </>
  );
}

export default App;
