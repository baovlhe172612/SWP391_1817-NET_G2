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
        const data = await get(`${LOCALHOST_API}/api/Category`);

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

  const validateCategoryName = (rule, value) => {
    if (!value) {
      return Promise.reject("Please input your name category!");
    }
    if (/^[\s\d~`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value.charAt(0))) {
      return Promise.reject("Category name should not start with a space, number, or special character.");
    }
    if (/\s{2,}/.test(value)) {
      return Promise.reject("Category name should not contain multiple spaces.");
    }
    if (/[0-9~`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
      return Promise.reject("Category name should not contain special characters or numbers.");
    }
    return Promise.resolve();
  };

  return (
    <Form name="create-category" onFinish={handleSubmit} form={form}>
      <Form.Item
        label="Category name"
        name="storeName"
        rules={[
          {
            required: true,
            validator: validateCategoryName,
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
  );
}

export default CreateCategory;
