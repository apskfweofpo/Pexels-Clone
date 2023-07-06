import React, { useState } from "react";
import { IPhoto } from "../../utils/interfaces";
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

  const sizes = ["tiny", "small", "portrait"];

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
            <DownloadIcon />
          </button>
          <button className={styles.toolButton} onClick={() => likePhoto()}>
            {liked.includes(photo.id) ? <LikedIcon /> : <NotLikedIcon />}
          </button>
        </div>
      )}
      <img
        className={styles.img}
        src={photo.src.portrait}
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
