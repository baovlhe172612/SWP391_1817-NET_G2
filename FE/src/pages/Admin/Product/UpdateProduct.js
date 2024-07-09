import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Switch, message } from "antd";
import { get, put } from "../../../helpers/API.helper";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { alear_success } from "../../../helpers/Alert.helper";
import { GET_PRODUCTSIZES_BY_ID, UPDATE_PRODUCT } from "../../../helpers/APILinks";
import { useFormik } from 'formik';
import * as yup from 'yup';

const { Option } = Select;

function useFetchProductSize(id, setProductSize, form) {
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`${GET_PRODUCTSIZES_BY_ID}${id}`);
        form.setFieldsValue({
          productSizeId: data.productSizeId,
          productId: data.productId,
          sizeId: data.sizeId,
          quantity: data.quantity,
          productName: data.productName,
          sizeName: data.sizeName,
          price: data.price,
          isDelete: data.isDelete === 1, // Switch expects a boolean
          status: data.status,
          dateCreated: data.dateCreated, // Use moment for date handling if needed
        });
        setProductSize(data);
      } catch (error) {
        message.error("Error fetching product data.");
        setProductSize([]);
      }
    };
    fetchApi();
  }, [form, id, setProductSize]);
}

const validationSchema = yup.object({
  productName: yup.string()
    .min(2, 'Product name must be at least 2 characters long and can only include letters, spaces, hyphens, and apostrophes.')
    .required('Please input your Product name!'),
  quantity: yup.number()
    .min(1, 'Quantity must be at least 1')
    .max(100, 'Quantity must be at maximum 100')
    .required('Please input a quantity'),
  price: yup.number()
    .min(1, 'Price must be at least 1')
    .max(100000, 'Price must be at maximum 100000')
    .required('Please input a price'),
  sizeId: yup.string()
    .required('Please select a size'),
});

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

  useFetchProductSize(id, setProductSize, form);

  const formik = useFormik({
    initialValues: {
      productName: '',
      quantity: '',
      price: '',
      sizeId: '',
      isDelete: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.isDelete = values.isDelete ? 1 : 0;
      values.status = 1;
      values.productSizeId = id;
      values.productId = ProductSize.productId;
      values.quantity = form.getFieldValue('quantity');
      const data = await put(`${UPDATE_PRODUCT}/${form.getFieldValue('productName')}`, values);
      if (data) {
        alear_success("Update!", "updated");
        navigate(`/admin/product`);
      }
    },
  });

  return (
    <>
      <Form
        name="Update-Product"
        onFinish={formik.handleSubmit}
        form={form}
        initialValues={formik.initialValues}
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
                const fullNameRegex = /^[\p{L}\s'-]{2,}$/u;
                if (!value) return Promise.resolve();
                if (!fullNameRegex.test(value)) {
                  return Promise.reject('Product name must be at least 2 characters long and can only include letters, spaces, hyphens, and apostrophes.');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input value={formik.values.productName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
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
                const parsedValue = parseInt(value, 10);
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
        >
          <Input value={formik.values.quantity} onChange={formik.handleChange} onBlur={formik.handleBlur} />
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
                const parsedValue = parseInt(value, 10);
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
          <Input value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        </Form.Item>
        <Form.Item
          label="Size"
          name="sizeId"
          rules={[
            {
              required: true,
              message: "Please select a size",
            },
          ]}
        >
          <Select placeholder="Select your size" value={formik.values.sizeId} onChange={value => formik.setFieldValue('sizeId', value)} onBlur={formik.handleBlur}>
            {sizes.map((size) => (
              <Option key={size.sizeId} value={size.sizeId}>
                {size.sizeName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="isDelete" label="Delete" valuePropName="checked">
          <Switch checked={formik.values.isDelete} onChange={value => formik.setFieldValue('isDelete', value)} />
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
