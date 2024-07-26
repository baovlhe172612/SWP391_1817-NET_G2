import React, { useEffect, useState } from 'react';
import { Modal, Form, Table, Button, Select, Input } from 'antd';
import { ClockCircleOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import QRCode from 'qrcode.react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { getCookie } from '../../../helpers/Cookie.helper';
import { useDispatch, useSelector } from 'react-redux';
import { addToSavedCart } from '../../../actions/DataSaveCartAction';
const { Option } = Select;

function CheckoutModal({ handleDeleteAll, isVisible, handleOk, handleCancel, cartDataModal, }) {
  const [form] = Form.useForm();
  const [qrVisible, setQrVisible] = useState(false);
  const [billVisible, setBillVisible] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [connection, setConnection] = useState(null);
  const [isConnected, setIsConnected] = useState(false);



  let storeId = parseInt(getCookie('storeId'), 10);
  let tableId = parseInt(getCookie('tableId'), 10);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);


  const handleSaveCart = () => {
    // Lấy thời gian hiện tại
    const currentDateTime = new Date();

    // Tạo một mảng mới với các sản phẩm có thêm thuộc tính status và datetime
    const cartWithStatusAndDateTime = cart.list.map(item => ({
      ...item,
      status: -1,
      datetime: currentDateTime
    }));

    // Dispatch action với payload là mảng mới
    dispatch(addToSavedCart(cartWithStatusAndDateTime));
  };

  if (!storeId) {
    storeId = 1;
  }
  if (!tableId) {
    tableId = 1;
  }
  useEffect(() => {
    const startConnection = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:5264/OrderHub')
        .withAutomaticReconnect()
        .build();

      try {
        await newConnection.start();
        setIsConnected(true);
        console.log('SignalR Connected');
      } catch (err) {
        console.error('SignalR Connection Error: ', err);
      }

      setConnection(newConnection);
    };

    startConnection();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

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
      render: (text) => `${text.toLocaleString('vi-VN')}đ`,
    },
  ];
  console.log(cartDataModal);
  const totalAmount = cartDataModal.reduce((acc, item) => acc + item.price, 0);

  const MY_BANK = ({
    BANK_ID: "BIDV",
    ACCOUNT_NO: 4271033212
  }


  )
  let qr = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-qr_only.png?amount=${totalAmount}`
  
  const onOk = async () => {
    try {
      const values = await form.validateFields();
      const paymentMethod = values.paymentMethod;
      const tableIdString = tableId.toString();
      const cartData = cartDataModal.map(item => ({
        productSizeId: item.productSizeID,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        Status: -1
      }));
      // Send SignalR notification
      if (connection && isConnected) {
        await connection.invoke('SendOrderNotification', tableIdString, cartData);
        console.log('Order notification sent to store:', tableIdString);
      } else {
        console.error('SignalR connection not established or connected.');
        // Handle when SignalR connection is not ready
      }

      // Handle other actions based on payment method
      if (paymentMethod === '1') {
        setBillVisible(true);
      } else if (paymentMethod === '2') {
        setQrCodeValue(`Payment of ${totalAmount.toLocaleString('vi-VN')}đ`);
        setQrVisible(true);
      }
      handleSaveCart();
      handleOk(values); // Close the modal or perform other actions after submission
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };
  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber);
    switch (stepNumber) {
      case 1:
        console.log('Đã đặt hàng');
        break;
      case 2:
        console.log('Đang tiến hành');
        break;
      case 3:
        console.log('Hoàn thành');
        break;
      default:
        break;
    }
  };

  return (
    <>

      <Modal
        title="Bill"
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
        style={{ top: 20 }}
      >
        <div style={{ maxHeight: '57vh', overflowY: 'auto' }}>
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
          <Form form={form} initialValues={{ paymentMethod: '1' }}>
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

      <Modal
        title="QR Code Payment"
        visible={qrVisible}
        style={{ top: 20 }}
        footer={[
          <Button key="close" onClick={() => { setQrVisible(false); handleDeleteAll(); }}>
            Close
          </Button>
        ]}
        onCancel={() => setQrVisible(false)}
      >
        <div style={{ maxHeight: '55vh', overflowY: 'auto' }}>


          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            {/* <QRCode value={qrCodeValue} size={256} /> */}
            <img
              src={qr}
              alt="QR Code"
              style={{ maxWidth: '50%', height: 'auto' }}  // CSS để làm cho hình ảnh nhỏ xuống
            />
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

      <Modal
        title="Payment Bill"
        style={{ textAlign: 'center', top: 20, maxHeight: '60vh' }}
        visible={billVisible}
        footer={[
          <Button key="close" onClick={() => { setQrVisible(false); handleDeleteAll(); }}>
            Close
          </Button>
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
