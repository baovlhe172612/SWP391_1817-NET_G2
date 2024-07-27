import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { message, Table, Select, Button } from 'antd';
import { useSelector } from 'react-redux';
import { get, put } from '../../../helpers/API.helper';
import { HubConnectionBuilder } from '@microsoft/signalr';
import './process.css';
import soundmessege from "../../../assets/sound/sound.mp3";
import { LOCALHOST_API, connectOrderHub } from '../../../helpers/APILinks';
Modal.setAppElement('#root');

const ProcessOrder = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedProductSizeId, setSelectedProductSizeId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTableId, setModalTableId] = useState(null); // State to store tableId
  const [modal2IsOpen, setModal2IsOpen] = useState(false); // State for second modal
  const account = useSelector(state => state.AccountReducer);
  const [receivedCart, setReceivedCart] = useState([]);
  const [groupedOrders, setGroupedOrders] = useState([]); // State to store grouped orders
  const [productFinal, setProductFinal] = useState([]);
  
  useEffect(() => {
    const startSignalRConnection = async () => {
      const connection = new HubConnectionBuilder()
        .withUrl(`${connectOrderHub}`)
        .withAutomaticReconnect()
        .build();
      try {
        const sound = new Audio(soundmessege);
        await connection.start();
        // console.log('SignalR Connected.');              
        await connection.on('ReceiveOrderNotification', (tableId, cart) => {               
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
      const data = await get(`${LOCALHOST_API}/api/Order/orderdetailbystatus?storeId=${account.storeId}`);
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
      //
      if (!grouped[product_SizeID]) {
        grouped[product_SizeID] = [[]]; // Initialize with an array of arrays
      }
      //
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

    //
    flattenedGroups.forEach(it => {
      const length = it.length;
      it.map((product, index) => {
        product.waitTime = `${index + 1}/${length}`;
      })
    }
    )

    const newProductFinal = flattenedGroups.map((product, index) => {
      const newProduct = product.map(item => {
        return {
          productSizeId: item.product_SizeID,
          date: item.date,
          waitTime: item.waitTime,
          tableId: item.tableID
        }
      })

      //console.log(newProduct)
      return newProduct;
    })
     const newProduct1 = newProductFinal.flat();

      setProductFinal(newProduct1);
      
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
  // format date
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleStatusChange = async (orderDetailId, value) => {
    const updatedStatus = {
      orderDetailID: orderDetailId, 
      status: value,
    };

    console.log('value:',updatedStatus);
    try {
      const response = await put(`${LOCALHOST_API}/api/Order/update`,[updatedStatus]);
      if (response) {    
        message.success("successfully!");
      }
      // Tham gia nhóm và gửi dữ liệu tới SignalR Hub
      const connection = new HubConnectionBuilder()
        .withUrl(`${connectOrderHub}`)
        .withAutomaticReconnect()
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
       //console.log(tableId);
        await connection.invoke('JoinTableGroup', tableId.toString());
        await connection.invoke('SendOrderNotificationToGroup',tableId.toString(),orderDetail.product_SizeID.toString()
       ,updatedStatus.status.toString(),orderDetail.date.toString());
        console.log('SendOrderStatusUpdate:', orderDetail.date);
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
      title: 'Order Detail ID',
      dataIndex: 'orderDetailID',
      key: 'orderDetailID',
      className: 'ant-table-hidden-column',
    },
    {
      title: 'Product ID',
      dataIndex: 'productID',
      key: 'productID',
      className: 'ant-table-hidden-column',
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (img, record) => <img src={img} alt={record.productName} style={{ width: '50px', height: '50px' }} />,
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Table',
      dataIndex: 'tableID',
      key: 'tableID',
    },
    {
      title: 'Order date',
      dataIndex: 'date',
      key: 'date',   
      render: (createdate) => new Date(createdate).toLocaleString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          defaultValue={status}
          onChange={(value) => handleStatusChange(record.orderDetailID, value)}
          style={{ width: 120 }}
        >
          <Select.Option value={-1}>Wait</Select.Option>
          <Select.Option value={0}>Process</Select.Option>
          <Select.Option value={1}>Done</Select.Option>
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
          <h3>Product Name: {group.orders[0].productName} - {group.orders[0].sizeName}</h3>
          <h4>Quantity: {group.orders.length}</h4>
          <Button onClick={() => openModal(group.productId)}>
            Details
          </Button>
        </div>
      ))}

<Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
  {selectedProductSizeId && groupedOrders[selectedProductSizeId] && (
    <Table
      columns={columns}
      dataSource={groupedOrders[selectedProductSizeId]}
      rowKey="orderDetailID"
    />
  )}
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <Button onClick={closeModal} style={{ marginTop: '20px' }}>Close</Button>
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
          <h2 style={{ textAlign: 'center' }}>Table {modalTableId} order</h2>
          <Table
            dataSource={receivedCart}
            columns={[
              {
                title: 'Product Name',
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
          <Button onClick={closeModal2} style={{ marginTop: '20px' }}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProcessOrder;
