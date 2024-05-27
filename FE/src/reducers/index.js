import { combineReducers } from "redux";
import LoginReducer from "./Login";

const allReducers = combineReducers({
  // thêm nhiều reducer ở đây
  LoginReducer,
});

export default allReducers;
