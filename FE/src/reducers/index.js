import { combineReducers } from "redux";
import LoginReducer from "./Login";
import AccountReducer from "./Account.reducer";
import cartReducer from "./CartReducer";
import SiderReducer from "./Sider.reducer";
const allReducers = combineReducers({
  // thêm nhiều reducer ở đây
  LoginReducer,
  AccountReducer,
  cart: cartReducer,
  SiderReducer
});

export default allReducers;
