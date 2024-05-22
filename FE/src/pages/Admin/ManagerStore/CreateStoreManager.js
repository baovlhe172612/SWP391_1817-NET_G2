import React from 'react'
import { Button, Form, Input, Select, Space, Switch } from "antd";
function CreateStoreManager() {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
      console.log(values);
      // const response = await createEmployee(values);
      // console.log(response);
      // if (response) {
      //     form.resetFields();
      // }
  };

  return (
      <>
          <h2>Create Store's Manager</h2>
          <Form
              name="create-employee"
              onFinish={handleSubmit}
              form={form}
          >
              <Form.Item
                  label="Username"
                  name="userName"
                  rules={[
                      {
                          required: true,
                          message: 'Please input your username!',
                      },
                  ]}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                      {
                          required: true,
                          message: 'Please input your password!',
                      },
                  ]}
              >
                  <Input.Password />
              </Form.Item>

              <Form.Item
                  label="Status"
                  name="status"
                  valuePropName="checked"
                  initialValue={true}
              >
                  <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
              </Form.Item>

              <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                      {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                      },
                      {
                          required: true,
                          message: 'Please input your E-mail!',
                      },
                  ]}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  label="Full Name"
                  name="fullName"
                  rules={[
                      {
                          required: true,
                          message: 'Please input your full name!',
                      },
                  ]}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  label="Location"
                  name="location"
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                      {
                          required: true,
                          message: 'Please input your phone number!',
                      },
                  ]}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  label="Role"
                  name="roleId"
                  rules={[
                      {
                          required: true,
                          message: 'Please select a role!',
                      },
                  ]}
              >
                  <Select placeholder="Select a role">
                     
                      <Select.Option value="1">Manager</Select.Option>
                      <Select.Option value="2">Enployee</Select.Option>
                      {/* Add more roles as needed */}
                  </Select>
              </Form.Item>

              <Form.Item>
                  <Button type="primary" htmlType="submit">
                      Submit
                  </Button>
              </Form.Item>
          </Form>
      </>
  );
}

export default CreateStoreManager