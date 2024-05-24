import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
const UpdateStoreManager = ({ visible, record, onCancel, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      // Gửi request cập nhật dữ liệu
      // await updateDataFunction(values);
      setLoading(false);
      onUpdate(); // Gọi hàm onUpdate để tải lại dữ liệu sau khi cập nhật
      onCancel(); // Đóng modal
    } catch (error) {
      console.error("Error updating data:", error);
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Update Store Manager"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="update"
          type="primary"
          loading={loading}
          onClick={handleUpdate}
        >
          Update
        </Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={record}
        layout="vertical"
        onFinish={handleUpdate}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please enter location" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateStoreManager