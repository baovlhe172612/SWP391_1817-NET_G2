import {  Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { get } from "../../helpers/API.helper";
import { GET_ACCOUNT_BY_TOKEN } from "../../helpers/APILinks";
import { getCookie } from "../../helpers/Cookie.helper";
import { loginActions } from "../../actions/Login";

function PrivateRouter() {
  // useSelector: nhận và trả hết tất cả các reducers có trong ALLREDUCER (STORE)
  const checkLogin = useSelector((state) => state.LoginReducer);
  const token = getCookie("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // không được dùng async await trong useEffect
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const accountByToken = await get(`${GET_ACCOUNT_BY_TOKEN}/${token}`);
        if (accountByToken) {
          console.log(accountByToken);
          // nếu có token => tự động đăng nhập
          dispatch(loginActions(true));

          // move => admin
          navigate("/admin");
        }
      } catch (error) {
        console.log("Không có token");
        navigate("/admin/login");
      }
    };

    // có token mới có fetch api
    if (token) {
      fetchApi();
    } else {
      // không có token => sang trang login
      navigate("/admin/login");
    }
  }, [checkLogin]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default PrivateRouter;
