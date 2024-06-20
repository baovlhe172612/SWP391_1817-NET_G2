import { Button, DatePicker, Form, Input, Select, Switch, message } from "antd";
import { useEffect, useState } from "react";
import { get, put } from "../../../helpers/API.helper";
import { useParams, useNavigate } from "react-router-dom";
import { alear_success } from "../../../helpers/Alert.helper";
import { GET_PRODUCTSIZES_BY_ID, UPDATE_PRODUCT } from "../../../helpers/APILinks";

const { Option } = Select;

function UpdateProduct() {
  const [ProductSize, setProductSize] = useState([]);
  const [form] = Form.useForm();
  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`${GET_PRODUCTSIZES_BY_ID}${id}`);
        form.setFieldsValue({
          productSizeId: data.productSizeId,
          productId: data.productId,
          sizeId: data.sizeId,
          quantity: data.quantity,
          price: data.price,
          isDelete: data.isDelete === 1, // Switch expects a boolean
          status: data.status,
          dateCreated: (data.dateCreated), // Use moment for date handling
        });
        setProductSize(data);
      } catch (error) {
        console.log("err in UpdateProduct", error);
        setProductSize([]);
      }
    };
    fetchApi();
  }, [form, id]);

  const handleSubmit = async (values) => {
    values.isDelete = values.isDelete ? 1 : 0;
    values.status = 1;
    values.productSizeId=id;
    values.productId=ProductSize.productId;
    values.quanity = form.getFieldValue('quantity');
    console.log(values);
    const data = await put(`${UPDATE_PRODUCT}`, values);
    if (data) {
      alear_success("Update!", "updated");
      navigate(`/admin/product`);
    }
  };

  const [Stores, setStores] = useState([]);
  const fetchApi = async () => {
    try {
      const data = await get("http://localhost:5264/api/stores");
      setStores(data);
    } catch (error) {
      message.error("Error fetching accounts");
      console.log("Error in ListStoreManager", error);
      setStores([]);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <Form
        name="Update-Product"
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          label="quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please input a quantity",
            },
          ]}
        >
          <Input />
        </Form.Item>      
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input the price",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Size"
          name="sizeId"
          key="sizeId"
        >
          <Select placeholder="Select your size">
            <Option value="1">S</Option>
            <Option value="2">M</Option>
            <Option value="3">L</Option>
          </Select>
        </Form.Item>
        <Form.Item name="isDelete" label="Switch" valuePropName="checked">
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
