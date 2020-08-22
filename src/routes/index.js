import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}superadmin`} component={asyncComponent(() => import('./SuperAdmin'))}/>
      <Route path={`${match.url}people`} component={asyncComponent(() => import('./People'))}/>
      <Route path={`${match.url}settings`} component={asyncComponent(() => import('./Settings'))}/>
      <Route path={`${match.url}timesheet`} component={asyncComponent(() => import('./Timesheet'))}/>
    </Switch>
  </div>
);

export default App;
