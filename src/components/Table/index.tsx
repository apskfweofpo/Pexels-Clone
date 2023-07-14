import { useEffect, useState } from "react";
import { IPhoto } from "../../utils/interfaces";
import styles from "./Table.module.scss";
import PhotoCard from "../PhotoCard";
import Intersector from "../Intersector";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchPhotos } from "../../store/photos/photosSlice";
import { nextPage } from "../../store/filters/filtersSlice";

export const Table = ({ byCategory }: { byCategory: boolean }) => {
  const dispatch = useDispatch();
  const { page, perPage, category } = useSelector(
    (state: RootState) => state.filters
  );
  const { photos, liked } = useSelector((state: RootState) => state.photos);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", scrollPhotosHandler);
    return () => document.removeEventListener("scroll", scrollPhotosHandler);
  }, []);

  const getPhotoColumns = (items: IPhoto[]) => {
    if (!photos) return [];

    const photosColumns = items.reduce(
      (acc: IPhoto[][], item: IPhoto, index: number) => {
        const column = index % 3;
        acc[column] = [...(acc[column] || []), item];
        return acc;
      },
      [[], [], []]
    );
    return photosColumns;
  };

  useEffect(() => {
    if (fetching) {
      dispatch<any>(
        fetchPhotos({ page, perPage, byCategory, category: category.meta })
      );
      dispatch(nextPage());
      setFetching(false);
    }
  }, [fetching]);

  const scrollPhotosHandler = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {!byCategory && (
          <span className={styles.title}>Бесплатные стоковые фото</span>
        )}
        <div className={styles.tableGrid}>
          {photos &&
            getPhotoColumns(photos).map((column, index) => (
              <div className={styles.tableColumn}>
                {column.map((photo) => (
                  <PhotoCard
                    key={photo.url}
                    photo={{ ...photo, liked: liked.includes(photo.id) }}
                  />
                ))}
              </div>
            ))}
        </div>
        {fetching && <div className={styles.loader}>Loading...</div>}
        <Intersector callback={setFetching} viewflag={true} sizePx={10} />
      </div>
    </div>
  );
};

export default Table;
