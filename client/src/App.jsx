import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import Nav from "./components/navBar/Nav";
import Detail from "./components/detail/Detail";
import Form from "./components/form/Form";
import "./App.css";

function App() {
  const location = useLocation();

  const goHome = () => {
    if (location.pathname === "/home") {
      return <Home />;
    }
  };

  const goBack = () => {
    if (location.pathname === "/") {
      return <Landing />;
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing goHome={goHome} />} />
      </Routes>

      <div>
        {location.pathname !== "/" && (
          <div>
            <Nav goBack={goBack} />
            <Routes>
              <Route path="/home" element={<Home />} />{" "}
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/create" element={<Form />} />
            </Routes>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
