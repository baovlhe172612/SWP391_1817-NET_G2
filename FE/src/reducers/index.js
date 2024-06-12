import { combineReducers } from "redux";
import LoginReducer from "./Login";
import AccountReducer from "./Account.reducer";
const allReducers = combineReducers({
  // thêm nhiều reducer ở đây
  LoginReducer,
  AccountReducer,
});

export default allReducers;
