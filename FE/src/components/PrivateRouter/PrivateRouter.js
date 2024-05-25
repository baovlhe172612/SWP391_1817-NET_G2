import { Navigate, Outlet } from "react-router-dom"
import {useSelector} from 'react-redux'

function PrivateRouter() {
  // useSelector: nhận và trả hết tất cả các reducers có trong ALLREDUCER (STORE)
  const checkLogin = useSelector(state => state.LoginReducer);
  return (
    <>
    {checkLogin ? (<Outlet />) : (<Navigate to={"/admin/login"}/>)}
    </>
  )
}

export default PrivateRouter