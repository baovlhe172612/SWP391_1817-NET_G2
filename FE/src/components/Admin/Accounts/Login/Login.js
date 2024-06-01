import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./Login.scss";

import { get } from "../../../../helpers/API.helper";
import {
  GET_ACCOUNT_BY_AUTH,
  GET_ACCOUNT_BY_TOKEN,
} from "../../../../helpers/APILinks";
import { alear_success_login } from "../../../../helpers/Alert.helper";
import { getCookie, setCookie } from "../../../../helpers/Cookie.helper";
import { loginActions } from "../../../../actions/Login";
import { setSessionItem } from "../../../../helpers/Session.helper";
import { accountActions } from "../../../../actions/AccountActions";

function Login() {
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();

  // Check token
  const token = getCookie("token");
  // không được dùng async await trong useEffect
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const accountByToken = await get(`${GET_ACCOUNT_BY_TOKEN}/${token}`);
        if (accountByToken) {
          // nếu có token => tự động đăng nhập
          dispatch(loginActions(true));

          // không dùng session nữa => gửi lên store 1 thằng account mới luôn 
          dispatch(accountActions(accountByToken));

          if (accountByToken.roleId == 3) {
            navigate("/admin/table");
          } else {
            // move => admin
            navigate("/admin/dashboard");
          }
        }
      } catch (error) {
        // console.log("Không có token");
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
  }, []);

  // Đăng nhập
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      // call API
      const dataAuthen = await get(
        `${GET_ACCOUNT_BY_AUTH}?username=${values.username}&password=${values.password}`
      );
      console.log(dataAuthen);
      if (dataAuthen) {
        // message login success
        alear_success_login("Đăng nhập thành công", dataAuthen.fullName);

        // set TOKEN for login again
        setCookie("token", dataAuthen.token, 10);

        // biến islogin
        dispatch(loginActions(true));

        // tự động chuyển sang trang dashboard
        navigate("/admin/");
      } else {
        // message login false
        message.error(`Đăng nhập thất bại: Sai mk hoặc tk`);
      }
    } catch (error) {
      message.error(`Đăng nhập thất bại:  Server False`);
      // alear_false("Đăng nhập thất bại", "False");
    }
  };

  return (
    <>
      <div className="container">
        <div className="signin-content">
          {/* FORM */}
          <div className="signin-form">
            <h2 className="form-title">Sign in</h2>
            <Form
              name="login"
              onFinish={onFinish}
              className="register-form"
              id="login-form"
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Your Name" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                initialValue={true}
              >
                <Checkbox>Remember Me</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* IMAGE */}
          {/* <div className="signin-image">
            <figure>
              <img
                src="https://upload.wikimedia.org/wikipedia/vi/2/2d/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg"
                alt="sign in"
              />
            </figure>
          
            <Link className="signup-image-link" to="/admin/register">
              Create an account
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Login;
