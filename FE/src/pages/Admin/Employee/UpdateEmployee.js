import React from "react";
import { Button, Form, Input, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { get, patch, put } from "../../../helpers/API.helper";
import { useParams, Link, useNavigate } from "react-router-dom";
import { alear_success } from "../../../helpers/Alert.helper";

const { Option } = Select;

function UpdateEmployee() {
  const [AccountEmployee, setAccountEmployee] = useState([]);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`http://localhost:5264/employee/${id}`);
        console.log("data:",data)
        form.setFieldsValue({
          accountId: data.accountId,
          email: data.email,
          fullName: data.fullName,
          isDelete: data.isDelete === 1,
          location: data.location,
          userName: data.userName,
          passWord: data.passWord,
          phone: data.phone,
          token: data.token,
          status: data.status,
          storeId: data.storeId,
          storeName: data.storeName,
          roleId: data.roleId,
          roleName: data.roleName,
        });
        setAccountEmployee(data);
        console.log(AccountEmployee)
      } catch (error) {
        console.log("Error in UpdateStore", error);
        setAccountEmployee([]);
      }
    };
    console.log(AccountEmployee)

    fetchApi();
  }, [form, id]);

  const handleSubmit = async (values) => {
    console.log("handleSubmit",values)
    values.isDelete = values.isDelete ? 1 : 0;
    try {
      // await put(`http://localhost:5264/api/employee/Update/${id}`, values);
      // await put(`http://localhost:5264/api/employee/${id}`, values);
      await put(`http://localhost:5264/api/account/${id}`, values);


      alear_success("Update!", "updated");
      navigate(`/admin/employee/`);
    } catch (error) {
      console.log("Error updating employee", error);
    }
  };

  return (
    <>
      <h2>Update Employee</h2>
      <Form
        layout="horizontal"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 14 }}
        name="update-employee"
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="passWord"
          rules={[
            {
              required: true,
              message: "Please input your password!",
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
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
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
              message: "Please input your full name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Location" name="location">
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            {
              pattern: /^0\d{9}$/,
              message: "Please input your number starting with 0 and ensure the length is 10 digits!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item label="Role" name="roleId" key="roleId">
          <Select defaultValue={3} disabled>
            <Option value={3}>Employee</Option>
          </Select>
        </Form.Item> */}

        <Form.Item label="Role" name="roleName" key="roleId">
          <Select defaultValue={form.getFieldValue("roleName")} disabled>
            {/* <Option value={3}>Employee</Option> */}
          </Select>
        </Form.Item>
        
        <Form.Item label="Store" name="storeName" key="storeId">
          <Select defaultValue={form.getFieldValue("storeName")} disabled>
           
          </Select>
        </Form.Item>

        <Form.Item label="isDelete" name="isDelete" hidden>
          <Input />
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

export default UpdateEmployee;
