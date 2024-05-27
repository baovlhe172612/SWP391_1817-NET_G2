import React,{ useEffect, useState } from 'react'
import { Button, Form, Input, Select, Space, Switch,message } from "antd";
import { post } from '../../../helpers/API.helper';
import { get } from "../../../helpers/API.helper";
import { useNavigate } from "react-router-dom";

function CreateEmployee() {
    const [form] = Form.useForm();
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
        try {
            const response = await post(`http://localhost:5264/api/Account`, values);
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
    const fetchApi = async () => {
        try {
            const data = await get("http://localhost:5264/api/stores");
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
            <h2>Create Store's Employee</h2>
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
                >
                    <Select>
                        {Stores.map(store => (
                            <Select.Option value={store.storeId}>
                                {store.storeName}
                            </Select.Option>
                        ))}
                    </Select>
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