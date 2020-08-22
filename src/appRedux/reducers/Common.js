import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  COMMON_GET_COMPANY_REQUEST,
  COMMON_GET_COMPANY_SUCCESS,
  SET_ACTIVE_COMPANY,
  GET_JOBS_SUCCESS,
  GET_DEPARTMENT_SUCCESS
} from 'constants/ActionTypes'

const INIT_STATE = {
  error: "",
  loading: false,
  message: '',
  companies: [],
  activeCompany: {
    company: null,
    location: null
  },
  jobs: [],
  departments: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return {...state, error: '', message: '', loading: true};
    }
    case FETCH_SUCCESS: {
      return {...state, error: '', message: '', loading: false};
    }
    case SHOW_MESSAGE: {
      return {...state, error: '', message: action.payload, loading: false};
    }
    case FETCH_ERROR: {
      return {...state, loading: false, error: action.payload, message: ''};
    }
    case HIDE_MESSAGE: {
      return {...state, loading: false, error: '', message: ''};
    }
    case COMMON_GET_COMPANY_REQUEST: {
      return {
        ...state,
        loader: true,
      }
    }
    case COMMON_GET_COMPANY_SUCCESS: {
      return {
        ...state,
        loader: false,
        companies: action.payload,
      }
    }
    case SET_ACTIVE_COMPANY: {
      return {
        ...state,
        activeCompany: action.payload,
      }
    }
    case GET_JOBS_SUCCESS: {
      return {
        ...state,
        jobs: action.payload,
      }
    }
    case GET_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        departments: action.payload,
      }
    }
    default:
      return state;
  }
}
