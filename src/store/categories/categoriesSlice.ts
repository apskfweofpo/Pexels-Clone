import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ICategory } from "../../utils/interfaces";

// Define a type for the slice state

interface CategoriesState {
  categories: ICategory[];
}

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
    { name: "ocean", meta: "ocean" },
    { name: "tiger", meta: "tiger" },
    { name: "city", meta: "city" },
    { name: "architecture", meta: "architecture" },
    { name: "pets", meta: "pets" },
    { name: "travel", meta: "travel" },
    { name: "music", meta: "music" },
    { name: "sports", meta: "sports" },
    { name: "fashion", meta: "fashion" },
    { name: "technology", meta: "technology" },
    { name: "art", meta: "art" },
    { name: "abstract", meta: "abstract" },
    { name: "flowers", meta: "flowers" },
    { name: "water", meta: "water" },
    { name: "beach", meta: "beach" },
    { name: "sunrise", meta: "sunrise" },
    { name: "sunset", meta: "sunset" },
    { name: "night", meta: "night" },
    { name: "stars", meta: "stars" },
    { name: "moon", meta: "moon" },
    { name: "books", meta: "books" }
  ],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

// export const {  } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.categories.categories;

export default categoriesSlice.reducer;
