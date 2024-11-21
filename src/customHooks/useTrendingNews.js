import { useQuery } from "react-query";
import { fetchNews } from "../api/fetchNews";

const useTrendingNews = (currentPage) => {
  return useQuery(["news", currentPage], () => fetchNews(currentPage), {
    keepPreviousData: true,
  });
};

export default useTrendingNews;
