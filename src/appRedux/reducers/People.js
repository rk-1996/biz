import {
  GET_PEOPLE_REQUEST,
  GET_PEOPLE_SUCCESS,
  ADD_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_REQUEST,
  ADD_CONTRACTOR_REQUEST,
  UPDATE_CONTRACTOR_REQUEST,
  PEOPLE_ERROR,
  GET_VALID_PIN,
  GET_VALID_PIN_ERROR,
  GET_VALID_PIN_SUCCESS
} from 'constants/ActionTypes'

const INIT_STATE = {
  error: "",
  loader: false,
  message: '',
  people: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PEOPLE_REQUEST:
      return {
        ...state,
        loader: true
      };
    case GET_PEOPLE_SUCCESS:
      return {
        ...state,
        loader: false,
        people: action.payload
      };
    case ADD_EMPLOYEE_REQUEST:
      return {
        ...state,
        loader: true
      };
    case UPDATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loader: true
      };
    case ADD_CONTRACTOR_REQUEST:
      return {
        ...state,
        loader: true
      };
    case UPDATE_CONTRACTOR_REQUEST:
      return {
        ...state,
        loader: true
      };
    case PEOPLE_ERROR:
      return {
        ...state,
        loader: false
      };
    case GET_VALID_PIN:
      return {
        ...state,
        loader: true
      };
    case GET_VALID_PIN_SUCCESS:
      return {
        ...state,
        loader: false
      };
    case GET_VALID_PIN_ERROR:
      return {
        ...state,
        loader: false
      };
    default:
      return state;
  }
}
