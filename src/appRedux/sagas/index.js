import {all} from "redux-saga/effects";
import authSagas from "./Auth";
import notesSagas from "./Notes";
import companySagas from "./Company";
import commonSagas from "./Common";
import peopleSagas from "./People";

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    notesSagas(),
    companySagas(),
    commonSagas(),
    peopleSagas()
  ]);
}
