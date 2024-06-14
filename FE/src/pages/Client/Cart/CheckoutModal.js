import React from 'react';
import { Modal, Form, Table, Button } from 'antd';

function CheckoutModal({ isVisible, handleOk, handleCancel, cartDataModal }) {
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Product Info',
      key: 'prouctName',
      dataIndex: 'prouctName',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text.toLocaleString('vi-VN')} đ`,
    },
  ];

  const totalAmount = cartDataModal.reduce((acc, item) => acc + item.price, 0);

  return (
    <Modal
      title="Hóa đơn thanh toán"
      visible={isVisible}
      onOk={form.submit && handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form}>
        <Table
          dataSource={cartDataModal}
          columns={columns}
          pagination={false}
          rowKey="productSizeID"
        />
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <strong>Total: {totalAmount.toLocaleString('vi-VN')} đ</strong>
        </div>
      </Form>
    </Modal>
  );
}

export default CheckoutModal;
