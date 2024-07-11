import { Button, Form, Input, Switch, message } from "antd";
import { useEffect, useState } from "react";
import { get, patch } from "../../../helpers/API.helper";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCategory = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await get(`http://localhost:5264/api/Category/${id}`);
        form.setFieldsValue({
          categoryId: data.categoryId,
          categoryName: data.categoryName,
          isDelete: data.isDelete,
        });
      } catch (error) {
        console.error("Error fetching category:", error);
        message.error("Failed to fetch category data.");
      }
    };

    fetchCategory();
  }, [form, id]);

  const handleSubmit = async (values) => {
    try {
      const existingCategories = await get("http://localhost:5264/api/Category");
      const isDuplicate = existingCategories.some(
        (category) => category.categoryName === values.categoryName && category.categoryId !== id
      );

      if (isDuplicate) {
        message.error("Category name already exists. Please enter a different name.");
        return;
      }

      values.isDelete = values.isDelete ? 1 : 0;

      const data = await patch(`http://localhost:5264/api/Category/update/${id}`, values);
      if (data) {
        message.success("Category updated successfully!");
        form.resetFields();
        navigate("/admin/category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      message.error("An error occurred while updating the category.");
    }
  };

  return (
    <>
      <h2>Category Detail</h2>
      <Form
        name="update-category"
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item label="Category ID" name="categoryId">
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label="Category name"
          name="categoryName"
          rules={[
            { required: true, message: "Please input your category name!" }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="isDelete" label="Status" valuePropName="checked">
          <Switch checkedChildren="inactive" unCheckedChildren="active" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateCategory;
