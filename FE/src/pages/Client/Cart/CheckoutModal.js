import React, { useState } from 'react';
import { Modal, Form, Table, Button, Select, Input } from 'antd';
import { ClockCircleOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import QRCode from 'qrcode.react';

const { Option } = Select;

function CheckoutModal({ isVisible, handleOk, handleCancel, cartDataModal }) {
  const [form] = Form.useForm();
  const [qrVisible, setQrVisible] = useState(false);
  const [billVisible, setBillVisible] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

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
      render: (text) => `${text.toLocaleString('vi-VN')} đ`,
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
        setQrCodeValue(`Payment of ${totalAmount.toLocaleString('vi-VN')} đ`);
        setQrVisible(true);
      }

      handleOk(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };
  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber);
    // Code here to fetch and display corresponding information for the step
    switch (stepNumber) {
        // case 1:
        //     // Fetch and display information for step 1
        //     console.log('Đã đặt hàng');
        //     break;
        case 1:
            // Fetch and display information for step 2
            console.log('Đang tiến hành');
            break;
        case 2:
            // Fetch and display information for step 3
            console.log('Hoàn thành');
            break;

        default:
            break;
    }
}

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
         <div className="order-tracking">
              

         
                <div className={`step ${currentStep >= 1 ? 'completed' : ''}`}>
                    <div className="circle">2</div>
                    <div className={`label ${currentStep >= 1 ? 'completed-text' : ''}`}>
                        <ClockCircleOutlined style={{ fontSize: '16px', color: currentStep >= 1 ? '#4caf50' : '#333' }} /> Đang tiến hành
                    </div>
                </div>

                <div className={`line ${currentStep >= 2 ? 'completed' : ''}`}></div>
                <div className="">
                    <div className="circle">3</div>
                    <div className={`label ${currentStep >= 2 ? 'completed-text' : ''}`}>
                      
                        <CheckOutlined style={{ fontSize: '16px', color: currentStep >= 2 ? '#4caf50' : '#333' }} /> Hoàn thành
                    </div>
                </div>
            </div>
      
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
        <div className="order-tracking">
                <div className={`step ${currentStep >= 1 ? 'completed' : ''}`} onClick={() => handleStepClick(1)}>
                    <div className="circle">1</div>
                    <div className={`label ${currentStep >= 1 ? 'completed-text' : ''}`}>
                        <LoadingOutlined style={{ fontSize: '16px', color: currentStep >= 1 ? '#4caf50' : '#333' }} /> Đã đặt hàng
                    </div>
                </div>

                <div className={`line ${currentStep >= 2 ? 'completed' : ''}`}></div>
                <div className={`step ${currentStep >= 2 ? 'completed' : ''}`} onClick={() => handleStepClick(2)}>
                    <div className="circle">2</div>
                    <div className={`label ${currentStep >= 2 ? 'completed-text' : ''}`}>
                        <ClockCircleOutlined style={{ fontSize: '16px', color: currentStep >= 2 ? '#4caf50' : '#333' }} /> Đang tiến hành
                    </div>
                </div>

                <div className={`line ${currentStep >= 3 ? 'completed' : ''}`}></div>
                <div className={`step ${currentStep >= 3 ? 'completed' : ''}`} onClick={() => handleStepClick(3)}>
                    <div className="circle">3</div>
                    <div className={`label ${currentStep >= 3 ? 'completed-text' : ''}`}>
                        <CheckOutlined style={{ fontSize: '16px', color: currentStep >= 3 ? '#4caf50' : '#333' }} /> Hoàn thành
                    </div>
                </div>
            </div>
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
