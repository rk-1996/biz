import React from "react";
import {Route, Switch} from "react-router-dom";
import Companies from "./Companies";
import ViewCompany from "./Companies/ViewCompany";

const Main = ({match}) => (
  <Switch>
    <Route path={`${match.url}/companies`} component={Companies}/>
    <Route path={`${match.url}/viewcompany/:id`} component={ViewCompany}/>
  </Switch>
);

export default Main;
