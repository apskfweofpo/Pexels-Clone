import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ICategory } from "../../utils/interfaces";

// Define a type for the slice state
interface IFilterState {
  page: number;
  perPage: number;
  category: ICategory;
}

// Define the initial state using that type
const initialState: IFilterState = {
  page: 1,
  perPage: 12,
  category: { meta: "", name: "" },
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
  },
});

export const { nextPage, prevPage, setCategory } = filtersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPage = (state: RootState) => state.filters.page;

export default filtersSlice.reducer;
