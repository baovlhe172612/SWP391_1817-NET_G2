import React from 'react'
import {useDispatch} from "react-redux"
import { logoutActions } from '../../../../actions/Login';
import { deleteCookie, getCookie } from '../../../../helpers/Cookie.helper';
import { clearSession, getSessionItem } from '../../../../helpers/Session.helper';
import { siderActions } from '../../../../actions/Sider.action';

function Logout() {
    const dispatch = useDispatch();

    // xóa cookie
    const token = getCookie("token");
    if(token) {
        deleteCookie("token");
    }

    // Xóa Session
    const account = getSessionItem("account");
    if(account) {
      clearSession();
    }
    // set isLogin = false;
    dispatch(logoutActions(false));

    dispatch(siderActions({
      selectedKey: ["DashBoard1"],
      openKey: ["dashBoard"],
    }))

  return (
    <div>Logout</div>
  )
}

export default Logout