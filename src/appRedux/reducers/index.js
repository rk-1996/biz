import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import Settings from "./Settings";
import Auth from "./Auth";
import Notes from "./Notes";
import Contact from "./Contact";
import Common from "./Common";
import Company from "./Company";
import People from "./People";


const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  auth: Auth,
  notes: Notes,
  contact: Contact,
  common: Common,
  company: Company,
  people: People,
});

export default createRootReducer
