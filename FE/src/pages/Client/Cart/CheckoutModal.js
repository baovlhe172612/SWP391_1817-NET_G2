import React from 'react';
import { Modal, Form, Table, Button, Select, Input } from 'antd';

const { Option } = Select;

function CheckoutModal({ isVisible, handleOk, handleCancel, cartDataModal }) {
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Product Info',
      key: 'productName',
      dataIndex: 'productName',
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

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      handleOk(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Hóa đơn thanh toán"
      visible={isVisible}
      onOk={onOk} // Chỉ cần gọi hàm onOk
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onOk}>
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={{ paymentMethod: '1' }} // Set default value for paymentMethod
      >
        <Table
          dataSource={cartDataModal}
          columns={columns}
          pagination={false}
          rowKey="productSizeID"
        />
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Form.Item name="paymentMethod" label="Payment Method" style={{ marginBottom: 0 }}>
              <Select style={{ width: 150 }}>
                <Option value="1">Direct Payment</Option>
                <Option value="2">QR Code</Option>
              </Select>
            </Form.Item>
          </div>
          <div style={{  marginLeft: '10px' }}>
            <Form.Item name="notes" label="Notes" style={{ marginBottom: 0 }}>
              <Input placeholder="Enter notes here" />
            </Form.Item>
          </div>
          
        </div>

        <div>
            <strong>Total: {totalAmount.toLocaleString('vi-VN')} đ</strong>
          </div>
      </Form>
    </Modal>
  );
}

export default CheckoutModal;
