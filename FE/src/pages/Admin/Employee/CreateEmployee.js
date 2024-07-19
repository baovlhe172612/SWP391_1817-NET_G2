import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Switch, message } from "antd";
import { post, get } from '../../../helpers/API.helper';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { CREATE_ACCOUNT_EMPLOYEE, GET_ALL_ACCOUNTS, LIST_STORES } from '../../../helpers/APILinks';

function CreateEmployee() {
    const [form] = Form.useForm();
    const account = useSelector(state => state.AccountReducer);
    const navigate = useNavigate();
    const [stores, setStores] = useState([]);
    const [accounts, setAccounts] = useState([]);

    // Fetch stores and accounts data
    const fetchApi = async () => {
        try {
            const storeData = await get(LIST_STORES);
            const accountData = await get(GET_ALL_ACCOUNTS);
            setStores(storeData);
            setAccounts(accountData);
        } catch (error) {
            message.error("Error fetching data");
            console.error("Error in fetchApi", error);
            setStores([]);
            setAccounts([]);
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);

    // Handle form submission
    const handleSubmit = async (values) => {
        values.isDelete = 0;
        values.roleId = 3;
        values.status = values.status ? 1 : 0;

        try {
            const response = await post(CREATE_ACCOUNT_EMPLOYEE, values);
            if (response) {
                form.resetFields();
                message.success('Account created successfully!');
                navigate(`/admin/employee/`);
            }
        } catch (error) {
            message.error('Failed to create account. Please try again later.');
            console.error("Failed to create account", error);
        }
    };

    // Username validation
    const validateUsername = (_, value) => {
        const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
        if (!value) return Promise.resolve();
        if (!usernameRegex.test(value)) {
            return Promise.reject('Username must be 3-15 characters long and can only include letters, numbers, and underscores.');
        }
        if (accounts.some(account => account.userName === value)) {
            return Promise.reject('Username already exists');
        }
        return Promise.resolve();
    };

    // Password validation
    const validatePassword = (_, value) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!value) return Promise.resolve();
        if (!passwordRegex.test(value)) {
            return Promise.reject('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
        }
        return Promise.resolve();
    };

    // Email validation
    const validateEmail = (_, value) => {
        if (accounts.some(account => account.email === value)) {
            return Promise.reject('Email already exists');
        }
        return Promise.resolve();
    };

    // Full name validation
    const validateFullName = (_, value) => {
        const fullNameRegex = /^[a-zA-Z\s'-]{2,}$/;
        if (!value) return Promise.resolve();
        if (!fullNameRegex.test(value)) {
            return Promise.reject('Full name must be at least 2 characters long and can only include letters, spaces, hyphens, and apostrophes.');
        }
        return Promise.resolve();
    };

    // Citizens ID validation
    const validateCccd = (_, value) => {
        if (!value) return Promise.reject('Please input your Citizens ID number!');
        if (!/^\d{12}$/.test(value)) {
            return Promise.reject('Citizens ID number must be 12 digits!');
        }
        if (!/^0\d{11}$/.test(value)) {
            return Promise.reject('Citizens ID number must begin with 0!');
        }
        if (accounts.some(account => account.cccd === value)) {
            return Promise.reject('Citizens ID already exists');
        }
        return Promise.resolve();
    };

    // Phone validation
    const validatePhone = (_, value) => {
        if (!value) return Promise.reject('Please input your phone number!');
        if (!/^\d{10}$/.test(value)) {
            return Promise.reject('Phone number must be 10 digits!');
        }
        if (!/^0\d{9}$/.test(value)) {
            return Promise.reject('Phone number must begin with 0!');
        }
        if (accounts.some(account => account.phone === value)) {
            return Promise.reject('Phone number already exists');
        }
        return Promise.resolve();
    };

    return (
        <>
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
                        { required: true, message: 'Please input your username!' },
                        { validator: validateUsername }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="passWord"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { validator: validatePassword }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { type: 'email', message: 'The input is not valid E-mail!' },
                        { required: true, message: 'Please input your E-mail!' },
                        { validator: validateEmail }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                        { required: true, message: 'Please input your full name!' },
                        { validator: validateFullName }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Citizens ID"
                    name="cccd"
                    rules={[
                        { validator: validateCccd }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        { validator: validatePhone }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="roleId"
                >
                    <Select defaultValue={3} disabled>
                        <Select.Option value={3}>Employee</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Store"
                    name="StoreId"
                    initialValue={account.storeId}
                >
                    <Select>
                        <Select.Option value={account.storeId}>
                            {account.storeName}
                        </Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="status"
                    valuePropName="checked"
                    initialValue={true}
                >
                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
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
