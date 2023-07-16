import React, { useEffect, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { Category } from "../Category";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setCategory, setSearch } from "../../store/filters/filtersSlice";
import { useDispatch } from "react-redux";
import { clearPhotos } from "../../store/photos/photosSlice";
import { APP_ROUTE, SEARCH_ROUTE } from "../../utils/routes";
import { useNavigate } from "react-router-dom";

const Search: React.FC = () => {
  const search = useSelector((state: RootState) => state.filters.search);
  const [searchValue, setSearchValue] = useState(search ?? "");
  const [focus, setFocus] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state: RootState) => state.categories);

  const clearSearch = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    dispatch(setSearch(""));
  };

  const onSearchChange = (value: string) => {
    dispatch(setSearch(value));
    setSearchValue(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setCategory({ meta: searchValue, name: searchValue }));
    dispatch(clearPhotos());
    setFocus(false);
    navigate(search.length ? SEARCH_ROUTE + search : APP_ROUTE);
  };

  const dropDownRef = useRef<null | HTMLDivElement>(null);
  const searchBarRef = useRef<null | HTMLFormElement>(null);
  useEffect(() => {
    const onOutsideClickHandler = (e: any) => {
      if (
        dropDownRef.current &&
        searchBarRef.current &&
        !searchBarRef.current.contains(e.target) &&
        !dropDownRef.current.contains(e.target)
      ) {
        setFocus(false);
      }
    };
    document.addEventListener("click", onOutsideClickHandler);
    return () => {
      document.removeEventListener("click", onOutsideClickHandler);
    };
  }, []);

  return (
    <form
      ref={searchBarRef}
      className={styles.wrapper}
      onFocus={() => setFocus(true)}
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        value={search}
        placeholder={search.length ? search : "Поиск бесплатных изображений 🔍"}
        className={styles.search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {search && (
        <div className={styles.cross} onClick={(e) => clearSearch(e)} />
      )}
      {focus && (
        <div
          ref={dropDownRef}
          className={styles.autocomplete}
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Актуальные категории</h3>
          <div className={styles.categories}>
            {categories &&
              categories.map((category) => (
                <Category category={category} lite={false} />
              ))}
          </div>
        </div>
      )}
    </form>
  );
};

export default Search;
