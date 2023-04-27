import { combineReducers } from "redux";
import { authReducer } from "./storeReducers";
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
