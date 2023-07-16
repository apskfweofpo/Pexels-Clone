import React, { useState } from "react";
import { IPhoto, Orientations } from "../../utils/interfaces";
import styles from "./PhotoCard.module.scss";
import AuthorLine from "../AuthorLine";
import { ReactComponent as DownloadIcon } from "../../assets/download-svgrepo-com.svg";
import { ReactComponent as NotLikedIcon } from "../../assets/notliked-svgrepo-com.svg";
import { ReactComponent as LikedIcon } from "../../assets/liked-svgrepo-com.svg";
import { useDispatch } from "react-redux";
import { toggleLikePhoto } from "../../store/photos/photosSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const PhotoCard = ({ photo }: { photo: IPhoto }) => {
  const dispatch = useDispatch();
  const { liked } = useSelector((state: RootState) => state.photos);
  const { orientation } = useSelector((state: RootState) => state.filters);

  const getOrientation = () => {
    switch (orientation) {
      case Orientations.LANDSCAPE:
        return "landscape";
      case Orientations.PORTRAIT:
        return "portrait";
      case Orientations.SQUARE:
        return "medium";
      default:
        return "portrait";
    }
  };

  const likePhoto = () => {
    dispatch(toggleLikePhoto(photo.id));
  };

  const [show, setShow] = useState(false);
  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && (
        <div className={styles.tools}>
          <button className={styles.toolButton}>
            <a href={photo.src.original} download={"photo.jpeg"}>
              <DownloadIcon />
            </a>
          </button>
          <button className={styles.toolButton} onClick={() => likePhoto()}>
            {liked.includes(photo.id) ? <LikedIcon /> : <NotLikedIcon />}
          </button>
        </div>
      )}
      <img
        className={styles.img}
        src={photo.src[getOrientation()]}
        alt={photo.alt}
        loading="lazy"
      />
      {show && (
        <div className={styles.author}>
          <AuthorLine
            author={photo.photographer}
            authorUrl={photo.photographer_url}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoCard;
