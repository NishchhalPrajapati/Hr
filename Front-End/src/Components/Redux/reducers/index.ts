import { combineReducers } from "redux";
import branchListReducer from "./branchReducer";
import branchUsersReducer from "./branchUsersReducer";
import clearFilterReducer from "./clearFilterReducer";
import contactsReducer from "../reducers/contactsreducer";
import filterReducer from "./filterReducer";
import organizationReducer from "./organizationReducer";
import organizationUserReducer from "../reducers/organizationUsersReducer";
import progressReducer from "./progressReducer";
import snackbarReducer from "./snackbarReducer";
import stageReducer from "./stageReducer";
import teamLeadUsersReducer from "../reducers/teamLeadUserReducer";
import userReducer from "./userReducer";

const allReducer = combineReducers({
  user: userReducer,
  snackbar: snackbarReducer,
  contacts: contactsReducer,
  organization: organizationReducer,
  filterObject: filterReducer,
  organizationUsers: organizationUserReducer,
  teamLeadUsers: teamLeadUsersReducer,
  clearFilter: clearFilterReducer,
  progress: progressReducer,
  leadsStage: stageReducer,
  branchList: branchListReducer,
  branchUsers: branchUsersReducer,
});

export default allReducer;
