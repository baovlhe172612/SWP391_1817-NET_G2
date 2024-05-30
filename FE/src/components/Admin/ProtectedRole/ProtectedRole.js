import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getSessionItem } from "../../../helpers/Session.helper";
import { useSelector } from "react-redux";

function ProtectedRole({ roles }) {
  // lấy account từ store
  const account = useSelector(state => state.AccountReducer);

  // check xem Account có role trùng với những thằng (roles truyền vào) ko
  if (!roles.includes(account.roleName)) {
    // Không trùng => sang trang error
    return <Navigate to="/admin/404err" />
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedRole;
