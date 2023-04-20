import { combineReducers } from "redux";
import { authReducer } from "./storeReducers";
const rootReducer = combineReducers({
  user: authReducer,
});

export default rootReducer;
