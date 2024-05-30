import { Button, Form, Input, Select, Switch, message } from "antd";
import { useEffect, useState } from "react";
import { get, patch, put  } from "../../../helpers/API.helper";
import { useParams,Link } from "react-router-dom";
import Swal from "sweetalert2";
import { alear_success } from "../../../helpers/Alert.helper";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

function UpdateStoreManager() {
  const [accountmanager, setAccountmanager] = useState([]);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`http://localhost:5264/api/Account/${id}`);
        // const dataAccount = await get(`${LIST_ACCOUNT}`);
        // Dùng phương thức setFieldsValue để khởi tạo giá trị ban đầu cho Form
        form.setFieldsValue({
            accountId: data.accountId,
            fullName: data.fullName,
            userName: data.userName,
            passWord: data.passWord,           
            status: data.status === 1,
            email: data.email, 
            isDelete: data.isDelete ,
            storeId: data.storeId,                     
            phone: data.phone,
            location: data.location,      
            roleId: data.roleId,
        });  
        setAccountmanager(data);       
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
    const data = await put(`http://localhost:5264/api/Account/${id}`, values);   
    if(data) {
      // thông báo ra màn hình
      alear_success("Update!", "updated");
      navigate(`/admin/manager-store/`)
    }
  };
  // api store
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
      <h2>Edit Accoungt Manager</h2>
      <Form
        name="create-room"
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
              message: "Please input your name manager!",
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
         
        >
          <Input readOnly />
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
        ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please input the address store!",
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
             <Select.Option value={accountmanager.storeId}>{accountmanager.storeName}</Select.Option>
                 {(Stores.filter(store => store.storeId !== accountmanager.storeId)).map(store => (
             <Select.Option key={store.storeId} value={store.storeId}>
                  {store.storeName}
              </Select.Option>
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
