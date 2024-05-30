import { Button, Form, Input, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { get, patch  } from "../../../helpers/API.helper";
import { useParams,Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { alear_success } from "../../../helpers/Alert.helper";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

function UpdateCategory() {
  const [store, setStore] = useState([]);
  const [form] = Form.useForm();

  const { id } = useParams();

  const navigate = useNavigate()
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`http://localhost:5264/api/Category/${id}`);

        console.log(data);
        // const dataAccount = await get(${LIST_ACCOUNT});
        // Dùng phương thức setFieldsValue để khởi tạo giá trị ban đầu cho Form
        form.setFieldsValue({
            categoryId: data.categoryId,
            categoryName: data.categoryName,
            isDelete: data.isDelete,           
          
        });  
        setStore(data);       
      } catch (error) {
        console.log("err in UpdateCategory", error);
        setStore([]);
      }
    };
  
    fetchApi();
  }, [form]);

  const handleSubmit = async (values) => {    
    // sửa lại biến switch cho isDeleted
    values.isDelete = values.isDelete ? 1 : 0;
    console.log(values);
    const data = await patch(`http://localhost:5264/api/Category/update/${id}`, values);   
    if(data) {
      // thông báo ra màn hình
    //   alear_success("Update!", "updated");

    form.resetFields();

      // navigate("/admin/store/")
    }
  };

  return (
    <>
      <h2>Category Detail</h2>

      <Form
        name="create-room"
        onFinish={(values) => {
          handleSubmit(values);
        }}
        form={form}
      >
        <Form.Item label="Category ID" name="categoryId">
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="Category name"
          name="categoryName"
          rules={[
            {
              required: true,
              message: "Please input your name Category!",
            },
          ]}
        >
          <Input />
        </Form.Item>

    
      
        <Form.Item name="isDelete" label="Switch" valuePropName="checked">
          <Switch checkedChildren="inactive" unCheckedChildren="active"/>
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

export default UpdateCategory;