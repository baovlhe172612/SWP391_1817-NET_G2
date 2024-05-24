import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
// import "../css2/style2.css";
import { Link } from "react-router-dom";

function Register() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <>
      <div className="container">
        <div className="signup-content">
          {/* FORM */}
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            <Form
              name="register"
              onFinish={onFinish}
              initialValues={{
                agree: false,
              }}
              className="register-form"
              id="register-form"
            >
              <Form.Item
                name="name"
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
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Your Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Repeat your password"
                />
              </Form.Item>

              <Form.Item
                name="agree"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept terms")),
                  },
                ]}
              >
                <Checkbox>
                  I agree to all statements in{" "}
                  <a href="#" className="term-service">
                    Terms of service
                  </a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* IMAGE */}
          <div className="signup-image">
            <figure>
              <img
                src="https://upload.wikimedia.org/wikipedia/vi/2/2d/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg"
                alt="sign up"
              />
            </figure>
            <div>
              <Link className="signup-image-link" to="/admin/login">
                I am already member
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
