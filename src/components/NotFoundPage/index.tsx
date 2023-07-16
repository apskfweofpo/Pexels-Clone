import React, { useEffect } from "react";

import styles from "./NotFoundPage.module.scss";
import { APP_ROUTE } from "../../utils/routes";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate(APP_ROUTE), 3000);
  }, []);

  return (
    <h1 className={styles.text}>
      <span>😔🛸</span>
      <br />
      Упс..Нет такой страницы
    </h1>
  );
};

export default NotFound;
