import {all, call, fork, put, takeEvery, select} from "redux-saga/effects";
import { message } from "antd";
import {
  GET_COMPANY_REQUEST,
  CREATE_COMPANY_REQUEST,
  UPDATE_COMPANY_REQUEST,
  CREATE_LOCATION_REQUEST,
  DELETE_COMPANY_REQUEST
} from "constants/ActionTypes";
import {
  getCompanySuccess,
  getCompanyRequest,
  companyError,
  deleteCompanySuccess
} from "../../appRedux/actions/Company";
import { commonGetCompanyRequest } from '../../appRedux/actions/Common';
import {showAuthMessage, userSignOut} from "../../appRedux/actions/Auth";
import { createCompany, getCompanies, updateCompany, createLocation, deleteCompany } from './../../services/company';

function* getCompany({ payload }) {
  try {
    const token = yield select((state) => state.auth.authUser.tokens.accessToken);
    const result = yield call(getCompanies, token, payload);
    console.log('result', result);
    if (result.status ===200) {
      yield put(getCompanySuccess(result.data));
      const obj = {
        page: 1,
        active: true
      }
      yield put(commonGetCompanyRequest(obj));
    } else {
      throw result;
    }
  } catch (error) {
    yield put(companyError());
    if (error.response.status === 401) {
      yield put(userSignOut());
    }
  }
}

function* deleteCompanyRequest({ payload }) {
  try {
    const token = yield select((state) => state.auth.authUser.tokens.accessToken);
    const result = yield call(deleteCompany, token, payload);
    if (result.status ===200) {
      yield put(deleteCompanySuccess(payload));
    } else {
      throw result;
    }
  } catch (error) {
    yield put(companyError());
    if (error.response.status === 401) {
      yield put(userSignOut());
    }
  }
}

function* createCompanyRequest({payload}) {
  try {
    const token = yield select((state) => state.auth.authUser.tokens.accessToken);
    const result = yield call(createCompany, token, payload);
    if (result.status === 200 || result.status === 201) {
      const obj = {
        page: 1,
        active: 'all'
      }
      yield put(getCompanyRequest(obj));
    } else {
      throw result;
    }
  } catch (error) {
    yield put(companyError());
    message.error(error.response.data.message);
  }
}

function* createLocationRequest({payload}) {
  try {
    const token = yield select((state) => state.auth.authUser.tokens.accessToken);
    const result = yield call(createLocation, token, payload);
    if (result.status === 200 || result.status === 201) {
      const obj = {
        page: 1,
        active: 'all'
      }
      yield put(getCompanyRequest(obj));
    } else {
      throw result;
    }
  } catch (error) {
    yield put(companyError());
    message.error(error.response.data.message);
  }
}

function* updateCompanyRequest({ payload }) {
  try {
    const token = yield select((state) => state.auth.authUser.tokens.accessToken);
    const result = yield call(updateCompany, token, payload);
    if (result.status === 200) {
      const obj = {
        page: 1,
        active: 'all'
      }
      yield put(getCompanyRequest(obj));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

export function* getCompanieshandler() {
  yield takeEvery(GET_COMPANY_REQUEST, getCompany);
}

export function* createCompanieshandler() {
  yield takeEvery(CREATE_COMPANY_REQUEST, createCompanyRequest);
}

export function* createLocationhandler() {
  yield takeEvery(CREATE_LOCATION_REQUEST, createLocationRequest);
}

export function* updateCompanieshandler() {
  yield takeEvery(UPDATE_COMPANY_REQUEST, updateCompanyRequest);
}

export function* deleteCompanyHandler() {
  yield takeEvery(DELETE_COMPANY_REQUEST, deleteCompanyRequest);
}

export default function* rootSaga() {
  yield all([
    fork(getCompanieshandler),
    fork(createCompanieshandler),
    fork(createLocationhandler),
    fork(updateCompanieshandler),
    fork(deleteCompanyHandler)
  ]);
}
