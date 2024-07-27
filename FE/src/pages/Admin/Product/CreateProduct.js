import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Switch,
  Modal,
  InputNumber,
  message,
  Upload,
  Button,
  Spin,
} from "antd";
import { get, post } from "../../../helpers/API.helper";
import { CREATE_PRODUCT } from "../../../helpers/APILinks";
import { UploadOutlined } from "@ant-design/icons";
// import './src/assets/css/bootstrap.min.css'
import { Image } from "cloudinary-react";
import axios from "axios";


const { Option } = Select;

function CreateProduct({ isVisible, handleOk, handleCancel, onReload }) {
  const [form] = Form.useForm();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizeQuantities, setSizeQuantities] = useState({});
  const [sizePrices, setSizePrices] = useState({});
  const [stores, setStores] = useState([]);
  const [category, setCategory] = useState([]);
  const [imageFile, setImageFile] = useState(null);
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
        const dataStores = await get("http://localhost:5264/api/stores");
        const dataCategories = await get("http://localhost:5264/api/Category");
        setStores(dataStores);
        setCategory(dataCategories);
      } catch (error) {
        message.error("Error fetching stores or categories");
        console.log("Error in fetchApi", error);
        setStores([]);
        setCategory([]);
      }
    };
    fetchApi();
  }, []);

  const handleSubmit = async (values) => {
    const sizesArray = selectedSizes.map((size) => ({
      sizeId: size,
      quantity: sizeQuantities[size] || 0,
      price: sizePrices[size] || 0,
    }));

    values.sizes = sizesArray;
    values.isDelete = 0;
    values.status = values.status ? 1 : 0;
    const urlImage = await uploadImage();
    values.img = urlImage;

    console.log(values);

    try {
      const response = await post(`${CREATE_PRODUCT}`, values);
      if (response) {
        form.resetFields();
        message.success("Product created successfully!");
        handleOk(); // Call parent component's handleOk to close modal and refresh list
        onReload();
      }
    } catch (error) {
      message.error("Product creation failed!");
      console.error("Failed to create Product. Please try again later", error);
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

  const handleSizeChange = (values) => {
    setSelectedSizes(values);
  };

  const handleQuantityChange = (size, value) => {
    setSizeQuantities({
      ...sizeQuantities,
      [size]: value,
    });
  };

  const handlePriceChange = (size, value) => {
    setSizePrices({
      ...sizePrices,
      [size]: value,
    });
  };

  const handleImageUpload = (info) => {
    setImageFile(info.file.originFileObj); // Store the uploaded file object
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

  return (
    <Modal
      title="Create New Product"
      visible={isVisible}
      onOk={form.submit}
      onCancel={handleCancel}
    >
      <Form name="create-product" onFinish={handleSubmit} form={form}>
        <Form.Item
          label="Product name"
          name="productName"
          rules={[
            {
              required: true,
              message: "Please input product name !!!",
            },
          ]}
        >
          <Input placeholder="Input name" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price!",
            },
          ]}
        >
          <InputNumber
            min={0}
            placeholder="Input price"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please input category!" }]}
        >
          <Select placeholder="Select your category">
            {category.map((category) => (
              <Option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="sizes"
          label="Sizes"
          rules={[
            { required: true, message: "Please select at least one size!" },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select your sizes"
            onChange={handleSizeChange}
          >
            <Option value="1">S</Option>
            <Option value="2">M</Option>
            <Option value="3">L</Option>
          </Select>
        </Form.Item>

        {selectedSizes.map((size) => (
          <div key={size}>
            <Form.Item
              label={`Quantity for Size ${size}`}
              rules={[{ required: true, message: "Please input quantity!" }]}
            >
              <InputNumber
                min={0}
                placeholder="Input quantity"
                onChange={(value) => handleQuantityChange(size, value)}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              label={`Price for Size ${size}`}
              rules={[{ required: true, message: "Please input price!" }]}
            >
              <InputNumber
                min={0}
                placeholder="Input price"
                onChange={(value) => handlePriceChange(size, value)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
        ))}

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
          // url && (
          //   <div className="pb-8 pt-4">
          //     <Image cloudName={cloudinaryConfig.cloudName} publicId={url} />
          //   </div>
          // )
          ""
        )}

        {/* IMAGE */}

        <Form.Item
          label="Store"
          name="storeId"
          key="storeId"
          rules={[{ required: true, message: "Please select a store!" }]}
        >
          <Select placeholder="Select a store">
            {stores.map((store) => (
              <Option key={store.storeId} value={store.storeId}>
                {store.storeName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            defaultChecked
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateProduct;
