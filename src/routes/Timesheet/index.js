import React from "react";
import {Route, Switch} from "react-router-dom";
import Dashboard from "./Dashboard";

const Timesheet = ({match}) => (
  <Switch>
    <Route path={`${match.url}`} component={Dashboard}/>
  </Switch>
);

export default Timesheet;
