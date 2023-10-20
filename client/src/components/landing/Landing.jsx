import React from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/formula1Logo.png";
import {
  CaretRight,
  ArrowUp,
  TrademarkRegistered,
} from "@phosphor-icons/react";
import "./landing.css";

export default function Landing({ goHome }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    goHome();
    navigate("/home");
  };
  return (
    <div className="landing">
      <span className="start">
        <img src={background} alt="background" />
        <p>
          Formula 1 <TrademarkRegistered size={15} weight="bold" />
        </p>
      </span>
      <button onClick={handleGoHome} className="button-home">
        <span className="circle">
          <CaretRight size={45} weight="bold" className="arrow1" />
        </span>
        <span className="button-text">Go To Home</span>
      </button>

      <figure className="arrow-up">
        <ArrowUp size={50} weight="bold" />
      </figure>
      <span className="text">
        <p>CLICK THERE</p>
      </span>
    </div>
  );
}
