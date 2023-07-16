import React from "react";
import styles from "./Category.module.scss";
import { ICategory } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import { SEARCH_ROUTE } from "../../utils/routes";
import { setCategory, setSearch } from "../../store/filters/filtersSlice";
import { useDispatch } from "react-redux";
import { clearPhotos } from "../../store/photos/photosSlice";

export const Category = ({
  category,
  lite,
}: {
  category: ICategory;
  lite: boolean;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setCategory(category));
    dispatch(clearPhotos());
    dispatch(setSearch(category.meta));
    navigate(SEARCH_ROUTE + category.meta);
  };
  return (
    <div
      className={lite ? styles.lite : styles.wrapper}
      onClick={(e) => handleClick(e)}
    >
      <h5>{category.name}</h5>
    </div>
  );
};
