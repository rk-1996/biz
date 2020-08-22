import {
  GET_COMPANY_REQUEST,
  GET_COMPANY_SUCCESS,
  CREATE_COMPANY_REQUEST,
  // CREATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
  DELETE_COMPANY_SUCCESS,
  COMPANY_ERROR
} from "constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  companies: [],
  total: 0
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPANY_REQUEST: {
      return {
        ...state,
        loader: true,
      }
    }
    case GET_COMPANY_SUCCESS: {
      return {
        ...state,
        loader: false,
        companies: action.payload,
        total: 0
      }
    }
    case DELETE_COMPANY_SUCCESS: {
      return {
        ...state,
        loader: false,
        companies: state.companies.filter(a => a.cid !== action.payload.id),
        total: 0
      }
    }
    case CREATE_COMPANY_REQUEST: {
      return {
        ...state,
        loader: true,
      }
    }
    case UPDATE_COMPANY_REQUEST: {
      return {
        ...state,
        loader: true,
      }
    }
    case UPDATE_COMPANY_SUCCESS: {
      return {
        ...state,
        loader: false,
      }
    }
    case COMPANY_ERROR: {
      return {
        ...state,
        loader: false,
      }
    }
    default:
      return state;
  }
}
