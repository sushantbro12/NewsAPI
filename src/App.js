import { useEffect, useState } from "react";
import "./App.css";
import NewsFeed from "./components/NewsFeed";
import UserPreferences from "./components/UserPreferences";

function App() {
  // const [selectedCategory, selectedCategory] = useState("");

  // useEffect(() => {
  //   const savedPreference = localStorage.getItem("userPreference") || "";
  //   selectedCategory(savedPreference);
  // }, []);

  return (
    <>
      <UserPreferences />
      <NewsFeed />
    </>
  );
}

export default App;
