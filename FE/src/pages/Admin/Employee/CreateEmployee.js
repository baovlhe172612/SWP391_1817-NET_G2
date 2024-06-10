import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Space, Switch, message } from "antd";
import { post } from '../../../helpers/API.helper';
import { get } from "../../../helpers/API.helper";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useSelector } from 'react-redux';

function CreateEmployee() {
    const account = useSelector(state => state.AccountReducer);
    console.log(account)


    const account = useSelector(state => state.AccountReducer);
    console.log(account)


    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        if(values.fullName.trim().length == '') {
            message.error(`Please enter a full name`);
            return;
        }
        // console.log(values);
        // Gửi giá trị của Switch trực tiếp, không cần xử lý bổ sung
        values.isDelete = 0;
        values.roleId = 3;
        if (values.status) {
            values.status = 1;
        } else {
            values.status = 0;
        }
        try {
            const response = await post(`http://localhost:5264/api/Account`, values);
            // Kiểm tra giá trị trả về từ API
            console.log("response", response)
            console.log("response", response)
            if (response) {
                form.resetFields();
                message.success('Account created successfully!');
                navigate(`/admin/employee/`);
                // Thực hiện các hành động khác nếu cần
            }
        } catch (error) {
            message.error('Account created Fail!UserName or Email or Phone or Cccd is exist');
            console.error("Failed to create account. Please try again later", error);
        }
    };

    const [Stores, setStores] = useState([]);
    const fetchApi = async () => {
        try {
            const data = await get("http://localhost:5264/api/stores");
            console.log("stores: ", data)
            console.log("stores: ", data)
            setStores(data);
        } catch (error) {
            message.error("Error fetching accounts");
            console.log("Error in ListStoreManager", error);
            setStores([]);
        }
    };
    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Create Store's Employee</h2>
            <h2 style={{ textAlign: 'center' }}>Create Store's Employee</h2>
            <Form
                layout="horizontal"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 14 }}
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
                    label="Address"
                    name="Address"
                >
                    <Input />
                </Form.Item>



                <Form.Item
                <Form.Item
                    label="CCCD"
                    name="cccd"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your cccd!',
                        },
                        {
                            pattern: /^0\d{0,11}$/,
                            message: 'Please input your number starting with 0 and ensure the length is less than or equal to 12 digits!',
                            pattern: /^0\d{0,11}$/,
                            message: 'Please input your number starting with 0 and ensure the length is less than or equal to 12 digits!',
                        },
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
                            message: 'Please input your number start =0 and ensure the length is <= 10 digits!',
                        },
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
                    initialValue={account.storeId}
                >
                    <Select>
                       
                            <Select.Option value={account.storeId}>
                                {account.storeName} 
                            </Select.Option>
                      
                    </Select>

                    {/* <Select defaultValue={account.storeId}>
                        <Option value={account.storeId}>{account.storeName}</Option>
                        {(Stores.filter(store => store.storeId !== account.storeId)).map(store => (
                            <Option key={store.storeId} value={store.storeId}>
                       
                            <Select.Option value={account.storeId}>
                                {account.storeName} 
                            </Select.Option>
                      
                    </Select>

                    {/* <Select defaultValue={account.storeId}>
                        <Option value={account.storeId}>{account.storeName}</Option>
                        {(Stores.filter(store => store.storeId !== account.storeId)).map(store => (
                            <Option key={store.storeId} value={store.storeId}>
                                {store.storeName}
                            </Option>
                            </Option>
                        ))}
                    </Select> */}

                    </Select> */}

                </Form.Item>
                <Form.Item
                    label="isdelete"
                    name="isDelete"
                    hidden
                >
                    <Input value={0} />
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

export default CreateEmployee;