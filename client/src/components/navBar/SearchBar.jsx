import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import "./navBar.css";

export default function SearchBar() {
  return (
    <div className="searchBar">
      <input placeholder="Search for a driver" />
      <button>
        <MagnifyingGlass size={20} weight="bold" className="search-icon" />
      </button>
    </div>
  );
}
