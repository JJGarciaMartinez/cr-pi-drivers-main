import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { allDrivers } from "../../redux/actions.js";
import Cards from "../cards/cards.jsx";
import "./homeStyles.css";
import SearchBar from "../navBar/SearchBar.jsx";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allDrivers());
  }, []);

  return (
    <div className="home-container">
      <SearchBar />
      <div className="home">
        <h1 className="title">Drivers List</h1>
        <Cards />
      </div>
    </div>
  );
}
