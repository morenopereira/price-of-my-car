import api from '../services/api';
import { apiRoute } from '../constants';

import removeRepetitions from '../utils/removeRepetitions';

const GET_YEARS_START = 'GET_YEARS_START';
const GET_YEARS_SUCCESS = 'GET_YEARS_SUCCESS';
const GET_YEARS_ERROR = 'GET_YEARS_ERROR';

const INITIAL_STATE = {
  data: [],
  error: false,
};

export const getYears = car => async dispatch => {
  dispatch({ type: GET_YEARS_START });
  try {
    const { main } = apiRoute;

    const { data } = await api(`${main}/brands/${car.brand}/models/${car.model}/years/${car.year}`);

    dispatch({ type: GET_YEARS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_YEARS_ERROR });
  }
};

export function years(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case GET_YEARS_START:
      return {
        ...state,
        data: [],
        error: false,
      };
    case GET_YEARS_SUCCESS:
      return {
        ...state,
        data: removeRepetitions(action.payload),
        error: false,
      };
    case GET_YEARS_ERROR:
      return {
        ...state,
        data: [],
        error: true,
      };
    default:
      return state;
  }
}
