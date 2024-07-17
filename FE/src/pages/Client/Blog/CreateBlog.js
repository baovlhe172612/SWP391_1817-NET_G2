import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { get, post } from "../../../helpers/API.helper";
import { CREATE_BLOG, LOCALHOST_API } from "../../../helpers/APILinks";
import { alear_success } from "../../../helpers/Alert.helper";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [blog, setBlog] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const account = useSelector((state) => state.AccountReducer);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const blogData = await post(`${LOCALHOST_API}/api/Post/add_new`);
        if (blogData) {
          setBlog(blogData);
        }
      } catch (error) {
        console.log("err in Create Blog", error);
        setBlog([]);
      }
    };

    fetchApi();
  }, []);

  const handleSubmit = async (values) => {

    values.isPublished = 0;

    values.status = 1;

    values.createdDate = new Date().toISOString();

    values.modifiDate = new Date().toISOString();

    values.storeId = account.storeId;

    console.log(values);
    const dataUpdate = await post(CREATE_BLOG, values);

    if (dataUpdate) {
      alear_success("Create!", "create");

      form.resetFields();

      navigate(`/admin/blogs/create`);
    }
  };

  const whitespacePattern = /^(?!\s*$).+/;

  return (
    <>
      <h2>New Blog</h2>

      <Form
        name="create-blog"
        onFinish={handleSubmit}
        form={form}
        initialValues={{ account }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "You forgot to input the title!",
            },
            {
              pattern: whitespacePattern,
              message: "Title cannot be just whitespace!",
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
              message: "The content is necessary!",
            },
            {
              pattern: whitespacePattern,
              message: "Content cannot be just whitespace!",
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
              message: "Paste the link's image!",
            },
            {
              pattern: whitespacePattern,
              message: "Image URL cannot be just whitespace!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
          initialValue={account.fullName} // Giá trị mặc định từ account.fullName
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
            {
              pattern: whitespacePattern,
              message: "Author name cannot be just whitespace!",
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
              message: "Please input tags!",
            },
            {
              pattern: whitespacePattern,
              message: "Tags cannot be just whitespace!",
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

export default CreateBlog;
