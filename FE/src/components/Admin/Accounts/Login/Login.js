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
import { accountActions } from "../../../../actions/AccountActions";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = getCookie("token");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const accountByToken = await get(`${GET_ACCOUNT_BY_TOKEN}/${token}`);
        if (accountByToken) {
          dispatch(loginActions(true));
          dispatch(accountActions(accountByToken));
          if (accountByToken.roleId == 3) {
            navigate("/admin/table");
          } else {
            navigate("/admin/dashboard");
          }
        }
      } catch (error) {
        navigate("/admin/login");
      }
    };

    if (token) {
      fetchApi();
    } else {
      navigate("/admin/login");
    }
  }, []);

  const onFinish = async (values) => {
    try {
      const dataAuthen = await get(
        `${GET_ACCOUNT_BY_AUTH}?username=${values.username}&password=${values.password}`
      );
      if (dataAuthen) {
        alear_success_login("Login Successfully !!!", dataAuthen.fullName);
        setCookie("token", dataAuthen.token, 10);
        dispatch(loginActions(true));
        dispatch(accountActions(dataAuthen));
        if (dataAuthen.roleId == 3) {
          navigate("/admin/table");
          return;
        }
        navigate("/admin");
      } else {
        message.error("Login failed. Please check your username or password !!!");
      }
    } catch (error) {
      message.error("Login failed. Please check your username or password !!!");
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
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                  {
                    validator: (_, value) => {
                      const usernameRegex = /^[a-zA-Z0-9_]*$/;
                      if (!usernameRegex.test(value)) {
                        return Promise.reject("Username can only include letters, numbers, and underscores.");
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Your Name" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
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
