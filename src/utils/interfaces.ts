export interface IPhotosResponse {
  page: number;
  per_page: number;
  photos: IPhoto[];
  next_page: string; //"https://api.pexels.com/v1/curated/?page=2&per_page=1";
  total_results: number;
}
export interface ICategory {
  name: string;
  meta: string;
}

export interface IPhoto {
  id: number;
  width: number;
  height: number;
  url: string; //"https://www.pexels.com/photo/woman-in-white-long-sleeved-top-and-skirt-standing-on-field-2880507/";
  photographer: string; //"Deden Dicky Ramdhani";
  photographer_url: string; //"https://www.pexels.com/@drdeden88";
  photographer_id: number;
  avg_color: string; //"#7E7F7B";
  src: {
    original: string; //"https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg";
    large2x: string; //"https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
    large: string; //"https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
    medium: string; //"https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=350";
    small: string; //"https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=130";
    portrait: string; //"https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800";
    landscape: string; //"https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
    tiny: string; //"https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280";
  };
  liked: boolean;
  alt: string; //"Brown Rocks During Golden Hour";
}

export enum FetchingStatus {
  PENDING = "pending",
  REJECTED = "rejected",
  FULLFILLED = "fulfilled",
}

export enum Orientations {
  LANDSCAPE = "landscape",
  PORTRAIT = "portrait",
  SQUARE = "square",
}

export enum Sizes {
  MEDIUM = "medium",
  LARGE = "large",
  SMALL = "small",
}
