import { Button, Form, Input, Switch, message } from "antd";
import { useEffect, useState } from "react";
import { get, patch } from "../../../helpers/API.helper";
import { useParams, useNavigate } from "react-router-dom";
import { LOCALHOST_API } from "../../../helpers/APILinks";

const UpdateCategory = () => {
  // Khởi tạo form và lấy id từ URL params
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  // useEffect để fetch dữ liệu category từ API khi component được render
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // Gọi API để lấy thông tin category theo id
        const data = await get(`${LOCALHOST_API}/api/Category/${id}`);
        // Thiết lập giá trị cho các trường của form với dữ liệu nhận được
        form.setFieldsValue({
          categoryId: data.categoryId,
          categoryName: data.categoryName,
          isDelete: data.isDelete,
        });
      } catch (error) {
        console.error("Error fetching category:", error);
        // Hiển thị thông báo lỗi nếu có lỗi xảy ra khi lấy dữ liệu
        message.error("Failed to fetch category data.");
      }
    };

    fetchCategory();
  }, [form, id]);

  // Hàm xử lý khi người dùng gửi form
  const handleSubmit = async (values) => {
    try {
      // Gọi API để lấy danh sách các category hiện có
      const existingCategories = await get("http://localhost:5264/api/Category");
      // Kiểm tra xem có category nào khác có cùng tên nhưng không phải category hiện tại
      const isDuplicate = existingCategories.some(
        (category) => category.categoryName === values.categoryName && category.categoryId !== id
      );

      if (isDuplicate) {
        // Hiển thị thông báo lỗi nếu tên category đã tồn tại
        message.error("Category name already exists. Please enter a different name.");
        return;
      }

      // Chuyển đổi giá trị của isDelete thành 1 hoặc 0 để phù hợp với định dạng dữ liệu API
      values.isDelete = values.isDelete ? 1 : 0;

      // Gọi API để cập nhật thông tin category
      const data = await patch(`${LOCALHOST_API}/api/Category/update/${id}`, values);
      if (data) {
        // Hiển thị thông báo thành công và chuyển hướng đến trang danh sách category
        message.success("Category updated successfully!");
        form.resetFields();
        navigate("/admin/category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      // Hiển thị thông báo lỗi nếu có lỗi xảy ra khi cập nhật category
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
        {/* Trường để hiển thị ID của category, chỉ đọc */}
        <Form.Item label="Category ID" name="categoryId">
          <Input readOnly />
        </Form.Item>

        {/* Trường nhập tên category với quy tắc kiểm tra yêu cầu */}
        <Form.Item
          label="Category name"
          name="categoryName"
          rules={[
            { required: true, message: "Please input your category name!" }
          ]}
        >
          <Input />
        </Form.Item>

        {/* Trường chuyển đổi trạng thái của category với Switch */}
        <Form.Item name="isDelete" label="Status" valuePropName="checked">
          <Switch checkedChildren="inactive" unCheckedChildren="active" />
        </Form.Item>

        {/* Nút để gửi form */}
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
