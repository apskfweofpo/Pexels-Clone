import React from "react";
import styles from "./ResultPage.module.scss";
import Header from "../Header";
import Table from "../Table";
import { useNavigate, useParams } from "react-router-dom";

export const ResultPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  if (!category) navigate("/");
  return (
    <div className="container">
      <Header lite={true} />
      <h2 style={{ margin: "6rem 0 2rem" }}>
        {category![0].toLocaleUpperCase() + category!.slice(1)} Photos
      </h2>
      <Table byCategory={true} />
    </div>
  );
};
