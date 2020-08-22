import createSagaMiddleware from "redux-saga";
import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk';
import rootSaga from "../sagas/index";
import createRootReducer from '../reducers'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const createBrowserHistory = require('history').createBrowserHistory;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['auth', 'common']
};

const history = createBrowserHistory();

const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk,sagaMiddleware, routeMiddleware];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor, history };
