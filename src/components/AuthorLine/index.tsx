import React from "react";
import styles from "./Author.module.scss";

const AuthorLine = ({
  author,
  authorUrl,
}: {
  author: string;
  authorUrl: string;
}) => {
  return (
    <a
      href={authorUrl}
      target="_blank"
      rel="noreferrer"
      className={styles.author}
    >
      Автор фото - <span>{author}</span>
    </a>
  );
};

export default AuthorLine;
