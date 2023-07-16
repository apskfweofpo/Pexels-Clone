import { useEffect, useState } from "react";
import { FetchingStatus, IPhoto, Orientations } from "../../utils/interfaces";
import styles from "./Table.module.scss";
import PhotoCard from "../PhotoCard";
import Intersector from "../Intersector";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clearPhotos, fetchPhotos } from "../../store/photos/photosSlice";
import { nextPage } from "../../store/filters/filtersSlice";
import { Loader } from "../Loader";

export const Table = ({ byCategory }: { byCategory: boolean }) => {
  const dispatch = useDispatch();
  const { page, perPage, category, size, orientation, color, search } =
    useSelector((state: RootState) => state.filters);
  const { photos, liked, status } = useSelector(
    (state: RootState) => state.photos
  );

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", scrollPhotosHandler);
    return () => document.removeEventListener("scroll", scrollPhotosHandler);
  }, []);

  const getPhotoColumns = (items: IPhoto[], count: number) => {
    if (!photos) return [];

    const photosColumns = items.reduce(
      (acc: IPhoto[][], item: IPhoto, index: number) => {
        const column = index % count;
        acc[column] = [...(acc[column] || []), item];
        return acc;
      },
      [[], [], []]
    );
    return photosColumns;
  };
  useEffect(() => {
    dispatch(clearPhotos());
    setFetching(true);
  }, [size, color, orientation, category]);

  useEffect(() => {
    if (fetching) {
      dispatch<any>(
        fetchPhotos({
          page,
          perPage,
          byCategory,
          category: category.meta,
          size,
          orientation,
          color,
        })
      );
      dispatch(nextPage());
      setFetching(false);
    }
  }, [fetching]);

  const scrollPhotosHandler = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {!byCategory && status !== FetchingStatus.REJECTED && (
          <span className={styles.title}>Бесплатные стоковые фото</span>
        )}
        {status === FetchingStatus.FULLFILLED && !photos.length && (
          <span className={styles.title}>Ничего не найдено :(</span>
        )}
        {status === FetchingStatus.REJECTED && (
          <span className={styles.title}>Ошибка загрузки :(</span>
        )}

        <div className={styles.tableGrid}>
          {orientation === Orientations.LANDSCAPE && (
            <div className={styles.tableColumn}>
              {photos.map((photo, index) => (
                <PhotoCard
                  key={photo.url}
                  photo={{ ...photo, liked: liked.includes(photo.id) }}
                />
              ))}
            </div>
          )}

          {orientation !== Orientations.LANDSCAPE &&
            getPhotoColumns(photos, 3).map((column, index) => (
              <div className={styles.tableColumn} key={index}>
                {column.map((photo) => (
                  <PhotoCard
                    key={photo.url}
                    photo={{ ...photo, liked: liked.includes(photo.id) }}
                  />
                ))}
              </div>
            ))}
        </div>
        {status === FetchingStatus.PENDING && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
        <Intersector callback={setFetching} viewflag={true} sizePx={10} />
      </div>
    </div>
  );
};

export default Table;
