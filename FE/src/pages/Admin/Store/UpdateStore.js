import { Button, Form, Input, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { get, patch } from "../../../helpers/API.helper";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { alear_success } from "../../../helpers/Alert.helper";
import { useNavigate } from "react-router-dom";
import { LOCALHOST_API } from "../../../helpers/APILinks";
const { Option } = Select;


function UpdateStore() {
 const [store, setStore] = useState([]);
 const [form] = Form.useForm();
 const { id } = useParams();
 const navigate = useNavigate();
 useEffect(() => {
   const fetchApi = async () => {
     try {
       const data = await get(`${LOCALHOST_API}/api/stores/${id}`);
       // const dataAccount = await get(`${LIST_ACCOUNT}`);
       // Dùng phương thức setFieldsValue để khởi tạo giá trị ban đầu cho Form
       form.setFieldsValue({
         storeId: data.storeId,
         storeName: data.storeName,
         location: data.location,
         isDelete: data.isDelete === 1,
         status: data.status
       });
       setStore(data);
     } catch (error) {
       console.log("err in UpdateStore", error);
       setStore([]);
     }
   };


   fetchApi();
 }, [form]);


 const handleSubmit = async (values) => {
   // sửa lại biến switch cho isDeleted
   values.isDelete = 0
   values.status = values.status ? 1 : 0;
   console.log(values);
   const data = await patch(`${LOCALHOST_API}/api/stores/Update/${id}`, values);  


   if (data) {
     // thông báo ra màn hình
     alear_success("Update!", "updated");


     navigate(`/admin/store/`);
   }
 };


 return (
   <>
     <Form
       layout="horizontal"
       name="create-room"
       onFinish={(values) => {
         handleSubmit(values);
       }}
       form={form}
       labelCol={{ span: 3 }}
       wrapperCol={{ span: 14 }}
     >
       <Form.Item label="Strore ID" name="storeId">
         <Input readOnly />
       </Form.Item>


       <Form.Item
         label="Strore name"
         name="storeName"
         rules={[
           {
             required: true,
             message: "Please input your name store!",
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
             message: "Please input the address store!",
           },
           {
             validator: (_, value) =>
               value && value.trim().length > 0 ? Promise.resolve() : Promise.reject('Store name must be at least 1 character long!')
           }
         ]}
       >
         <Input />
       </Form.Item>


       <Form.Item name="status" label="Switch" valuePropName="checked">
         <Switch checkedChildren="active" unCheckedChildren="inactive" />
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


export default UpdateStore;
