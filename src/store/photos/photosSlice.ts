import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  FetchingStatus,
  IPhoto,
  IPhotosResponse,
} from "../../utils/interfaces";
import axios from "axios";
import LikesService from "../../services/likesService";

export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotosStatus",
  async (params: {
    page: number;
    perPage: number;
    category?: string;
    byCategory: boolean;
    size: string;
    orientation: string;
    color: string;
  }) => {
    try {
      const { data } = await axios.get<IPhotosResponse>(
        `https://api.pexels.com/v1/${
          params.byCategory ? "search" : "curated"
        }?page=${params.page}&per_page=${params.perPage}${
          params.byCategory && `&query=${params.category}`
        }${params.size && `&size=${params.size}`}${
          params.color && `&color=${params.color}`
        }${params.orientation && `&orientation=${params.orientation}`}`,
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
    clearPhotos: (state) => {
      state.photos = [];
    },
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
      } else {
        state.liked.push(action.payload);
        LikesService.addLocalLike(action.payload);
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

export const { addPhotos, toggleLikePhoto, clearPhotos } = photosSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.photos.photos;

export default photosSlice.reducer;
