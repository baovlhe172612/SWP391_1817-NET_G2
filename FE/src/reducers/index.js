import { combineReducers } from "redux";
import LoginReducer from "./Login";
import AccountReducer from "./Account.reducer";
import clientStore from "./CartRoot";
const allReducers = combineReducers({
  // thêm nhiều reducer ở đây
  LoginReducer,
  AccountReducer,
  clientStore,
});

export default allReducers;
