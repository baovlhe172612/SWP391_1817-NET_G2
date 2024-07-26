import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Switch, message } from "antd";
import { get, put } from "../../../helpers/API.helper";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { alear_success } from "../../../helpers/Alert.helper";
import { GET_PRODUCTSIZES_BY_ID, UPDATE_PRODUCT } from "../../../helpers/APILinks";
const { Option } = Select;

function UpdateProduct() {
  const [ProductSize, setProductSize] = useState([]);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const record = location.state;
  const sizes = [
    { sizeId: 1, sizeName: "X" },
    { sizeId: 2, sizeName: "M" },
    { sizeId: 3, sizeName: "L" },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`${GET_PRODUCTSIZES_BY_ID}${id}`);
        form.setFieldsValue({
          productSizeId: data.productSizeId,
          productId: data.productId,
          sizeId: data.sizeId,
          quantity: data.quantity,
          productName: record.productName,
          sizeName: record.sizeName,
          price: data.price,
          isDelete: data.isDelete === 1, // Switch expects a boolean
          status: data.status,
          dateCreated: data.dateCreated, // Use moment for date handling if needed
        });
        setProductSize(data);
      } catch (error) {
        console.log("err in UpdateProduct", error);
        setProductSize([]);
      }
    };
    fetchApi();
  }, [form, id, record]);

  const handleSubmit = async (values) => {
    values.isDelete = values.isDelete ? 1 : 0;
    values.status = 1;
    values.productSizeId = id;
    values.productId = ProductSize.productId;
    values.quanity = 100
    console.log(values);
    const data = await put(`${UPDATE_PRODUCT}/${form.getFieldValue('productName')}`, values);
    if (data) {
      alear_success("Update!", "updated");
      navigate(`/admin/product`);
    }
  };

  return (
    <>
      <Form
        name="Update-Product"
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          label="Product Name"
          name="productName"
          rules={[
            {
                required: true,
                message: 'Please input your Product name!',
            },
            {
                validator(_, value) {
                    // Example regex: allows letters, spaces, hyphens, and apostrophes, and must be at least 2 characters long
                    const fullNameRegex = /^[\p{L}\s'-]{2,}$/u;

                    if (!value) {
                        return Promise.resolve(); // If the field is empty, let the 'required' rule handle it
                    }
                    if (!fullNameRegex.test(value)) {
                        return Promise.reject('Product name must be at least 2 characters long and can only include letters, spaces, hyphens, and apostrophes.');
                    }
                    return Promise.resolve();
                },
            },
        ]}          
        >
          <Input />
        </Form.Item>
        <Form.Item
  label="Quantity"
  name="quantity"
  rules={[
    {
      required: true,
      message: "Please input a quantity",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        const parsedValue = parseInt(value, 10); // Chuyển đổi giá trị nhập vào thành số nguyên
        if (isNaN(parsedValue)) {
          return Promise.reject("Please input a valid number");
        }
        if (parsedValue < 1 || parsedValue > 100) {
          return Promise.reject("Quantity must be at least 1 and maximum 100");
        }
        return Promise.resolve();
      },
    }),
  ]}
  style={{display:'None'}}
>
  <Input />
</Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input a price",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const parsedValue = parseInt(value, 10); // Chuyển đổi giá trị nhập vào thành số nguyên
                if (isNaN(parsedValue)) {
                  return Promise.reject("Please input a valid number");
                }
                if (parsedValue < 1 || parsedValue > 100000) {
                  return Promise.reject("Quantity must be at least 1 and maximum 100000");
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Size" name="sizeId" key="sizeId"
          rules={[
            {
              required: true,
              message: "Please select a size",
            },
          ]}
        >
          <Select placeholder="Select your size">
            {sizes.map((size) => (
              <Option key={size.sizeId} value={size.sizeId}>
                {size.sizeName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="isDelete" label="Delete" valuePropName="checked">
          <Switch />
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

export default UpdateProduct; 
