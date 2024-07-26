
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Space, Switch, message } from "antd";
import { post } from '../../../helpers/API.helper';
import { get } from "../../../helpers/API.helper";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { CREATE_ACCOUNT_EMPLOYEE, GET_ALL_ACCOUNTS, LIST_STORES, UPDATE_ACCOUNT_ID } from '../../../helpers/APILinks';
import CryptoJS from 'crypto-js';
function CreateEmployee() {
    const [form] = Form.useForm();
    const account = useSelector(state => state.AccountReducer);
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        console.log(values);
        // Gửi giá trị của Switch trực tiếp, không cần xử lý bổ sung
        values.isDelete = 0;
        values.roleId = 3;
        if (values.status) {
            values.status = 1;
        } else {
            values.status = 0;
        }
        values.passWord = CryptoJS.MD5(values.passWord.trim()).toString().trim();
        try {
            const response = await post(CREATE_ACCOUNT_EMPLOYEE, values);
            console.log("response: ",response)
            // Kiểm tra giá trị trả về từ API
            if (response) {
                form.resetFields();
                message.success('Account created successfully!');
                navigate(`/admin/employee/`);
                // Thực hiện các hành động khác nếu cần
            }
        } catch (error) {
            message.error('Account created Fail!');
            console.error("Failed to create account. Please try again later", error);
        }
    };

    const [Stores, setStores] = useState([]);
    const [Accounts, setAccounts] = useState([]);
    const fetchApi = async () => {
        try {
            const data = await get(LIST_STORES);
            const dataAccount = await get(GET_ALL_ACCOUNTS);

            setStores(data);
            setAccounts(dataAccount);
        } catch (error) {
            message.error("Error fetching accounts");
            console.log("Error in ListStoreManager", error);
            setStores([]);
            setAccounts([]);
        }
    };
    useEffect(() => {
        fetchApi();
    }, []);


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
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
                                if (!value) {
                                    return Promise.resolve(); // If the field is empty, let the 'required' rule handle it
                                }
                                if (!usernameRegex.test(value)) {
                                    return Promise.reject('Username must be 3-15 characters long and can only include letters, numbers, and underscores.');
                                }
                                if (Accounts.some((account) => account.userName === value)) {
                                    return Promise.reject('User Name already exists');
                                }
                                return Promise.resolve();
                            },
                        }),
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
                        {
                            validator(_, value) {
                                // Example regex: minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
                                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                                if (!value) {
                                    return Promise.resolve(); // If the field is empty, let the 'required' rule handle it
                                }
                                if (!passwordRegex.test(value)) {
                                    return Promise.reject('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}

                >
                    <Input.Password />
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
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (Accounts.some((account) => account.email === value)) {
                                    return Promise.reject('Email already exists');
                                }
                                return Promise.resolve();
                            }
                        }),
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
                        {
                            validator(_, value) {
                                // Example regex: allows letters, spaces, hyphens, and apostrophes, and must be at least 2 characters long
                                const fullNameRegex = /^[a-zA-Z\s'-]{2,}$/;
                                if (!value) {
                                    return Promise.resolve(); // If the field is empty, let the 'required' rule handle it
                                }
                                if (!fullNameRegex.test(value)) {
                                    return Promise.reject('Full name must be at least 2 characters long and can only include letters, spaces, hyphens, and apostrophes.');
                                }
                                return Promise.resolve();
                            },
                        },
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
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value) {
                                    return Promise.reject('Please input your Citizens ID number!');
                                }
                                if (!/^\d{12}$/.test(value)) {
                                    return Promise.reject('Citizens ID number must be 12 digits!');
                                }
                                if (!/^0\d{11}$/.test(value)) {
                                    return Promise.reject('Citizens ID number must begin with 0!');
                                }
                                if (Accounts.some((account) => account.cccd === value)) {
                                    return Promise.reject('Citizens ID already exists');
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value) {
                                    return Promise.reject('Please input your phone number!');
                                }
                                if (!/^\d{10}$/.test(value)) {
                                    return Promise.reject('Phone number must be 10 digits!');
                                }
                                if (!/^0\d{9}$/.test(value)) {
                                    return Promise.reject('Phone number must begin with 0!');
                                }
                                if (Accounts.some((account) => account.phone === value)) {
                                    return Promise.reject('Phone number already exists');
                                }
                                return Promise.resolve();
                            },
                        }),
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
                    label="isdelete"
                    name="isDelete"
                    hidden
                >
                    <Input value={0} />
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
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default CreateEmployee
