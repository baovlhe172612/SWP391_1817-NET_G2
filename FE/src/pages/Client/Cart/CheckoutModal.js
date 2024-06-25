import React, { useState } from 'react';
import { Modal, Form, Table, Button, Select, Input } from 'antd';
import QRCode from 'qrcode.react';

const { Option } = Select;

function CheckoutModal({ isVisible, handleOk, handleCancel, cartDataModal }) {
  const [form] = Form.useForm();
  const [qrVisible, setQrVisible] = useState(false);
  const [billVisible, setBillVisible] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState('');

  // Columns for the main table in the checkout modal
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
      render: (text) => `${text.toLocaleString('vi-VN')}đ` ,
    },
  ];

  // Total amount calculation for display in the main modal
  console.log("cartDataModal", cartDataModal);
  const totalAmount = cartDataModal.reduce((acc, item) => acc + item.price, 0);

  console.log("Total Amount Calculation:", totalAmount);

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      const paymentMethod = values.paymentMethod;

      if (paymentMethod === '1') {
        // Show the detailed bill
        setBillVisible(true);
      } else if (paymentMethod === '2') {
        // Generate and display QR code for QR payment
        setQrCodeValue(`Payment of ${totalAmount.toLocaleString('vi-VN')}đ`);
        setQrVisible(true);
      }

      handleOk(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <>
      <Modal
        title="Hóa đơn thanh toán"
        visible={isVisible}
        onOk={onOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={onOk}>
            Submit
          </Button>,
        ]}
        style={{ top: 20}} // Adjust top position and maxHeight
      >
        <div style={{ maxHeight: '57vh', overflowY: 'auto' }}>
          <Form
            form={form}
            initialValues={{ paymentMethod: '1' }}
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
              <div style={{ marginLeft: '100px' }}>
                <Form.Item name="notes" label="Notes" style={{ marginBottom: 0 }}>
                  <Input placeholder="Enter notes here" />
                </Form.Item>
              </div>
            </div>

            <div>
              <strong>Total: {totalAmount.toLocaleString('vi-VN')} đ</strong>
            </div>
          </Form>
        </div>

      </Modal>

      {/* Modal to display QR code with product details */}
    
      <Modal
        title="QR Code Payment"
        visible={qrVisible}
        style={{ top: 20}} // Adjust top position and maxHeight
        footer={[
          <Button key="close" onClick={() => setQrVisible(false)}>
            Close
          </Button>,
        ]}
        onCancel={() => setQrVisible(false)}
      
      >
         <div style={{ maxHeight: '55vh', overflowY: 'auto' }}>
      
          <div style={{ marginBottom: '20px',textAlign:'center' }}>
            <QRCode value={qrCodeValue} size={256} />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <Table
              dataSource={cartDataModal}
              columns={[
                {
                  title: 'Product',
                  dataIndex: 'productName',
                  key: 'productName',
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
                  render: (price) => `${price.toLocaleString('vi-VN')} đ`,
                },
                {
                  title: 'Total',
                  key: 'total',
                  render: (text, record) => `${(record.price * record.quantity).toLocaleString('vi-VN')} đ`,
                },
              ]}
              pagination={false}
              rowKey="productSizeID"
              summary={() => (
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={3}><strong>Total Amount:</strong></Table.Summary.Cell>
                  <Table.Summary.Cell><strong>{totalAmount.toLocaleString('vi-VN')} đ</strong></Table.Summary.Cell>
                </Table.Summary.Row>
              )}
            />
          </div>
        </div>
      </Modal>


      {/* Modal to display detailed bill */}
      <Modal
        title="Payment Bill"
        style={{ textAlign: 'center', top: 20, maxHeight: '60vh' }}

        visible={billVisible}
        footer={[
          <Button key="close" onClick={() => setBillVisible(false)}>
            Close
          </Button>,
        ]}

        onCancel={() => setBillVisible(false)}

      >

        <div style={{ maxHeight: '55vh', overflowY: 'auto' }}>
          <h3 style={{ textAlign: 'center' }}>Bill Details</h3>
          <Table
            dataSource={cartDataModal}
            columns={[
              {
                title: 'Product',
                dataIndex: 'productName',
                key: 'productName',
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
                render: (price) => `${price.toLocaleString('vi-VN')} đ`,
              },
              {
                title: 'Total',
                key: 'total',
                render: (text, record) => `${(record.price * record.quantity).toLocaleString('vi-VN')} đ`,
              },
            ]}
            pagination={false}
            rowKey="productSizeID"
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={3}><strong>Total Amount:</strong></Table.Summary.Cell>
                <Table.Summary.Cell><strong>{totalAmount.toLocaleString('vi-VN')} đ</strong></Table.Summary.Cell>
              </Table.Summary.Row>
            )}
          />
        </div>


      </Modal>
    </>
  );
}

export default CheckoutModal;