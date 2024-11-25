import { useQuery } from "react-query";
import { fetchNews } from "../api/fetchNews";

const useNewsQuery = (query, currentPage) => {
  return useQuery(
    ["news", query, currentPage],
    () => fetchNews(query, currentPage),
    {
      keepPreviousData: true,
    }
  );
};

export default useNewsQuery;
