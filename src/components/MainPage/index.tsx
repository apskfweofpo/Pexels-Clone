import React, { useEffect } from "react";
import Header from "../Header";
import Table from "../Table";
import { useDispatch } from "react-redux";
import { clearPhotos } from "../../store/photos/photosSlice";

export const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
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
