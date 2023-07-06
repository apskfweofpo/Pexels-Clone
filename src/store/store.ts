import { configureStore } from "@reduxjs/toolkit";
import filtersSlice from "./filters/filtersSlice";
import photosSlice from "./photos/photosSlice";
import categoriesSlice from "./categories/categoriesSlice";
// ...

export const store = configureStore({
  reducer: {
    filters: filtersSlice,
    photos: photosSlice,
    categories: categoriesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
