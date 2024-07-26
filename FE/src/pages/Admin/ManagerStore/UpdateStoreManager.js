import { Button, Form, Input, Select, Switch, message } from "antd";
import { useEffect, useState } from "react";
import { get, patch, put  } from "../../../helpers/API.helper";
import { useParams,Link } from "react-router-dom";
import Swal from "sweetalert2";
import { alear_success } from "../../../helpers/Alert.helper";
import { useNavigate } from "react-router-dom";
import { GET_ACCOUNT_BY_ID, GET_ALL_ACCOUNTS, LIST_STORES, UPDATE_ACCOUNT_MANAGER } from "../../../helpers/APILinks";
const { Option } = Select;

function UpdateStoreManager() {
  const [accountmanager, setAccountmanager] = useState([]);
  const [form] = Form.useForm();
  const id = useParams().id;
  const navigate = useNavigate()
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`${GET_ACCOUNT_BY_ID}/${id}`);
        console.log("data",data)
        // const dataAccount = await get(`${LIST_ACCOUNT}`);
        // Dùng phương thức setFieldsValue để khởi tạo giá trị ban đầu cho Form
        form.setFieldsValue({
            accountId: data.accountId,
            fullName: data.fullName,
            userName: data.userName,
            passWord: data.passWord,           
            status: data.status === 0,
            email: data.email, 
            isDelete: data.isDelete ,
            storeId: data.storeId,                     
            phone: data.phone,
            address: data.address,      
            roleId: data.roleId,
            cccd: data.cccd,
        });  
        setAccountmanager(data);   
        console.log("accountmanager",accountmanager)    
      } catch (error) {
        console.log("err in UpdateStore", error);
        setAccountmanager([]);
      }
    };
  
    fetchApi();
  }, [form]);

  const handleSubmit = async (values) => {    
    // sửa lại biến switch cho isDeleted
    values.status = values.status ? 1 : 0;
    values.roleId = 2
    values.isDelete =  0;
    
    console.log(values);
    const data = await put(`${UPDATE_ACCOUNT_MANAGER}${id}`, values);   
    if(data) {
      // thông báo ra màn hình
      alear_success("Update!", "updated");
      navigate(`/admin/manager-store/`)
    }
  };
  // api store
  const [Stores, setStores] = useState([]);
  const [Accounts, setAccounts] = useState([]);
  const fetchApi = async () => {
    try {
      const data = await get(`${LIST_STORES}`);  
      const dataAccount = await get(`${GET_ALL_ACCOUNTS}`);  
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

  // lọc account hiện tại 
  const filteredAccounts = Accounts.filter(account => account.accountId !== accountmanager.accountId);
  console.log(filteredAccounts); 


  return (
    <>
      
      <Form
        name="Update-Managers"
        onFinish={(values) => {
          handleSubmit(values);
        }}
        form={form}
      >
        <Form.Item label="Account ID" name="accountId">
          <Input readOnly />
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
                    if(value.trim()===""){
                      return Promise.reject('User Name needs charaters!');
                    }
                    return Promise.resolve();
                },
            },
        ]}        
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="User Name"
          name="userName"         
        >
          <Input readOnly />
        </Form.Item>
      
        
        <Form.Item
          
          label="PassWord"
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
        style={{ display: 'none' }}        
        >
          <Input  hidden/>
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
                        if(filteredAccounts.some((account)=>account.phone === value)){
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
                                              
                          if(filteredAccounts.some((account)=>account.email === value)){
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
          label="Address"
          name="address"
          rules={[
            {
                required: true,
                message: 'Please input your address!',
            },
            {
                validator(_, value) {
                    // Example regex: allows letters, spaces, hyphens, and apostrophes, and must be at least 2 characters long
                    const fullNameRegex = /^[0-9a-zA-Z\s'-]{2,}$/;
                    if (!value) {
                        return Promise.resolve(); // If the field is empty, let the 'required' rule handle it
                    }
                    if (!fullNameRegex.test(value)) {
                        return Promise.reject('address must be at least 2 characters long and can only include letters, spaces, hyphens, and apostrophes.');
                    }
                    if(value.trim()===""){
                      return Promise.reject('User Name needs charaters!');
                    }
                    return Promise.resolve();
                },
            },
        ]}              
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
                          return Promise.reject('Please input your CCCD number!');
                        }                           
                        if (!/^\d{12}$/.test(value)) {
                          return Promise.reject('CCCD number must be 12 digits!');
                        }
                        if (!/^0\d{11}$/.test(value)) {
                          return Promise.reject('CCCD number must begin with 0!');
                        }
                        
                        if(filteredAccounts.some((account)=>account.cccd === value)){
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
                  label="Role"
                  name="roleId"    
                  key="roleId"              
              >
                <Select defaultValue={2} disabled>
                   <Option value={2}>Manager</Option>
                </Select>
              </Form.Item>

              <Form.Item
                    label="Store"
                    name="storeId"
                    key="storeId"
                >               
            <Select defaultValue={accountmanager.storeId}>
             <Option value={accountmanager.storeId}>{accountmanager.storeName}</Option>          
                 {(Stores.filter(store => store.storeId !== accountmanager.storeId)).map(store => (
             <Option key={store.storeId} value={store.storeId}>
                  {store.storeName}
              </Option>
              ))}            
           </Select>
                </Form.Item>       
        <Form.Item name="status" label="Switch" valuePropName="checked">
          <Switch />
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

export default UpdateStoreManager;
