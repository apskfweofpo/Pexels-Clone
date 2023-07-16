import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ICategory, Orientations, Sizes } from "../../utils/interfaces";

// Define a type for the slice state
interface IFilterState {
  page: number;
  perPage: number;
  category: ICategory;
  search: string;
  color: string;
  size: string;
  orientation: string;
}

// Define the initial state using that type
const initialState: IFilterState = {
  page: 1,
  perPage: 12,
  category: { meta: "", name: "" },
  search: "",
  color: "",
  size: "",
  orientation: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page += 1;
    },
    prevPage: (state) => {
      state.page -= 1;
    },
    setCategory: (state, action: PayloadAction<ICategory>) => {
      state.category = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    setOrientation: (state, action: PayloadAction<Orientations>) => {
      state.orientation = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setSize: (state, action: PayloadAction<Sizes>) => {
      state.size = action.payload;
    },
    clearFilters: (state) => {
      state.size = "";
      state.color = "";
      state.orientation = "";
    },
  },
});

export const {
  nextPage,
  prevPage,
  setCategory,
  setSearch,
  setOrientation,
  setColor,
  setSize,
  clearFilters,
} = filtersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPage = (state: RootState) => state.filters.page;

export default filtersSlice.reducer;
