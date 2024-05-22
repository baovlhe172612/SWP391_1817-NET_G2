import { Navigate, Outlet } from "react-router-dom"

function PrivateRouter() {
  const checkLogin = true;
  return (
    <>
    {checkLogin ? (<Outlet />) : (<Navigate to={"/login"}/>)}
    </>
  )
}

export default PrivateRouter