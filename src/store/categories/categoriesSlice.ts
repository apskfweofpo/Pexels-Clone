import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ICategory } from "../../utils/interfaces";

// Define a type for the slice state

interface CategoriesState {
  categories: ICategory[];
}

// Define the initial state using that type
const initialState: CategoriesState = {
  categories: [
    { name: "man", meta: "man" },
    { name: "portrait", meta: "portrait" },
    { name: "woman", meta: "woman" },
    { name: "skin", meta: "skin" },
    { name: "woman face", meta: "woman face" },
    { name: "model", meta: "model" },
    { name: "eyes", meta: "eyes" },
    { name: "girl", meta: "girl" },
    { name: "young", meta: "young" },
    { name: "baby", meta: "baby" },
    { name: "beauty", meta: "beauty" },
    { name: "mountains", meta: "mountains" },
    { name: "forests", meta: "forests" },
    { name: "nature", meta: "nature" },
    { name: "car", meta: "car" },
    { name: "sky", meta: "sky" },
    { name: "food", meta: "food" },
    { name: "office", meta: "office" },
  ],
};

export const categoriesSlice = createSlice({
  name: "categories",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

// export const {  } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.categories.categories;

export default categoriesSlice.reducer;
