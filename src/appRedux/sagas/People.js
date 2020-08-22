import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import {
  ADD_EMPLOYEE_REQUEST,
  ADD_CONTRACTOR_REQUEST,
  GET_PEOPLE_REQUEST,
  GET_VALID_PIN,
  GET_VALID_PIN_SUCCESS,
  GET_VALID_PIN_ERROR
} from "constants/ActionTypes";
import {
  getPeopleRequest,
  getPeopleSuccess,
  peopleError,
  getValidPinRequest,
  getValidPinSuccess,
  getValidPinError
} from "../../appRedux/actions/People";
import { message } from 'antd';
import { createEmployee, getPeople, createContractor, getValidPin } from './../../services/people';

function* addEmployeeHandler({ payload }) {
  try {
    const token = yield select((state) => state.auth.authUser.tokens.accessToken);
    const companies = yield select((state) => state.common.companies);
    const activeCompany = yield select((state) => state.common.activeCompany.company);
    const result = yield call(createEmployee, token, payload);
    if (result.status === 200 || result.status === 201) {
      const getCompany = companies.find(a => a.cid === activeCompany);
      if (getCompany && getCompany.locations.length) {
        const getLocationId = getCompany.locations[0].lid
        const obj = {
          company: activeCompany,
          dissmissed: false,
          location: getLocationId
        };
        yield put(getPeopleRequest(obj));
      }
      yield put(push("/people"));
      message.success('Employee has been added!')
    } else {
      throw result;
    }
  } catch (error) {
    console.log('error', error);
    yield put(peopleError());
    message.error(error.response.data.message);
  }
}

function* addContractorHandler({ payload }) {
  try {
    const token = yield select((state) => state.auth.authUser.tokens.accessToken);
    const companies = yield select((state) => state.common.companies);
    const activeCompany = yield select((state) => state.common.activeCompany.company);
    const result = yield call(createContractor, token, payload);
    // console.log('result', result);
    if (result.status === 200 || result.status === 201) {
      const getCompany = companies.find(a => a.cid === activeCompany);
      if (getCompany && getCompany.locations.length) {
        const getLocationId = getCompany.locations[0].lid
        const obj = {
          company: activeCompany,
          dissmissed: false,
          location: getLocationId
        };
        yield put(getPeopleRequest(obj));
      }
      yield put(push("/people"));
      message.success('Contractor has been added!')
    } else {
      throw result;
    }
  } catch (error) {
    yield put(peopleError());
    message.error(error.response.data.message);
  }
}

function* getPeopleHandler({ payload }) {
  try {
    const token = yield select((state) => state.auth.authUser.tokens.accessToken);
    const result = yield call(getPeople, token, payload);
    if (result.status === 200) {
      yield put(getPeopleSuccess(result.data));
    }
  } catch (error) {
    yield put(peopleError());
    console.log('error', error);
  }
}

function* getValidPinHandler({ payload }) {
  try {
    console.log(payload)
    const token = yield select((state) => state.auth.authUser.tokens.accessToken);
    const result = yield call(getValidPin, token, payload);
    if (result.status === 200) {
      yield put(getValidPinSuccess(result));
    } else {
      message.error('This pin is not unique you have to add unique pin!')
    }
  } catch (error) {
    yield put(getValidPinError());
    console.log('error', error);
  }
}

export function* addEmployeeSaga() {
  yield takeEvery(ADD_EMPLOYEE_REQUEST, addEmployeeHandler);
}

export function* addContractorSaga() {
  yield takeEvery(ADD_CONTRACTOR_REQUEST, addContractorHandler);
}

export function* getPeopleSaga() {
  yield takeEvery(GET_PEOPLE_REQUEST, getPeopleHandler);
}

export function* getValidPinSaga() {
  yield takeEvery(GET_VALID_PIN, getValidPinHandler);
}

export default function* rootSaga() {
  yield all([
    fork(addEmployeeSaga),
    fork(addContractorSaga),
    fork(getPeopleSaga),
    fork(getValidPinSaga)
  ]);
}
