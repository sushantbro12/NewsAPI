import axios from "axios";
// const API_KEY = "dcc4814b9d3943eeba6fb7ad169f87c7";
const API_KEY = "f23dcae29a964b7ea596639533a5a523";
// const API_KEY = "96c4ab58a6d64032902fd1e7a3aaabab";
// const API_KEY = "82b8e9961cbe4796ab0f4be6d14d0f1c";
// const API_KEY = "8e053b59d14041f9bbaa0bce756253d1";
// const API_KEY = "8ae4bac4dc534a7da197de9ed174513b";

export const fetchNews = async (query, page = 1) => {
  const pageSize = 10;
  const url = `https://newsapi.org/v2/everything?q=${query}&from=2024-11-15&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  const { data } = await axios.get(url);
  return { articles: data.articles, totalResults: data.totalResults };
};
