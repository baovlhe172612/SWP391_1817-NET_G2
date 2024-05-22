import { Navigate, Outlet } from "react-router-dom"

function PrivateRouter() {
  const checkLogin = false;
  return (
    <>
    {checkLogin ? (<Outlet />) : (<Navigate to={"/admin/login"}/>)}
    </>
  )
}

export default PrivateRouter