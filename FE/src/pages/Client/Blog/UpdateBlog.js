import { Button, Form, Input, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { get, patch } from "../../../helpers/API.helper";
import { useParams, Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { alear_success } from "../../../helpers/Alert.helper";
import { useNavigate } from "react-router-dom";
import { UPDATE_BLOG } from "../../../helpers/APILinks";
import { useSelector } from "react-redux";
const { Option } = Select;

function UpdateBlog() {
  const [blog, setBlog] = useState([]);
  const [form] = Form.useForm();

  const { id } = useParams();
  const account = useSelector((state) => state.AccountReducer);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`http://localhost:5264/api/Post/${id}`);

        console.log(data);
        // const dataAccount = await get(${LIST_ACCOUNT});
        // Dùng phương thức setFieldsValue để khởi tạo giá trị ban đầu cho Form
        form.setFieldsValue({
          postId: data.postId,
          title: data.title,
          Contents: data.contents,
          Img: data.img,
          IsPublished: data.isPublished,
          Status: data.status,
          Author: data.author,
          Tags: data.tags,
          CreatedDate: data.createdDate,
          ModifiDate: data.modifiDate,
        });
        setBlog(data);
      } catch (error) {
        console.log("err in UpdateBlog", error);
        setBlog([]);
      }
    };

    fetchApi();
  }, [form]);

  const handleSubmit = async (values) => {
    values.modifiDate = new Date().toISOString();

    console.log(values);
    const data = await patch(
      `${UPDATE_BLOG}/${id}`,
      values
    );
    if (data) {
      
      form.resetFields();


    }
  };

  return (
    <>
      <h2>Blog Detail</h2>

      <Form
        name="create-blog"
        onFinish={handleSubmit}
        form={form}
        initialValues={{ account }}
      >
        {" "}
        {/* Thiết lập giá trị mặc định cho author */}
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "You forgot input title !!!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Content"
          name="contents"
          rules={[
            {
              required: true,
              message: "The content is necessary !",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Image"
          name="img"
          rules={[
            {
              required: true,
              message: "Paste the link's image !",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
          initialValue={account.fullName} 
          rules={[
            {
              required: true,
              message: "Please input your name !",
            },
          ]}
        >
          <Input value={account.fullName} />
        </Form.Item>
        <Form.Item
          label="Tags"
          name="tags"
          rules={[
            {
              required: true,
              message: "Please input tags !",
            },
          ]}
        >
          <Input />
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

export default UpdateBlog;
