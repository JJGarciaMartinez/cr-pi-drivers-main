import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../redux/actions";
import { useParams } from "react-router-dom";
import "./details.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getById(id));
  }, [id, dispatch]);

  const showShadow = (element) => {
    if (element.scrollTop > 0) {
      element.classList.add("show-shadow");
    } else {
      element.classList.remove("show-shadow");
    }
  };

  //Si los datos son nulos o undefined que muestre esto.
  if (!detail) {
    return <div>LOADING....</div>;
  }

  //   console.log(detail);
  return (
    <div className="detail">
      <figure>
        <img src={detail.image} alt="" />
      </figure>
      {/* <h2>Id:{detail.id}</h2> */}
      <section>
        <p className="name">
          {detail.name} {detail.lastname}
        </p>
        <span className="teams">
          <p className="teams-title">Teams </p>
          <p className="teams-text">
            {Array.isArray(detail.teams)
              ? detail.teams.map((team) => team.name).join(",")
              : detail.teams}
          </p>
        </span>
        <span className="description">
          <p className="description-title">Description</p>
          <div
            className="description-text"
            onScroll={(e) => showShadow(e.target)}
          >
            <p>{detail.description}</p>
          </div>
        </span>
      </section>
    </div>
  );
}
