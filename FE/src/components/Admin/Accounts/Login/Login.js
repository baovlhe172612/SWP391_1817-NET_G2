import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { get } from "../../../../helpers/API.helper";
import { GET_ACCOUNT_BY_AUTH } from "../../../../helpers/APILinks";
import {alear_success_login } from "../../../../helpers/Alert.helper";

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const dataAuthen = await get(
        `${GET_ACCOUNT_BY_AUTH}?username=${values.username}&password=${values.password}`
      );

      console.log(dataAuthen)
      if(dataAuthen) {
        alear_success_login("Đăng nhập thành công", dataAuthen.fullName)
      } else {
        message.error(`Đăng nhập thất bại: Sai mk hoặc tk`);
      }
    } catch (error) {
      message.error(`Đăng nhập thất bại:  Sai mk hoặc tk`);
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

              <Form.Item name="remember" valuePropName="checked" initialValue={true}>
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
          <div className="signin-image">
            <figure>
              <img
                src="https://upload.wikimedia.org/wikipedia/vi/2/2d/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg"
                alt="sign in"
              />
            </figure>
            {/* LINK */}
            <Link className="signup-image-link" to="/admin/register">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
