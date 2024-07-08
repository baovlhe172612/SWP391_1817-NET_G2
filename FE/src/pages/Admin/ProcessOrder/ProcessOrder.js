import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { message, Table, Select, Button } from 'antd';
import { useSelector } from 'react-redux';
import { get, put } from '../../../helpers/API.helper';
import { HubConnectionBuilder } from '@microsoft/signalr';
import './process.css';
import soundmessege from "../../../assets/sound/sound.mp3";
Modal.setAppElement('#root');

const ProcessOrder = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedProductSizeId, setSelectedProductSizeId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTableId, setModalTableId] = useState(null); // State to store tableId
  const [modal2IsOpen, setModal2IsOpen] = useState(false); // State for second modal
  const account = useSelector(state => state.AccountReducer);
  const [selectedStatus, setSelectedStatus] = useState(-1);
  const [receivedCart, setReceivedCart] = useState([]);
  const [groupedOrders, setGroupedOrders] = useState([]); // State to store grouped orders
  const [statusChanges, setStatusChanges] = useState([]);
  useEffect(() => {
    const startSignalRConnection = async () => {
      const connection = new HubConnectionBuilder()
        .withUrl('http://localhost:5264/OrderHub')
        .withAutomaticReconnect()
        .build();
      try {
        const sound = new Audio(soundmessege);
        await connection.start();
        console.log('SignalR Connected.');
        connection.on('ReceiveOrderNotification', (tableId, cart) => {
          console.log(cart);
          sound.play();
          fetchApi(); // Update order details on receiving notification
          setModalTableId(tableId); 
          setReceivedCart(cart); // Store received cart for future use
          setModal2IsOpen(true); // Open the second modal
        });
      } catch (error) {
        console.error('SignalR Connection Error: ', error);
      }
    };
  
    startSignalRConnection();
  }, []);

  useEffect(() => {
    fetchApi(); // Initial fetch of order details
  }, []);

  const fetchApi = async () => {
    try {
      const data = await get(`http://localhost:5264/api/Order/orderdetailbystatus?storeId=1`);
      console.log(data);
      if (data) {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrderDetails(data);
        if (data.length === 0) {
          message.error('No data');
        }

        // Group by productId with max 10 items per group
        const grouped = groupByProductSizeId(data);
        setGroupedOrders(grouped);
      }
    } catch (error) {
      console.log("Error in fetchApi", error);
      setOrderDetails([]);
    }
  };

  const groupByProductSizeId = (orderDetails) => {
    const grouped = {};
    orderDetails.forEach(orderDetail => {
      const { product_SizeID } = orderDetail;
      if (!grouped[product_SizeID]) {
        grouped[product_SizeID] = [[]]; // Initialize with an array of arrays
      }
      let lastGroup = grouped[product_SizeID][grouped[product_SizeID].length - 1];
      // Check if the last group exceeds the limit of 10 items
      if (lastGroup.length >= 10) {
        // Create a new group for the same product_SizeID
        grouped[product_SizeID].push([]);
        lastGroup = grouped[product_SizeID][grouped[product_SizeID].length - 1];
      }
      // Add the order detail to the current group
      lastGroup.push(orderDetail);
    });
    // Flatten the groups structure
    const flattenedGroups = Object.keys(grouped).reduce((acc, key) => {
      return acc.concat(grouped[key]);
    }, []);
    return flattenedGroups;
  };
  

  const openModal = (product_SizeID) => {
    setSelectedProductSizeId(product_SizeID);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProductSizeId(null);
  };

  const closeModal2 = () => {
    setModal2IsOpen(false);
    setModalTableId(null); // Reset modalTableId when closing second modal
  };

  const handleStatusChange = async (orderDetailId, value) => {
    const updatedStatus = {
      orderDetailID: orderDetailId, 
      status: value,
    };

    console.log('value:',updatedStatus);
    try {
      
      const response = await put(`http://localhost:5264/api/Order/update`,[updatedStatus]);
      if (response) {    
        message.success("successfully!");
      }
      // Tham gia nhóm và gửi dữ liệu tới SignalR Hub
      const connection = new HubConnectionBuilder()
        .withUrl('http://localhost:5264/OrderHub')
        .build();
      try {
        await connection.start();
        console.log('SignalR Connected.');
        // Tham gia nhóm với tableId và gửi dữ liệu
        const orderDetail = orderDetails.find(od => od.orderDetailID === orderDetailId);
        if (!orderDetail) {
          throw new Error(`Order detail with ID ${orderDetailId} not found.`);
        }
       const tableId = orderDetail.tableID;
       console.log(tableId);
        await connection.invoke('JoinTableGroup', tableId.toString());
       await connection.invoke('SendOrderNotificationToGroup',tableId.toString(),orderDetail.product_SizeID.toString()
       ,updatedStatus.status.toString(),orderDetail.date.toString());
        console.log('SendOrderStatusUpdate:', [updatedStatus]);
      } catch (error) {
        console.error('SignalR Error:', error);
      } finally {
        await connection.stop();
      }

      // Fetch lại dữ liệu sau khi đã cập nhật trạng thái
      fetchApi();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  const columns = [
    {
      title: 'Mã số đơn hàng',
      dataIndex: 'orderDetailID',
      key: 'orderDetailID',
      className: 'ant-table-hidden-column',
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productID',
      key: 'productID',
      className: 'ant-table-hidden-column',
    },
    {
      title: 'Ảnh',
      dataIndex: 'img',
      key: 'img',
      render: (img, record) => <img src={img} alt={record.productName} style={{ width: '50px', height: '50px' }} />,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Bàn',
      dataIndex: 'tableID',
      key: 'tableID',
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'date',
      key: 'date',
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          defaultValue={status}
          onChange={(value) => handleStatusChange(record.orderDetailID, value)}
          style={{ width: 120 }}
        >
          <Select.Option value={-1}>Chờ xử lý</Select.Option>
          <Select.Option value={0}>Đang xử lý</Select.Option>
          <Select.Option value={1}>Hoàn thành</Select.Option>
        </Select>
      ),
    },
    
  ];

  // Sort grouped orders by the time they were created
  const sortedGroupedOrders = Object.keys(groupedOrders)
    .map(key => ({
      productId: key,
      orders: groupedOrders[key],
    }))
    .sort((a, b) => {
      const timeA = new Date(a.orders[0].date);
      const timeB = new Date(b.orders[0].date);
      return timeA - timeB;
    });
    
  return (
    <div>
      {/*  css ở đây */}
      {sortedGroupedOrders.map((group) => (
        <div key={group.productId}>
          <h3>Tên Sản Phẩm: {group.orders[0].productName} - {group.orders[0].sizeName}</h3>
          <h4>Số lượng đơn hàng: {group.orders.length}</h4>
          <Button onClick={() => openModal(group.productId)}>
            Xem chi tiết
          </Button>
        </div>
      ))}

<Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
<div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', alignItems: 'center' }}>
    <input type="text" placeholder="Số lượng" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '8px' }} />
    <Button type="primary">Lưu</Button>
  </div>
  <br/>
  <br/>
  {selectedProductSizeId && groupedOrders[selectedProductSizeId] && (
    <Table
      columns={columns}
      dataSource={groupedOrders[selectedProductSizeId]}
      rowKey="OrderDetailID"
    />
  )}
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <Button onClick={closeModal} style={{ marginTop: '20px' }}>Đóng</Button>
  </div>
</Modal>

      <Modal isOpen={modal2IsOpen} onRequestClose={closeModal2}
       style={{
        content: {
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
          maxHeight: '400px', 
          overflow: 'auto' 
        }
      }}
      >
        <div style={{ maxHeight: '55vh', overflowY: 'auto' }}>
          <h2 style={{ textAlign: 'center' }}>Bàn số {modalTableId} vừa đặt đồ uống</h2>
          <Table
            dataSource={receivedCart}
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
            ]}
            pagination={false}
            rowKey="productSizeID"
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button onClick={closeModal2} style={{ marginTop: '20px' }}>Đóng</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProcessOrder;
