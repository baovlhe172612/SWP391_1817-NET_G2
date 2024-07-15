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
          dispatch(loginActions(true));

          dispatch(accountActions(accountByToken));

          console.log('accountByToken:::', accountByToken)

          // nếu Account có role là employee => tự động chuyển đến trang listTable
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
      // không có token(Chưa đăng nhập lần nào) => sang trang login
      navigate("/admin/login");
    }
  }, []);

  // SUBMIT - Đăng nhập
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      // call API
      const dataAuthen = await get(
        `${GET_ACCOUNT_BY_AUTH}?username=${values.username}&password=${values.password}`
      );
      console.log(dataAuthen);
      // console.log(dataAuthen);
      if (dataAuthen) {
        // message login success
        alear_success_login("Login Successfully !!!", dataAuthen.fullName);

        // set TOKEN for login again
        setCookie("token", dataAuthen.token, 10);

        // biến islogin => cập nhật lại trạng thái Store
        dispatch(loginActions(true));

        // không dùng session nữa => gửi lên store 1 thằng account mới luôn
        dispatch(accountActions(dataAuthen));

        // Account Employee => sang trang table
        if (dataAuthen.roleId == 3) {
          navigate("/admin/table");
          return;
        }

        navigate("/admin");
      } else {
        message.error(`Login failed. Please check your username or password !!!`);
      }
    } catch (error) {
      message.error(`Login failed. Please check your username or password !!!`);
    }
  };

  return (
    <>
      <div className="container">
        <div className="signin-content">
          <div className="signin-form">
            <h2 className="form-title">Sign in</h2>
            <Form
              name="login"
              onFinish={onFinish}
              className="register-form"
              id="login-form"
            >
              <Form.Item
              id="login"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Your Name" />
              </Form.Item>

              <Form.Item
               id="password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password !",
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

            <Link className="signup-image-link" to="/admin/register">
              <Button type="primary">
                Create an account
              </Button>
            </Link>

            <div style={{ marginTop: '10px' }}>
              <Link to="/admin/forgot-password">Forgot Password?</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;