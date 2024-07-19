import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Switch } from "antd";
import { useNavigate } from 'react-router-dom';
import { alear_success } from '../../../helpers/Alert.helper';
import { get, post } from '../../../helpers/API.helper';
import { CREATE_CATEGORY, LOCALHOST_API } from '../../../helpers/APILinks';

function CreateCategory() {
  const [Category, setCategory] = useState([]); // State to store fetched categories
  const [form] = Form.useForm(); // Form instance for managing form state and actions
  const navigate = useNavigate(); // Hook for navigation

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`${LOCALHOST_API}/api/Category`);
        if (data) {
          setCategory(data); // Set categories if data is fetched successfully
        }
      } catch (error) {
        console.log("err in CreateCategory", error);
        setCategory([]); // Set empty array if there's an error
      }
    };

    fetchApi();
  }, []);

  // Handle form submission
  const handleSubmit = async (values) => {
    // Convert isDelete field to appropriate value
    values.isDelete = values.isDelete ? 0 : 1;

    // Remove CategoryId if it exists to let the database handle it
    if (values.CategoryId !== undefined) {
      delete values.CategoryId;
    }

    // Rename storeName to CategoryName
    values.CategoryName = values.storeName;
    delete values.storeName;

    console.log(values);
    const dataUpdate = await post(`CREATE_CATEGORY`, values);

    if (dataUpdate) {
      // Alert success message
      alear_success("Create!", "create");

      // Reset form fields
      form.resetFields();

      // Navigate to store creation page
      navigate(`/admin/store/create`);
    }
  };

  // Validate category name
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
    <>
      <h2>Create Category</h2>

      <Form name="create-category" onFinish={handleSubmit} form={form}>
        <Form.Item
          label="Category name"
          name="storeName"
          rules={[
            {
              required: true,
              validator: validateCategoryName, // Custom validation for category name
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="isDelete"
          label="Switch"
          valuePropName="checked"
          initialValue={true} // Initial value for switch
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
    </>
  );
}

export default CreateCategory;
