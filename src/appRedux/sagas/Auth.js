import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import { push } from "react-router-redux";
import { message } from "antd";
import {
  auth,
  facebookAuthProvider,
  githubAuthProvider,
  googleAuthProvider,
  twitterAuthProvider
} from "../../firebase/firebase";
import {
  SIGNIN_FACEBOOK_USER,
  SIGNIN_GITHUB_USER,
  SIGNIN_GOOGLE_USER,
  SIGNIN_TWITTER_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
  CHECK_TOKEN
} from "constants/ActionTypes";
import {
  showAuthMessage,
  userSignInSuccess,
  userSignOutSuccess,
  userSignUpSuccess,
  authError,
  userSignOut
} from "../../appRedux/actions/Auth";
import {
  userFacebookSignInSuccess,
  userGithubSignInSuccess,
  userGoogleSignInSuccess,
  userTwitterSignInSuccess
} from "../actions/Auth";
import { userLogin, checkToken } from './../../services/auth';

const createUserWithEmailPasswordRequest = async (email, password) =>
  await auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);

const signOutRequest = async () =>
  await auth.signOut()
    .then(authUser => authUser)
    .catch(error => error);


const signInUserWithGoogleRequest = async () =>
  await auth.signInWithPopup(googleAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithFacebookRequest = async () =>
  await auth.signInWithPopup(facebookAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithGithubRequest = async () =>
  await auth.signInWithPopup(githubAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithTwitterRequest = async () =>
  await auth.signInWithPopup(twitterAuthProvider)
    .then(authUser => authUser)
    .catch(error => error);

function* createUserWithEmailPassword({ payload }) {
  const { email, password } = payload;
  try {
    const signUpUser = yield call(createUserWithEmailPasswordRequest, email, password);
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      localStorage.setItem('user_id', signUpUser.user.uid);
      yield put(userSignUpSuccess(signUpUser.user.uid));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signInUserWithGoogle() {
  try {
    const signUpUser = yield call(signInUserWithGoogleRequest);
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      localStorage.setItem('user_id', signUpUser.user.uid);
      yield put(userGoogleSignInSuccess(signUpUser.user.uid));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}


function* signInUserWithFacebook() {
  try {
    const signUpUser = yield call(signInUserWithFacebookRequest);
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      localStorage.setItem('user_id', signUpUser.user.uid);
      yield put(userFacebookSignInSuccess(signUpUser.user.uid));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}


function* signInUserWithGithub() {
  try {
    const signUpUser = yield call(signInUserWithGithubRequest);
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      localStorage.setItem('user_id', signUpUser.user.uid);
      yield put(userGithubSignInSuccess(signUpUser.user.uid));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}


function* signInUserWithTwitter() {
  try {
    const signUpUser = yield call(signInUserWithTwitterRequest);
    if (signUpUser.message) {
      if (signUpUser.message.length > 100) {
        yield put(showAuthMessage('Your request has been canceled.'));
      } else {
        yield put(showAuthMessage(signUpUser.message));
      }
    } else {
      localStorage.setItem('user_id', signUpUser.user.uid);
      yield put(userTwitterSignInSuccess(signUpUser.user.uid));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signInUserWithEmailPassword({ payload }) {
  try {
    // yield put(userSignInSuccess({
    //   tokens: {
    //     accessToken: 'abc',
    //   },
    //   user : {
    //     type: 'admin'
    //   }
    // }));
    // yield put(push("/superadmin/companies"));
    const signInUser = yield call(userLogin, payload);
    if (signInUser.status === 201 || signInUser.status === 200) {
      yield put(userSignInSuccess(signInUser.data));
      if (payload.type === 'punch') {
        yield put(push("/punch-clock"));
      } else {
        console.log("condition checked")
        console.log(signInUser.data.user.companies && signInUser.data.user.companies.length && signInUser.data.user.companies[0] && !signInUser.data.user.companies[0].isDetailsConfirmed && signInUser.data.user.companies[0].type === "contractor")
        if (signInUser.data && signInUser.data.user) {
          if (signInUser.data.user.companies && signInUser.data.user.companies.length && signInUser.data.user.companies[0] && !signInUser.data.user.companies[0].isDetailsConfirmed && !signInUser.data.user.companies[0].type === "employee") { // && signInUser.data.user.companies[0].permissions === "contractor"
            yield put(push(`/people/verify-contractor/${signInUser.data.user.uid}`));
          } else if (signInUser.data.user.companies && signInUser.data.user.companies.length && signInUser.data.user.companies[0]
            && signInUser.data.user.companies[0].type === "employee" && !signInUser.data.user.companies[0].isDetailsConfirmed) {
            yield put(push(`/people/verify-employee/${signInUser.data.user.uid}`));
          } else if (signInUser.data.user.companies && signInUser.data.user.companies.length && signInUser.data.user.companies[0].isDetailsConfirmed && (signInUser.data.user.companies[0].permissions === "owner" || signInUser.data.user.companies[0].permissions === "manager" || signInUser.data.user.companies[0].permissions === "employee")) {
            yield put(push("/overview"));
          } else if (signInUser.data.user.companies && signInUser.data.user.companies.length && signInUser.data.user.companies[0] && !signInUser.data.user.companies[0].isDetailsConfirmed && signInUser.data.user.companies[0].type === "contractor") { // && signInUser.data.user.companies[0].permissions === "contractor"
            yield put(push(`/people/verify-contractor/${signInUser.data.user.uid}`));
          }
          else if (signInUser.data.user.companies && signInUser.data.user.companies.length && signInUser.data.user.companies[0].permissions === "admin") {
            yield put(push("/superadmin/companies"));
          }
        } else if (signInUser.data && signInUser.data.user && !signInUser.data.user.isDocumentUploaded) {
          yield put(push(`/people/verify-document/${signInUser.data.user.uid}`));
        } else {
          yield put(push("/superadmin/companies"));
        }
      }
    } else {
      yield put(authError());
      throw signInUser;
    }
  } catch (error) {
    yield put(authError());
    message.error(error.response.data.message);
  }
}

function* signOut() {
  try {
    const signOutUser = yield call(signOutRequest);
    if (signOutUser === undefined) {
      localStorage.removeItem('user_id');
      yield put(userSignOutSuccess(signOutUser));
    } else {
      yield put(showAuthMessage(signOutUser.message));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* checkTokenHandler() {
  try {
    const token = yield select((state) => state.auth.authUser.tokens.accessToken);
    const result = yield call(checkToken, token);
    if (result.status === 200) {
      // console.log('result', result);
    } else {
      throw result;
    }
  } catch (error) {
    yield put(userSignOut());
  }
}

export function* createUserAccount() {
  yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
}

export function* signInWithGoogle() {
  yield takeEvery(SIGNIN_GOOGLE_USER, signInUserWithGoogle);
}

export function* signInWithFacebook() {
  yield takeEvery(SIGNIN_FACEBOOK_USER, signInUserWithFacebook);
}

export function* signInWithTwitter() {
  yield takeEvery(SIGNIN_TWITTER_USER, signInUserWithTwitter);
}

export function* signInWithGithub() {
  yield takeEvery(SIGNIN_GITHUB_USER, signInUserWithGithub);
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export function* checkTokenSaga() {
  yield takeEvery(CHECK_TOKEN, checkTokenHandler);
}

export default function* rootSaga() {
  yield all([fork(signInUser),
  fork(checkTokenSaga),
  fork(createUserAccount),
  fork(signInWithGoogle),
  fork(signInWithFacebook),
  fork(signInWithTwitter),
  fork(signInWithGithub),
  fork(signOutUser)]);
}
