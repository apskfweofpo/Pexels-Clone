import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/pexels-seeklogo.com.svg";
import { Link } from "react-router-dom";
import Search from "../Search";
import { IPhoto, IPhotosResponse } from "../../utils/interfaces";
import axios from "axios";
import { getRandomInt } from "../../utils/getRandomNumber";
import AuthorLine from "../AuthorLine";
import Intersector from "../Intersector";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { pickRandomFromArray } from "../../utils/pickRandomFromArray";
import { Category } from "../Category";

const Header = ({ lite }: { lite: boolean }) => {
  const [currentBackground, setCurrentBackground] = useState<IPhoto | null>(
    null
  );

  const { categories } = useSelector((state: RootState) => state.categories);

  const [transform, setTransform] = useState(lite);

  useEffect(() => {
    const getHeaderPhoto = async () => {
      try {
        const { data } = await axios.get<IPhotosResponse>(
          `https://api.pexels.com/v1/curated?page=1&per_page=30`,
          {
            headers: {
              Authorization:
                "563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf",
            },
          }
        );

        const randomIndex = getRandomInt(data.photos.length);

        setCurrentBackground(data.photos[randomIndex]);
      } catch (e: any) {
        console.log("Get Header Photo Error: ", e);
      }
    };
    if (!lite) getHeaderPhoto();
  }, []);

  return (
    <>
      <div
        className={lite ? "" : styles.header}
        style={
          lite
            ? {}
            : {
                background: currentBackground
                  ? `url(${currentBackground.src.landscape}) center / contain repeat`
                  : "grey",
              }
        }
      >
        <div
          className={transform ? styles.sticky : styles.bar}
          style={{ justifyContent: transform ? "space-around" : "left" }}
        >
          <Link to="/">
            <div className={styles.logo}>
              <div className={styles.logoImgWrapper}>
                <img src={logo} alt="Logo" className={styles.logoImg} />
              </div>
              <span className={styles.logoText}>Pexels Clone</span>
            </div>
          </Link>
          {transform && <Search />}
        </div>
        {!lite && (
          <>
            <div className={styles.container}>
              <div className={styles.search}>
                <div className={styles.title}>
                  Лучшие бесплатные стоковые фото, изображения без роялти и
                  видео от талантливых авторов.
                </div>
                <Search />
                <div className={styles.suggested}>
                  <h4 style={{ marginRight: "4px", color: "white" }}>
                    Тенденции:
                  </h4>

                  {pickRandomFromArray(categories, 7).map((category, index) => (
                    <div className={styles.categories}>
                      <Category category={category} lite key={index} />
                      {index === 6 ? "" : ","}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              {currentBackground?.photographer && (
                <div className={styles.authorWrapper}>
                  <AuthorLine
                    author={currentBackground?.photographer}
                    authorUrl={currentBackground.photographer_url}
                  />
                </div>
              )}
              <Intersector
                callback={setTransform}
                viewflag={false}
                sizePx={2}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
