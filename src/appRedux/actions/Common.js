import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  COMMON_GET_COMPANY_REQUEST,
  COMMON_GET_COMPANY_SUCCESS,
  SET_ACTIVE_COMPANY,
  GET_JOBS_REQUEST,
  GET_JOBS_SUCCESS,
  GET_DEPARTMENT_SUCCESS,
  CREATE_JOB,
  CREATE_DEPARTMENT,
  GET_DEPARTMENTS_REQUEST
} from "../../constants/ActionTypes";

export const fetchStart = () => {
  return {
    type: FETCH_START
  }
};

export const fetchSuccess = () => {
  return {
    type: FETCH_SUCCESS
  }
};

export const fetchError = (error) => {
  return {
    type: FETCH_ERROR,
    payload: error
  }
};

export const showMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  }
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE
  }
};

export const commonGetCompanyRequest = (param) => {
  return {
    type: COMMON_GET_COMPANY_REQUEST,
    payload: param
  };
};

export const commonGetCompanySuccess = (param) => {
  return {
    type: COMMON_GET_COMPANY_SUCCESS,
    payload: param
  };
};

export const setActiveCompany = (param) => {
  return {
    type: SET_ACTIVE_COMPANY,
    payload: param
  };
};

export const getJobRequest = (param) => {
  return {
    type: GET_JOBS_REQUEST,
    payload: param
  };
};

export const createJobRequest = (param) => {
  return {
    type: CREATE_JOB,
    payload: param
  };
};

export const getJobSucess = (param) => {
  return {
    type: GET_JOBS_SUCCESS,
    payload: param
  };
};

export const getDepartmentRequest = (param) => {
  return {
    type: GET_DEPARTMENTS_REQUEST,
    payload: param
  };
};

export const getDepartmentSucess = (param) => {
  return {
    type: GET_DEPARTMENT_SUCCESS,
    payload: param
  };
};

export const createDepartmentRequest = (param) => {
  return {
    type: CREATE_DEPARTMENT,
    payload: param
  };
};






