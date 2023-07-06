import React from "react";
import styles from "./Search.module.scss";

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const clearSearch = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    setSearchValue("");
  };

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={searchValue}
        placeholder="Поиск бесплатных изображений 🔍"
        className={styles.search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchValue && (
        <div className={styles.cross} onClick={(e) => clearSearch(e)} />
      )}
    </div>
  );
};

export default Search;
