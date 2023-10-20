import React from "react";
import "./cardsStyles.css";
import { NavLink } from "react-router-dom";

export default function Card(props) {
  return (
    <div className="card">
      <figure>
        <img src={props.image} alt={props.name} />
      </figure>
      <section>
        {/* <p>{props.code}</p> */}
        <p className="name">
          {props.name} {props.lastname}
        </p>
        <h1 className="teams">
          <p>Teams:</p>
          <p>{props.teams}</p>
        </h1>
        <NavLink to={`/detail/${props.id}`}>See More</NavLink>
      </section>
    </div>
  );
}
