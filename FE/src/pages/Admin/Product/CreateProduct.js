import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Switch, Modal, InputNumber, Upload } from "antd";
import React, { useState } from "react";

const { Option } = Select;

function CreateProduct({ isVisible, handleOk, handleCancel }) {
  const [form] = Form.useForm();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizeQuantities, setSizeQuantities] = useState({});
  const [image, setImage] = useState(null);

  const handleSubmit = async (values) => {
    console.log({
      ...values,
      sizes: selectedSizes.map(size => ({
        size,
        quantity: sizeQuantities[size] || 0,
      })),
    });
    // const response = await createProduct({
    //   ...values,
    //   sizes: selectedSizes.map(size => ({
    //     size,
    //     quantity: sizeQuantities[size] || 0,
    //   })),
    // });
    // if (response) {
    //   form.resetFields();
    // }
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
  const handleImageChange = ({ file }) => {
    if (file.status === "done") {
      setImage(file.response.url); // Assuming the server returns the image URL in the response
    }
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
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input description !!!",
            },
          ]}
        >
          <Input.TextArea
            rows={6}
            showCount
            maxLength={100}
            placeholder="Input description"
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please input category!" }]}
        >
          <Select placeholder="Select your category">
            <Option value="Trà sữa">Trà sữa</Option>
            <Option value="Nước uống">Nước uống</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="sizes"
          label="Sizes"
          rules={[{ required: true, message: "Please select at least one size!" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select your sizes"
            onChange={handleSizeChange}
          >
            <Option value="S">S</Option>
            <Option value="M">M</Option>
            <Option value="L">L</Option>
          </Select>
        </Form.Item>

        {selectedSizes.map((size) => (
          <Form.Item
            key={size}
            label={`Quantity for Size ${size}`}
            rules={[{ required: true, message: "Please input quantity!" }]}
          >
            <InputNumber
              min={0}
              placeholder="Input quantity"
              onChange={(value) => handleQuantityChange(size, value)}
            />
          </Form.Item>
        ))}

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
          <Input placeholder="Input price" />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Upload
            name="image"
            listType="picture-card"
            showUploadList={false}
            action="/api/upload" // Replace with your server endpoint
            onChange={handleImageChange}
          >
            {image? (
              <img src={image} alt="product" style={{ width: "100%" }} />
            ) : (
              <UploadOutlined />
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          name="feature"
          label="Feature"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch
            checkedChildren="Feature"
            unCheckedChildren="Not Feature"
            defaultChecked
          />
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateProduct;
