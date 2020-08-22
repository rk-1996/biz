import React from "react";
import {Route, Switch} from "react-router-dom";
import AddEmployee from "./AddEmployee";
import CheckPeopleEmail from "./CheckPeopleEmail";
import AddContractor from "./AddContractor";
import ListPeople from "./ListPeople";
import ViewEmployee from "./ViewEmployee";
import ViewContrator from "./ViewContrator";

const People = ({match}) => (
  <Switch>
    <Route path={`${match.url}/check-email/:id`} component={CheckPeopleEmail}/>
    <Route path={`${match.url}/add-employee`} component={AddEmployee}/>
    <Route path={`${match.url}/add-contractor`} component={AddContractor}/>
    <Route path={`${match.url}/view-employee/:id`} component={ViewEmployee}/>
    <Route path={`${match.url}/view-contractor/:id`} component={ViewContrator}/>
    <Route path={`${match.url}`} component={ListPeople}/>
  </Switch>
);

export default People;
