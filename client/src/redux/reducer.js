import { ALL_DRIVERS, GET_BY_ID } from "./action-types";

const initialState = {
  drivers: [],
  detail: [],
  error: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ALL_DRIVERS:
      return {
        ...state,
        drivers: payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        detail: payload,
      };
    default:
      return { ...state };
  }
}
