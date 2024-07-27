import { Button, Form, Input, Select, Spin, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { get, post } from "../../../helpers/API.helper";
import { CREATE_BLOG, LOCALHOST_API } from "../../../helpers/APILinks";
import { alear_success } from "../../../helpers/Alert.helper";
import { useNavigate } from "react-router-dom";
import { Option } from "antd/es/mentions";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

function CreateBlog() {
  const [blog, setBlog] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const account = useSelector((state) => state.AccountReducer);
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);  

  const cloudinaryConfig = {
    cloudName: 'dbe0xyjvc',
    apiKey: '659239438524682',
    apiSecret: 'WDlT8pl5a7mCYclSszx7fYBuKjA',
    presets: 'r8cndyxy',
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const blogData = await post(`${LOCALHOST_API}/api/Post/add_new`);

        const dataCategories = await get(`${LOCALHOST_API}/api/Category`);
        setCategory(dataCategories);
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

    const urlImage = await uploadImage();
    values.img = urlImage;

    console.log(values);
    const dataUpdate = await post(CREATE_BLOG, values);

    if (dataUpdate) {
      alear_success("Create!", "create");
      form.resetFields();
      setPreview(null)
      navigate(`/admin/blogs/create`);
    }
  };

  const handleImageChange = ({ file }) => {
    console.log(file)
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const uploadImage = async () => {
    let imageUrl = "";
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", cloudinaryConfig.presets);
    data.append("cloud_name", cloudinaryConfig.cloudName);
    data.append("folder", "Cloudinary-React");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        data
      );
      console.log(response)
      setUrl(response.data.public_id);
      imageUrl = response.data.url;
      message.success("Image uploaded successfully!");
      setLoading(false);
    } catch (error) {
      message.error("Failed to upload image.");
      setLoading(false);
    }

    return imageUrl;
  };

  const whitespacePattern = /^(?!\s*$).+/;

  return (
    <>
     

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

        {/* IMAGE */}
        <Form.Item label="Upload a file">
          <Upload
            beforeUpload={(file) => {
              handleImageChange({ file });
              return false; // Prevent automatic upload
            }}
            showUploadList={false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
          {preview && <img src={preview} alt="preview" className="w-full" />}
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Spin />
            <span>Processing...</span>
          </div>
        ) : (
          ""
        )}

        {/* IMAGE */}

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
          <Input value={account.fullName} readOnly/>
        </Form.Item>

        <Form.Item
          label="Tags"
          name="tags"
          rules={[{ required: true, message: "Please input tag with tag !" }]}
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
