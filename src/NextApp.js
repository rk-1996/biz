import React from "react";
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from 'connected-react-router'
import {Route, Switch} from "react-router-dom";
import "assets/vendors/style";
import "styles/wieldy.less";
import { store, persistor, history } from './appRedux/store';
import "./firebase/firebase";
import App from "./containers/App/index";

const NextApp = () =>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App}/>
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>;


export default NextApp;
