import React from "react";
import styles from "./Filters.module.scss";
import { ColorPicker } from "../ColorPicker";
import { SelectorFilter } from "../SelectorFilter";
import { OrientationsList, SizesList } from "../../utils/consts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  clearFilters,
  setOrientation,
  setSize,
} from "../../store/filters/filtersSlice";
import { useDispatch } from "react-redux";

export const Filters = () => {
  const { orientation, size } = useSelector(
    (state: RootState) => state.filters
  );
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearFilters());
  };
  return (
    <div className={styles.wrapper}>
      <SelectorFilter
        state={orientation}
        name="Orientation"
        setterHandler={setOrientation}
        list={OrientationsList}
      />
      <SelectorFilter
        state={size}
        name="Size"
        setterHandler={setSize}
        list={SizesList}
      />
      <ColorPicker />
      <button onClick={handleClear} className={styles.clear}>
        Crear All
      </button>
    </div>
  );
};
