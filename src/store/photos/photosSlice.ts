import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IPhoto, IPhotosResponse } from "../../utils/interfaces";
import axios from "axios";
import { useDispatch } from "react-redux";
import LikesService from "../../services/likesService";

export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotosStatus",
  async (params: { page: number; perPage: number }) => {
    try {
      const { data } = await axios.get<IPhotosResponse>(
        `https://api.pexels.com/v1/curated?page=${params.page}&per_page=${params.perPage}`,
        {
          headers: {
            Authorization:
              "563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf",
          },
        }
      );
      return data;
    } catch (e: any) {
      console.log("Fetching photos error: ", e);
    }
  }
);

enum FetchingStatus {
  PENDING = "pending",
  REJECTED = "rejected",
  FULLFILLED = "fulfilled",
}

// Define a type for the slice state
interface IPhotosSliceInitial {
  photos: IPhoto[];
  total: number;
  liked: number[];
  status: FetchingStatus;
}
// Define the initial state using that type
const initialState: IPhotosSliceInitial = {
  photos: [],
  liked: LikesService.getLocalLikes(),
  total: 0,
  status: FetchingStatus.FULLFILLED,
};

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    addPhotos: (state, action: PayloadAction<IPhoto[]>) => {
      state.photos = [...state.photos, ...action.payload];
      state.liked = [
        ...state.liked,
        ...action.payload
          .filter((photo) => photo.liked)
          .map((photo) => photo.id),
      ];
    },
    toggleLikePhoto: (state, action: PayloadAction<number>) => {
      if (state.liked.includes(action.payload)) {
        state.liked = state.liked.filter((like) => like !== action.payload);
        LikesService.removeLocalLike(action.payload);
        console.log(state.liked);
        console.log(localStorage);
      } else {
        state.liked.push(action.payload);
        LikesService.addLocalLike(action.payload);
        console.log(state.liked);
        console.log(localStorage);
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      if (action.payload) {
        state.photos = [...state.photos, ...action.payload.photos];
        state.status = FetchingStatus.FULLFILLED;
      }
    });
    builder.addCase(fetchPhotos.rejected, (state, action) => {
      state.status = FetchingStatus.REJECTED;
    });
    builder.addCase(fetchPhotos.pending, (state, action) => {
      state.status = FetchingStatus.PENDING;
    });
  },
});

export const { addPhotos, toggleLikePhoto } = photosSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.photos.photos;

export default photosSlice.reducer;
