import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getSessionItem } from "../../../helpers/Session.helper";
import { useSelector } from "react-redux";

function ProtectedRole({ roles }) {

  const account = useSelector(state => state.AccountReducer);

  if (!roles.includes(account.roleName)) {
    return <Navigate to="/admin/404err" />
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedRole;
