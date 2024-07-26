import { Button, Form, Input, Switch, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { get, post } from "../../../helpers/API.helper";
import { CREATE_STORE } from "../../../helpers/APILinks";
import { alear_success } from "../../../helpers/Alert.helper";
import { useNavigate } from "react-router-dom";
import { siderActions } from "../../../actions/Sider.action";


const { Option } = Select;


function CreateStore() {
 const [Accounts, setAccounts] = useState([]);
 const [form] = Form.useForm();
 const navigate = useNavigate();
 const dispatch = useDispatch();


 const handleSubmit = async () => {
   let values = form.getFieldsValue();


   // Trim tất cả các giá trị đầu vào
   for (let key in values) {
     if (typeof values[key] === 'string') {
       values[key] = values[key].trim();
     }
   }


   // sửa lại trường isDelete => từ true => 1 và ngược lại
   values.status = values.status ? 1 : 0;
   values.isDelete = 0;


   console.log(values);
   const dataUpdate = await post(CREATE_STORE, values);


   console.log(dataUpdate);


   if (dataUpdate) {
     // thông báo ra hoàn thành tạo
     alear_success("Create!", "create");


     form.resetFields();


     // thay đổi thanh sider
     dispatch(siderActions({
       selectedKey: ["listStore"],
       openKey: ["Store"]
     }));


     // chuyển hướng đến listore
     navigate(`/admin/store/`);
   }
 };


 return (
   <>
     <Form
       layout="horizontal"
       name="create-room"
       onFinish={handleSubmit}
       form={form}
       labelCol={{ span: 3 }}
       wrapperCol={{ span: 14 }}
     >
       <Form.Item
         label="Store name"
         name="storeName"
         rules={[
           {
             required: true,
             message: "Please input your store name!",
           },
           {
             validator: (_, value) =>
               value && value.trim().length > 0 ? Promise.resolve() : Promise.reject('Store name must be at least 1 character long!')
           }
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
             message: "Please input the store address!",
           },
           {
             validator: (_, value) =>
               value && value.trim().length > 0 ? Promise.resolve() : Promise.reject('Store name must be at least 1 character long!')
           }
         ]}
       >
         <Input />
       </Form.Item>


       <Form.Item
         name="status"
         label="Switch"
         valuePropName="checked"
         initialValue={true}
       >
         <Switch
           checkedChildren="Active"
           unCheckedChildren="Inactive"
           defaultChecked
         />
       </Form.Item>


       <Form.Item>
         <Button
           type="primary"
           htmlType="submit"
           style={{ margin: "10px 0 0 5%" }}
         >
           Submit
         </Button>
       </Form.Item>
     </Form>
   </>
 );
}


export default CreateStore;
