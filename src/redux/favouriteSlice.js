import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: [],
  reducers: {
    addFavourite: (state, action) => {
      const article = action.payload;
      if (!state.some((fav) => fav.url === article.url)) {
        state.push(article);
      }
    },
    removeFavourite: (state, action) => {
      const articleUrl = action.payload;
      return state.filter((fav) => fav.url !== articleUrl);
    },
  },
});

export const { addFavourite, removeFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
