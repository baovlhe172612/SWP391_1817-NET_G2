import { Button, Form, Input, Select, Switch, message } from "antd";
import { useEffect, useState } from "react";
import { get, patch } from "../../../helpers/API.helper";
import { useParams, Link, json } from "react-router-dom";
// import Swal from "sweetalert2";
// import { alear_success } from "../../../helpers/Alert.helper";
import { useNavigate } from "react-router-dom";
import { BLOG_DETAIL, UPDATE_BLOG } from "../../../helpers/APILinks";
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
        const data = await get(`${BLOG_DETAIL}/${id}`);

        console.log(data);
        // const dataAccount = await get(${LIST_ACCOUNT});
        // Dùng phương thức setFieldsValue để khởi tạo giá trị ban đầu cho Form
        form.setFieldsValue({
          postId: data.postId,
          title: data.title,
          contents: data.contents,
          img: data.img,
          isPublished: data.isPublished,
          status: data.status,
          author: account.fullName,
          tags: data.tags,
          createdDate: data.createdDate,
          modifiDate: new Date().toISOString(),
          storeId: data.storeId,
        });
        setBlog(data);

        console.log(blog);

      } catch (error) {
        console.log("err in UpdateBlog", error);
        setBlog([]);
      }
    };

    fetchApi();
  }, [form]);

  const handleSubmit = async (values) => {
    try {
      console.log("day la blog: "+blog);

      console.log("day la value: "+values);
      const data = await patch(`http://localhost:5264/api/Post/update_post/${id}`, { ...blog, ...values });


      if (data) {
        message.success("Blog updated successfully!");

        form.resetFields();
        navigate("/admin/blogs");
      }
    } catch (error) {
      console.log("Error in handleSubmit", error);
      message.error("An error occurred while updating the blog.");
    }
  };

  return (
    <>
      <h2>Update Blog</h2>

      <Form
        name="update-blog"
        onFinish={(values) => {
          handleSubmit(values);
        }}
        form={form}
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
