import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Favourite from "./components/Favourite";
import Bookmarks from "./components/Bookmarks";
import { NewsProvider } from "./context/NewsContext";
import TrendingNews from "./components/TrendingNews";
import NewsFeed from "./components/NewsFeed";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <NewsFeed /> },
      { path: "/favourites", element: <Favourite /> },
      { path: "/bookmarks", element: <Bookmarks /> },
      { path: "/trending", element: <TrendingNews /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NewsProvider>
          <RouterProvider router={router} />
        </NewsProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
