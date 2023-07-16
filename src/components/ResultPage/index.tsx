import React, { useEffect } from "react";
import Header from "../Header";
import Table from "../Table";
import { useNavigate, useParams } from "react-router-dom";
import { Filters } from "../Filters";
import { setCategory, setSearch } from "../../store/filters/filtersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const ResultPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  if (!category || !category.length) navigate("/");

  const dispatch = useDispatch();
  const { search } = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    if (!search.length) {
      dispatch(setSearch(category!));
      dispatch(setCategory({ meta: category!, name: category! }));
    }
  }, []);

  return (
    <div className="container">
      <Header lite={true} />
      <h2 style={{ margin: "8rem 0 1rem" }}>
        {category![0].toLocaleUpperCase() + category!.slice(1)} Photos
      </h2>
      <Filters />
      <Table byCategory={true} />
    </div>
  );
};
