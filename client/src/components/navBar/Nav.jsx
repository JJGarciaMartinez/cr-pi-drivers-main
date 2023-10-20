import React from "react";
import { House, SignOut, Plus } from "@phosphor-icons/react";
import SearchBar from "./SearchBar";
import { NavLink, useNavigate } from "react-router-dom";
import "./navBar.css";

export default function Nav({ goBack }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="nav">
        <div className="links">
          <NavLink to="/home" className="link home-link">
            <span>
              <House size={23} weight="fill" />
              Home
            </span>
          </NavLink>

          <NavLink to="/create" className="link create-link">
            <span>
              <Plus size={23} />
              Create Driver
            </span>
          </NavLink>

          <NavLink to="/" className="link create-link">
            <span>
              <SignOut size={23} />
              Exit
            </span>
          </NavLink>
        </div>
      </div>
    </>
  );
}
