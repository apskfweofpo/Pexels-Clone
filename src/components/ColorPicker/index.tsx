import React, { useState } from "react";
import { SwatchesPicker } from "react-color";
import styles from "./ColorPicker.module.scss";
import { setColor } from "../../store/filters/filtersSlice";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

export const ColorPicker = () => {
  const [show, setShow] = useState(false);
  const { color } = useSelector((state: RootState) => state.filters);

  const dispatch = useDispatch();
  return (
    <div className={styles.wrapper}>
      <div className={styles.text} onClick={() => setShow((prev) => !prev)}>
        Color
      </div>
      {show && (
        <div className={styles.pickerContainer}>
          <SwatchesPicker
            color={color}
            onChange={(updatedColor) => dispatch(setColor(updatedColor.hex))}
          />
        </div>
      )}
    </div>
  );
};
