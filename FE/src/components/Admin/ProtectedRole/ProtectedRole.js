import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getSessionItem } from "../../../helpers/Session.helper";

function ProtectedRole({ roles }) {

  const account = getSessionItem("account");
  console.log(account)

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
