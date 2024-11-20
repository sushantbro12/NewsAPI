import axios from "axios";
const API_KEY = "dcc4814b9d3943eeba6fb7ad169f87c7";

export const fetchNews = async (query, page = 1) => {
  const pageSize = 10;
  const url = `https://newsapi.org/v2/everything?q=${query}&from=2024-10-20&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  const { data } = await axios.get(url);
  return { articles: data.articles, totalResults: data.totalResults };
};
