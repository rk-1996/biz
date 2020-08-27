import axios from "axios";
import { setHeadersWithAccessToken } from './index';
const API_BASE = process.env.REACT_APP_APIBASE;

// Create Contractor Service
export const uploadOns3 = (token, params) => {
    let bodyFormData = new FormData();
    bodyFormData.set('files', params.file);

    setHeadersWithAccessToken(token);
    return axios({
        method: 'post',
        url: `${API_BASE}/fileupload`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .then(e => e)
        .catch(e => e);
};

// Get user details by pin Employee/Contractor
export const getPeople = (token, params) => {
    setHeadersWithAccessToken(token);
    return axios
        .get(`${API_BASE}/people-locations/pin-details/${params.company}/${params.location}/${params.pin}`)
        .then(e => e)
        .catch(e => e);
};

//this function is for used login people data
export const getLoginPeopleData = (token, dataObj) => {
    setHeadersWithAccessToken(token);
    return axios
        .get(`${API_BASE}/punch-clock?userId=${dataObj.userId}&locationId=${dataObj.locationId}&date=${dataObj.date}`)
        .then(e => e)
        .catch(e => e);
}

// for punch in user
export const punchInUser = (token, params) => {
    setHeadersWithAccessToken(token);
    return axios
        .post(`${API_BASE}/punch-clock`, params)
        .then(e => e)
        .catch(e => e);
};

//for punching out user
export const punchOutUser = (token, punchCardId, params) => {
    setHeadersWithAccessToken(token);
    return axios
        .put(`${API_BASE}/punch-clock/${punchCardId}`, params)
        .then(e => e)
        .catch(e => e);
};

export const addBraekPunchCard = (token, params) => {
    setHeadersWithAccessToken(token);
    return axios
        .post(`${API_BASE}/punch-clock/punchCard`, params)
        .then(e => e)
        .catch(e => e);
}

//add break out punch card
export const addBraekOutPunchCard = (token, params, id) => {
    setHeadersWithAccessToken(token);
    return axios
        .put(`${API_BASE}/punch-clock/punchCard/${id}`, params)
        .then(e => e)
        .catch(e => e);
}

//for add one punch card image in current object
export const addPunchCardImage = (token, params) => {
    setHeadersWithAccessToken(token);
    return axios
        .post(`${API_BASE}/punch-clock/punchCardImage`, params)
        .then(e => e)
        .catch(e => e);
}