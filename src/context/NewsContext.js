import React, { createContext, useState, useEffect } from "react";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
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
    <NewsContext.Provider
      value={{ selectedCategory, setSelectedCategory, query, setQuery }}
    >
      {children}
    </NewsContext.Provider>
  );
};
