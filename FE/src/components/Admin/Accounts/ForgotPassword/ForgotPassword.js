import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "./Login.scss";

function ForgotPassword() {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <>
      <div className="container">
        <div className="signin-content">
          {/* FORM */}
          <div className="signin-form">
            <h2 className="form-title">Forgot Password</h2>
            <Form
              name="email"
              onFinish={onFinish}
              className="register-form"
              id="login-form"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Your Email" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
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
            <Link className="signup-image-link" to="/admin/login">
              Have account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
