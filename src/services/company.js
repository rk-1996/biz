import axios from "axios";
import { setHeadersWithAccessToken } from './index';
const API_BASE = process.env.REACT_APP_APIBASE;

// Get Company Listing Service
export const getCompanies = (token, params) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/company?active=${params.active}&page=${params.page}`)
    .then(e => e)
    .catch(e => e);
};

// Delete Company Service
export const deleteCompany = (token, params) => {
  setHeadersWithAccessToken(token);
  console.log('params', params)
  return axios
    .put(`${API_BASE}/company/dismiss/${params.id}?active=false`, { deleted: true })
    .then(e => e)
    .catch(e => e);
};


// Create Company Service
export const createCompany = (token, params) => {
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}/company`, params)
    .then(e => e)
    .catch(e => e);
};

// Create Location Service
export const createLocation = (token, params) => {
  const companyId = params.company;
  delete params.company;
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}/location/${companyId}`, params)
    .then(e => e)
    .catch(e => e);
};

// Update Company Service
export const updateCompany = (token, params) => {
  const id = params.id;
  delete params.id;
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/company/${id}`, params)
    .then(e => e)
    .catch(e => e);
};

// Update Company Service
export const updateLocation = (token, params, cid) => {
  const id = params.id;
  delete params.id;
  setHeadersWithAccessToken(token);
  return axios
    .put(`${API_BASE}/location/${cid}/${id}`, params)
    .then(e => e)
    .catch(e => e);
};

// Get Jobs Listing Service
export const getJobs = (token, params) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/job-department/${params.company}/job`)
    .then(e => e)
    .catch(e => e);
};

// Create Jobs
export const createJob = (token, params) => {
  setHeadersWithAccessToken(token);
  const companyId = params.company;
  params['type'] = 'job'
  delete params.company;
  return axios
    .post(`${API_BASE}/job-department/${companyId}`, params)
    .then(e => e)
    .catch(e => e);
};

// Get Department Listing Service
export const getDepartments = (token, params) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/job-department/${params.company}/department`)
    .then(e => e)
    .catch(e => e);
};

// Create Jobs
export const createDepartment = (token, params) => {
  setHeadersWithAccessToken(token);
  const companyId = params.company;
  params['type'] = 'department'
  delete params.company;
  return axios
    .post(`${API_BASE}/job-department/${companyId}`, params)
    .then(e => e)
    .catch(e => e);
};

// Get Job Member
export const getJobMember = (token, params) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/job/people/${params.id}`, params)
    .then(e => e)
    .catch(e => e);
};

// Get Job Member
export const getDepartmentMember = (token, params) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/department/people/${params.id}`, params)
    .then(e => e)
    .catch(e => e);
};

// Get Company Details
export const getCompanyDetails = (token, params) => {
  const id = params.id;
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/company/${id}`)
    .then(e => e)
    .catch(e => e);
};

// Get People Details
export const getPeopleCompanies = (token) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/people-locations`)
    .then(e => e)
    .catch(e => e);
};


// Get Admin Details
export const getAdminCompanies = (token) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/location`)
    .then(e => e)
    .catch(e => e);
};
