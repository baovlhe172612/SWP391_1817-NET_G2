import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Switch } from "antd";
import { useNavigate } from 'react-router-dom';
import { alear_success } from '../../../helpers/Alert.helper';
import { get, post } from '../../../helpers/API.helper';
import { CREATE_CATEGORY } from '../../../helpers/APILinks';

function CreateCategory() {
  const [Category, setCategory] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get("http://172.20.10.5:5264/api/Category");

        if (data) {
          setCategory(data);
        }
      } catch (error) {
        console.log("err in CreateCategory", error);
        setCategory([]);
      }
    };

    fetchApi();
  }, []);

  const handleSubmit = async (values) => {
    // Convert isDelete field
    values.isDelete = values.isDelete ? 0 : 1;

    // Remove CategoryId if it exists to let the database handle it
    if (values.CategoryId !== undefined) {
      delete values.CategoryId;
    }

    // Rename storeName to CategoryName
    values.CategoryName = values.storeName;
    delete values.storeName;

    console.log(values);
    const dataUpdate = await post(CREATE_CATEGORY, values);

    if (dataUpdate) {
      // Alert success
      alear_success("Create!", "create");

      form.resetFields();

      // Navigate to store creation page
      navigate(`/admin/store/create`);
    }
  };

  return (
    <>
      <h2>Create Category</h2>

      <Form name="create-category" onFinish={handleSubmit} form={form}>
        <Form.Item
          label="Store name"
          name="storeName"
          rules={[
            {
              required: true,
              message: "Please input your name category!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="isDelete"
          label="Switch"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch
            checkedChildren="active"
            unCheckedChildren="InActive"
            defaultChecked
          />
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

export default CreateCategory;
