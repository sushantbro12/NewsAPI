import { useContext } from "react";
import "./App.css";

import UserPreferences from "./components/UserPreferences";

import { Outlet } from "react-router-dom";
import { NewsContext } from "./context/NewsContext";

function App() {
  const { selectedCategory, setSelectedCategory } = useContext(NewsContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <UserPreferences
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Outlet />
    </div>
  );
}

export default App;
