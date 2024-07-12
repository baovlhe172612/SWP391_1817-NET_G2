import React, { useEffect, useState, useCallback } from "react";
import { Form, Input, Select, Switch, Modal, InputNumber, message, Upload, Button } from "antd";
import { get, post } from "../../../helpers/API.helper";
import { CREATE_PRODUCT } from "../../../helpers/APILinks";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

function CreateProduct({ isVisible, handleOk, handleCancel, onReload }) {
  const [form] = Form.useForm();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizeQuantities, setSizeQuantities] = useState({});
  const [sizePrices, setSizePrices] = useState({});
  const [stores, setStores] = useState([]);
  const [category, setCategory] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const [dataStores, dataCategories] = await Promise.all([
          get("http://localhost:5264/api/stores"),
          get("http://localhost:5264/api/Category"),
        ]);
        setStores(dataStores);
        setCategory(dataCategories);
      } catch (error) {
        message.error("Error fetching stores or categories");
        console.error("Error in fetchApi", error);
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

    const payload = {
      ...values,
      sizes: sizesArray,
      isDelete: 0,
      status: values.status ? 1 : 0,
      img: imageFile,
    };

    try {
      const response = await post(CREATE_PRODUCT, payload);
      if (response) {
        form.resetFields();
        message.success("Product created successfully!");
        handleOk();
        onReload();
      }
    } catch (error) {
      message.error("Product creation failed!");
      console.error("Failed to create Product. Please try again later", error);
    }
  };

  const handleSizeChange = useCallback((values) => setSelectedSizes(values), []);
  const handleQuantityChange = useCallback((size, value) => setSizeQuantities((prev) => ({ ...prev, [size]: value })), []);
  const handlePriceChange = useCallback((size, value) => setSizePrices((prev) => ({ ...prev, [size]: value })), []);
  const handleImageUpload = useCallback((info) => setImageFile(info.file.originFileObj), []);

  const SizeInput = ({ size }) => (
    <div key={size}>
      <Form.Item label={`Quantity for Size ${size}`} rules={[{ required: true, message: "Please input quantity!" }]}>
        <InputNumber min={0} placeholder="Input quantity" onChange={(value) => handleQuantityChange(size, value)} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label={`Price for Size ${size}`} rules={[{ required: true, message: "Please input price!" }]}>
        <InputNumber min={0} placeholder="Input price" onChange={(value) => handlePriceChange(size, value)} style={{ width: "100%" }} />
      </Form.Item>
    </div>
  );

  return (
    <Modal title="Create New Product" visible={isVisible} onOk={form.submit} onCancel={handleCancel}>
      <Form name="create-product" onFinish={handleSubmit} form={form}>
        <Form.Item label="Product name" name="productName" rules={[{ required: true, message: "Please input product name !!!" }]}>
          <Input placeholder="Input name" />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input price!" }]}>
          <InputNumber min={0} placeholder="Input price" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true, message: "Please input category!" }]}>
          <Select placeholder="Select your category">
            {category.map(({ categoryId, categoryName }) => (
              <Option key={categoryId} value={categoryId}>
                {categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="sizes" label="Sizes" rules={[{ required: true, message: "Please select at least one size!" }]}>
          <Select mode="multiple" placeholder="Select your sizes" onChange={handleSizeChange}>
            <Option value="1">S</Option>
            <Option value="2">M</Option>
            <Option value="3">L</Option>
          </Select>
        </Form.Item>
        {selectedSizes.map((size) => <SizeInput key={size} size={size} />)}
        <Form.Item label="Image" name="img" rules={[{ required: true, message: "Please upload an image!" }]}>
          <Upload beforeUpload={() => false} onChange={handleImageUpload} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Store" name="storeId" key="storeId" rules={[{ required: true, message: "Please select a store!" }]}>
          <Select placeholder="Select a store">
            {stores.map(({ storeId, storeName }) => (
              <Option key={storeId} value={storeId}>
                {storeName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status" valuePropName="checked" initialValue={true}>
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateProduct;
