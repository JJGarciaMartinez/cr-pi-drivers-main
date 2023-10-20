import { ALL_DRIVERS, GET_BY_ID } from "./action-types";
import axios from "axios";

const endpoint = "http://localhost:3001/drivers";

export const allDrivers = () => {
  return async (dispatch) => {
    setTimeout(async () => {
      try {
        const { data } = await axios.get(endpoint);

        if (data) {
          dispatch({
            type: ALL_DRIVERS,
            payload: data,
          });
        }
      } catch (error) {
        return dispatch({
          type: ALL_DRIVERS,
          payload: error,
        });
      }
    });
  };
};

export const getById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${endpoint}/${id}`);
      if (data) {
        dispatch({
          type: GET_BY_ID,
          payload: data,
        });
      }
    } catch (error) {
      return dispatch({
        type: GET_BY_ID,
        payload: error,
      });
    }
  };
};
