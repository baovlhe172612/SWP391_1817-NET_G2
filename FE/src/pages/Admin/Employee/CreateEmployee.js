import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Space, Switch, message } from "antd";
import { post, get } from '../../../helpers/API.helper';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function CreateEmployee() {
    const account = useSelector(state => state.AccountReducer);
    console.log(account)

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        values.isDelete = 0;
        values.roleId = 3;
        values.status = values.status ? 1 : 0;
        
        try {
            const response = await post(`http://localhost:5264/api/Account`, values);
            if (response) {
                form.resetFields();
                message.success('Account created successfully!');
                navigate(`/admin/employee/`);
            }
        } catch (error) {
            message.error('Account creation failed! Username, Email, Phone, or CCCD might already exist.');
            console.error("Failed to create account. Please try again later", error);
        }
    };

    const [Stores, setStores] = useState([]);
    const fetchApi = async () => {
        try {
            const data = await get("http://localhost:5264/api/stores");
            console.log("stores: ", data)
            setStores(data);
        } catch (error) {
            message.error("Error fetching stores");
            console.log("Error in ListStoreManager", error);
            setStores([]);
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const noOnlySpacesRule = {
        validator: (_, value) => {
            if (value && value.trim() === "") {
                return Promise.reject(new Error('This field cannot contain only spaces!'));
            }
            return Promise.resolve();
        }
    };

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Create Store's Employee</h2>
            <Form
                layout="horizontal"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 14 }}
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
                        noOnlySpacesRule
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
                            message: 'Please input your password!',
                        },
                        noOnlySpacesRule
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
                        noOnlySpacesRule
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
                        noOnlySpacesRule
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[noOnlySpacesRule]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="CCCD"
                    name="cccd"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your CCCD!',
                        },
                        {
                            pattern: /^0\d{0,11}$/,
                            message: 'Please input a number starting with 0 and ensure the length is less than or equal to 12 digits!',
                        },
                        noOnlySpacesRule
                    ]}
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
                        {
                            pattern: /^0\d{0,9}$/,
                            message: 'Please input a number starting with 0 and ensure the length is less than or equal to 10 digits!',
                        },
                        noOnlySpacesRule
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="roleId"
                    key="roleId"
                >
                    <Select defaultValue={3} disabled>
                        <Select.Option value={3}>Employee</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Store"
                    name="StoreId"
                    key="StoreId"
                    initialValue={account.storeId}
                >
                    <Select>
                        <Select.Option value={account.storeId}>
                            {account.storeName}
                        </Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="isDelete"
                    name="isDelete"
                    hidden
                >
                    <Input value={0} />
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

export default CreateEmployee;