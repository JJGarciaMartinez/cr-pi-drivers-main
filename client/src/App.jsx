import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import Nav from "./components/navBar/Nav";
import Detail from "./components/detail/Detail";
import Form from "./components/form/Form";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Form />} />
      </Routes>

      <div>{location.pathname !== "/" && <Nav />}</div>
    </>
  );
}

export default App;
