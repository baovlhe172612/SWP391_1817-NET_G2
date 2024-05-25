import React from 'react'
import {useDispatch} from "react-redux"
import { logoutActions } from '../../../../actions/Login';
import { deleteCookie, getCookie } from '../../../../helpers/Cookie.helper';

function Logout() {
    const dispatch = useDispatch();

    // xóa cookie
    const token = getCookie("token");
    if(token) {
        deleteCookie("token");
    }
    // set isLogin = false;
    dispatch(logoutActions(false));

  return (
    <div>Logout</div>
  )
}

export default Logout