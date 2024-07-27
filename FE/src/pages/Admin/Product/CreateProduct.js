import React, { useEffect, useState } from "react";
import { Form, Input, Select, Switch, Modal, InputNumber, message, Upload, Button, Spin } from "antd";
import { get, post } from "../../../helpers/API.helper";
import { CREATE_PRODUCT, LOCALHOST_API } from "../../../helpers/APILinks";
import { UploadOutlined } from "@ant-design/icons";
import { Image } from "cloudinary-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

function CreateProduct({ isVisible, handleOk, handleCancel, onReload }) {
  const [form] = Form.useForm();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizeQuantities, setSizeQuantities] = useState({});
  const [sizePrices, setSizePrices] = useState({});
  const [stores, setStores] = useState([]);
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);  
  const account = useSelector(state => state.AccountReducer);
  const navigate = useNavigate();
  const cloudinaryConfig = {
    cloudName: 'dbe0xyjvc',
    apiKey: '659239438524682',
    apiSecret: 'WDlT8pl5a7mCYclSszx7fYBuKjA',
    presets: 'r8cndyxy',
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const dataStores = await get(`${LOCALHOST_API}/api/stores`);
        const dataCategories = await get(`${LOCALHOST_API}/api/Category`);
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
    values.storeId=account.storeId;
    console.log(values);
    
    try {
      const response = await post(`${CREATE_PRODUCT}`, values);
      if (response) {
        form.resetFields();
        message.success("Product created successfully!");
        setUrl("")
        setPreview(null);
        setSelectedSizes([]);
        handleOk(); // Call parent component's handleOk to close modal and refresh list
        onReload();
        navigate("/admin/product");
      }
    } catch (error) {
      message.error("Product creation failed!");
      console.error("Failed to create Product. Please try again later", error);
    }
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
                message: 'Please input your full name!',
            },
            {
                validator(_, value) {
                    // Example regex: allows letters, spaces, hyphens, and apostrophes, and must be at least 2 characters long
                    const ProductRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯăắằẵẳặÂấầẩẫậÊếềểễệƠớờởỡợÙúụủưứừễệợỳỵỷỹảẢ\s'-]+$/;
                    if (!value) {
                        return Promise.resolve(); // If the field is empty, let the 'required' rule handle it
                    }
                    if (!ProductRegex.test(value)) {
                        return Promise.reject('Product Name must be at least 2 characters long and can only include letters, spaces, hyphens, and apostrophes.');
                    }
                    if(value.trim()===""){
                      return Promise.reject('Product Name needs charaters!');
                    }
                    return Promise.resolve();
                },
            },
        ]}                
        >
          <Input placeholder="Input name" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            
          ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value) {
                    return Promise.reject('Please input your price!');
                }
                if (!/^\d+(\.\d+)?$/.test(value)) {
                  return Promise.reject('Price must be a valid number!');
              }                 
                return Promise.resolve();
            },
        }),         
          ]}
        >
          <Input
            min={0}
            placeholder="Input price"
            style={{ width: "100%" }}
          />
        </Form.Item>       
        <Form.Item
          name="category"
          label="Category"
          key="category"
          rules={[{ required: true, message: "Please input category!" }]}
        >
          <Select placeholder="Select your category">
            {category.map((category) => (
              <Option className="category" id="category" key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="sizes"
          label="Sizes"
          key="sizes"
          rules={[{ required: true, message: "Please select at least one size!" }]}
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
              style={{ display: 'none' }}
            >
              <InputNumber
                min={0}
                placeholder="Input quantity"
                onChange={(value) => handleQuantityChange(size, 100)}
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
                rules={[
                  {
                    required: true,
                    type:"number",
                    message: 'Please input price!',
                }          
                ]}
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
          ""
        )}

        {/* IMAGE */}

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