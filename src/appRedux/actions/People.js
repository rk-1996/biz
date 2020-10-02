import {
  ADD_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_REQUEST,
  ADD_CONTRACTOR_REQUEST,
  UPDATE_CONTRACTOR_REQUEST,
  GET_PEOPLE_REQUEST,
  GET_PEOPLE_SUCCESS,
  PEOPLE_ERROR,
  GET_VALID_PIN,
  GET_VALID_PIN_SUCCESS,
  GET_VALID_PIN_ERROR,
  GET_NEW_ADDED_EMPLOYEE_EMAIL,
  NEW_ADDED_EMPLOYEE_EMAIL
} from "../../constants/ActionTypes";

export const addEmployeeRequest = (payload) => {
  return {
    type: ADD_EMPLOYEE_REQUEST,
    payload,
  }
};

export const addContractorRequest = (payload) => {
  return {
    type: ADD_CONTRACTOR_REQUEST,
    payload
  }
};

export const updateEmployeeRequest = (payload) => {
  return {
    type: UPDATE_EMPLOYEE_REQUEST,
    payload,
  }
};

export const updateContractorRequest = (payload) => {
  return {
    type: UPDATE_CONTRACTOR_REQUEST,
    payload
  }
};

export const getValidPinRequest = (payload) => {
  console.log(payload)
  return {
    type: GET_VALID_PIN,
    payload
  }
};

export const getValidPinSuccess = (payload) => {
  return {
    type: GET_VALID_PIN_SUCCESS,
    payload
  }
};

export const getNewAddedEmployeeEmail = (payload) => {
  return {
    type: GET_NEW_ADDED_EMPLOYEE_EMAIL
  }
};

export const newAdedEmployeeEmailFun = (email) => {
  console.log(email)
  return {
    type: NEW_ADDED_EMPLOYEE_EMAIL,
    payload: email
  }
};

export const getValidPinError = (payload) => {
  return {
    type: GET_VALID_PIN_ERROR,
    payload
  }
};

export const getPeopleRequest = (payload) => {
  return {
    type: GET_PEOPLE_REQUEST,
    payload
  }
};


export const getPeopleSuccess = (payload) => {
  return {
    type: GET_PEOPLE_SUCCESS,
    payload
  }
};

export const peopleError = () => {
  return {
    type: PEOPLE_ERROR
  }
};


