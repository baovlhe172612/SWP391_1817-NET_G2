import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { get, post } from "../../../helpers/API.helper";
import { CREATE_STORE, STORES_DTOS } from "../../../helpers/APILinks";
import { alear_success } from "../../../helpers/Alert.helper";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function CreateBlog() {
  const [Blog, setBlog] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get("http://localhost:5264/api/Post");

        if (data) {
          setAccounts(data);
        }
      } catch (error) {
        console.log("err in Create  Blog", error);
        setBlog([]);
      }
    };

    fetchApi();
  }, []);

  const handleSubmit = async (values) => {
    // console.log(values);
    // sửa lại trường cho accountId sang INT
    values.postID = parseInt(values.postID);

    // sửa lại trường isDelete => từ true => 1 và ngược lại
    values.isDelete = values.isDelete ? 0 : 1;

    console.log(values);
    const dataUpdate = await post(CREATE_STORE, values);

    if (dataUpdate) {
      // thông báo ra hoàn thành tạo
      alear_success("Create!", "create");

      form.resetFields();

      // chuyển hướng đến listore
      // navigate(`/admin/store/`)
      navigate(`/admin/store/create`)
    }
  };

  return (
    <>
      <h2>Create Store</h2>

      <Form name="create-room" onFinish={handleSubmit} form={form}>
        <Form.Item
          label="Strore name"
          name="storeName"
          rules={[
            {
              required: true,
              message: "Please input your name store!",
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
          name="isDelete"
          label="Switch"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch
            checkedChildren="active"
            unCheckedChildren="InActive"
            defaultChecked
          />
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

export default CreateBlog;
