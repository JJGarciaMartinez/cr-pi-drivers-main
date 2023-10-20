import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Esta linea es para conectar con la extension del navegador => Redux DevTools

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
// Esta linea es para poder hacer peticiones a un server

export default store;
