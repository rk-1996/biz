import axios from "axios";
const API_BASE = process.env.REACT_APP_APIBASE;

export const userLogin = params => {
  return axios
    .post(`${API_BASE}/auth/login`, params)
    .then(e => e)
    .catch(e => e);
};

export const checkToken = token => {
  return axios
    .get(`${API_BASE}/auth/check-access-token/${token}`)
    .then(e => e)
    .catch(e => e);
};
