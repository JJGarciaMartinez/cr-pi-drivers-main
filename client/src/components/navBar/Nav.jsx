import React from "react";
import { HouseSimple, SignOut, Plus } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import "./navBar.css";

export default function Nav() {
  return (
    <>
      <div className="nav">
        <div className="links">
          <NavLink to="/home" className="link home-link">
            <span>
              <HouseSimple size={23} />
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
