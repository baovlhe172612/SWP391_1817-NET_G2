import React,{ useEffect, useState } from 'react'
import { Button, Form, Input, Select, Space, Switch,message } from "antd";
import { post } from '../../../helpers/API.helper';
import { get } from "../../../helpers/API.helper";
import { useNavigate } from "react-router-dom";
function CreateStoreManager() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
      console.log(values); 
      // Gửi giá trị của Switch trực tiếp, không cần xử lý bổ sung
      values.isDelete = 0;
      values.roleId = 2;
      if(values.status ) {
        values.status = 1;
      } else{   
        values.status = 0;
      }
      try {
        const response = await post(`http://localhost:5264/api/Account`, values);      
        // Kiểm tra giá trị trả về từ API
        if (response) {
          form.resetFields();
          message.success('Account created successfully!');
          navigate(`/admin/manager-store/`);  
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
        const data = await get("http://localhost:5264/api/stores");  
        const dataAccount = await get(`http://localhost:5264/api/Account/all`);   
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
          <h2>Create Store's Manager</h2>
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
                      ({getFieldValue})=>({
                        validator(_, value){
                          if(Accounts.some((account)=>account.userName === value)){
                            return Promise.reject('User Name already exists');
                          }                
                          return Promise.resolve();
                        }
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
                      ({getFieldValue})=>({
                        validator(_, value){
                          if(Accounts.some((account)=>account.email === value)){
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
                  label="CCCD"
                  name="cccd"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value) {
                          return Promise.reject('Please input your CCCD number!');
                        }                           
                        if (!/^\d{12}$/.test(value)) {
                          return Promise.reject('CCCD number must be 12 digits!');
                        }
                        if (!/^0\d{11}$/.test(value)) {
                          return Promise.reject('CCCD number must begin with 0!');
                        }
                        if(Accounts.some((account)=>account.cccd === value)){
                          return Promise.reject('CCCD already exists');
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
                        if(Accounts.some((account)=>account.phone === value)){
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
                <Select defaultValue={2} disabled>
                   <Select.Option value={2}>Manager</Select.Option>
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
                  <Input value={0}/>
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

export default CreateStoreManager