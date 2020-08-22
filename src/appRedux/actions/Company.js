import {
  GET_COMPANY_REQUEST,
  GET_COMPANY_SUCCESS,
  CREATE_COMPANY_REQUEST,
  UPDATE_COMPANY_REQUEST,
  CREATE_LOCATION_REQUEST,
  COMPANY_ERROR,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS
} from "constants/ActionTypes";

export const getCompanyRequest = (param) => {
  return {
    type: GET_COMPANY_REQUEST,
    payload: param
  };
};

export const getCompanySuccess = (param) => {
  return {
    type: GET_COMPANY_SUCCESS,
    payload: param
  };
};

export const deleteCompanyRequest = (param) => {
  return {
    type: DELETE_COMPANY_REQUEST,
    payload: param
  };
};

export const deleteCompanySuccess = (param) => {
  return {
    type: DELETE_COMPANY_SUCCESS,
    payload: param
  };
};


export const createCompanyRequest = (param) => {
  return {
    type: CREATE_COMPANY_REQUEST,
    payload: param
  };
};

export const createLocationRequest = (param) => {
  return {
    type: CREATE_LOCATION_REQUEST,
    payload: param
  };
};

export const updateCompanyRequest = (param) => {
  return {
    type: UPDATE_COMPANY_REQUEST,
    payload: param
  };
};

export const companyError = () => {
  return {
    type: COMPANY_ERROR
  };
};
