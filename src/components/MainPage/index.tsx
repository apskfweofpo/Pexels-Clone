import React, { useEffect } from "react";
import Header from "../Header";
import Table from "../Table";
import { useDispatch } from "react-redux";
import { clearPhotos } from "../../store/photos/photosSlice";
import { clearFilters } from "../../store/filters/filtersSlice";

export const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearFilters());
    dispatch(clearPhotos());
  }, []);

  return (
    <div className="container">
      <Header lite={false} />

      <Table byCategory={false} />
    </div>
  );
};
export default MainPage;
