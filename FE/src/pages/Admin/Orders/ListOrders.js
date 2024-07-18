import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Tag, message, Modal, Spin, DatePicker, Row, Col, Input } from "antd";
import { get } from "../../../helpers/API.helper";
import { LIST_ORDERHaveTableName, LIST_ORDERDETAILS } from "../../../helpers/APILinks";
import { getColorText, getDateTime, getStatusText } from "../../../helpers/Text.helper";
import {MenuOutlined} from '@ant-design/icons'
import updateStatus from "./UpdateStatus";

const { RangePicker } = DatePicker;

const ListOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [priceRange, setPriceRange] = useState([null, null]);
  const [paymentNameFilter, setPaymentNameFilter] = useState("");

  const account = useSelector((state) => state.AccountReducer);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await get(`${LIST_ORDERHaveTableName}/${account.storeId}`);
        if (data && data.length > 0) {
          setOrders(data);
          setFilteredOrders(data);
        } else {
          message.error("No orders found in store.");
        }
      } catch (error) {
        message.error("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [account.storeId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const fetchOrderDetails = async (orderId) => {
    setLoading(true);
    try {
      const data = await get(`${LIST_ORDERDETAILS}/${account.storeId}/${orderId}`);
      setOrderDetails(data);
      setIsModalVisible(true);
    } catch (error) {
      message.error("Failed to fetch order details.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setOrderDetails(null);
  };

  const handleDateRangeChange = (dates) => {
    setSelectedDateRange(dates);
    filterOrdersByDate(dates);
  };

  const filterOrdersByDate = (dates) => {
    if (!dates || dates.length !== 2) {
      setFilteredOrders(orders);
    } else {
      const [start, end] = dates;
      const filtered = orders.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate >= start && orderDate <= end;
      });
      setFilteredOrders(filtered);
    }
  };

  const handlePriceRangeChange = (value, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value ? parseFloat(value) : null;
    setPriceRange(newPriceRange);
  };

  const handlePriceFilter = () => {
    const filtered = orders.filter((order) => {
      const totalPrice = order.total;
      const [minPrice, maxPrice] = priceRange;
      return (minPrice === null || totalPrice >= minPrice) && (maxPrice === null || totalPrice <= maxPrice);
    });
    setFilteredOrders(filtered);
  };

  const handlePaymentNameFilter = (e) => {
    const { value } = e.target;
    setPaymentNameFilter(value);
    const filtered = orders.filter((order) =>
      order.paymentName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const clearFilters = () => {
    setSelectedDateRange([]);
    setPriceRange([null, null]);
    setPaymentNameFilter("");
    setFilteredOrders(orders);
  };

  // Function to handle accepting an order
const handleAcceptOrder = async (orderId) => {
  setLoading(true);
  try {
    // Make API call to update the order acceptance status
    // Assuming there's an API endpoint to update 'accepted' status
    const updatedOrder = await updateOrderAcceptance(orderId);
    if (updatedOrder) {
      message.success("Order accepted successfully.");
      // Update orders state to reflect the change
      const updatedOrders = orders.map((order) =>
        order.orderID === orderId ? { ...order, accepted: true } : order
      );
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
    } else {
      message.error("Failed to accept order.");
    }
  } catch (error) {
    message.error("Failed to accept order.");
  } finally {
    setLoading(false);
  }
};
const fetchOrders = async () => {
  setLoading(true);
  try {
    const data = await get(`${LIST_ORDERHaveTableName}/${account.storeId}`);
    if (data && data.length > 0) {
      setOrders(data);
      setFilteredOrders(data);
    } else {
      message.error("No orders found in store.");
    }
  } catch (error) {
    message.error("Server error. Please try again later.");
  } finally {
    setLoading(false);
  }
};

const onReload = () => {
  fetchOrders();
};
const handleFilter = (value, record) => {
  const orderDate = new Date(record.date);
  const [start, end] = selectedDateRange;
  return orderDate >= start && orderDate <= end;
};

// Function to update order acceptance status through API
const updateOrderAcceptance = async (orderId) => {
  // try {
  //   // Assuming there's an API endpoint to update 'accepted' status of an order
  //   const response = await put(`${UPDATE_ORDER_ACCEPTANCE_ENDPOINT}/${orderId}`, { accepted: true });
  //   return response.data; // Assuming API returns updated order data
  // } catch (error) {
  //   throw new Error("Failed to update order acceptance status.");
  // }
};
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderID",
      key: "orderID",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Table Name",
      dataIndex: "tableName",
      key: "tableName",
      filters: [...new Set(orders.map(order => order.tableName))].map(tableName => ({ text: tableName, value: tableName })),
      onFilter: (value, record) => record.tableName.includes(value),
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Process", value: 0 },
        { text: "Reject", value: -1 },
        { text: "Done", value: 1 },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => <Tag color={getColorText(status)}>{getStatusText(status)}</Tag>,
    },
    // {
    //   title: "Date",
    //   dataIndex: "date",
    //   key: "date",
    //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    //     <div style={{ padding: 8 }}>
    //       <RangePicker
    //         value={selectedDateRange}
    //         onChange={(dates) => setSelectedKeys(dates)}
    //         style={{ marginBottom: 8, display: 'block' }}
    //       />
    //       <Button type="primary" onClick={() => confirm()} icon="search" size="small" style={{ width: 90, marginRight: 8 }}>
    //       </Button>
    //       <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
    //         Reset
    //       </Button>
    //     </div>
    //   ),
    //   onFilter: (value, record) => {
    //     const orderDate = new Date(record.date);
    //     const [start, end] = selectedDateRange;
    //     return orderDate >= start && orderDate <= end;
    //   },
    //   render: (date) => <span>{formatDate(getDateTime(date))}</span>,
    // },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <RangePicker
            value={selectedDateRange}
            onChange={(dates) => setSelectedDateRange(dates)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: handleFilter,
      render: (date) => <span>{formatDate(getDateTime(date))}</span>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Min Price"
            value={priceRange[0] === null ? '' : priceRange[0]}
            onChange={(e) => handlePriceRangeChange(e.target.value, 0)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Input
            placeholder="Max Price"
            value={priceRange[1] === null ? '' : priceRange[1]}
            onChange={(e) => handlePriceRangeChange(e.target.value, 1)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button type="primary" onClick={handlePriceFilter} icon="search" size="small" style={{ width: 90, marginRight: 8 }}>
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => {
        const totalPrice = record.total;
        const [minPrice, maxPrice] = priceRange;
        return (minPrice === null || totalPrice >= minPrice) && (maxPrice === null || totalPrice <= maxPrice);
      },
      render: (text) => <strong style={{ fontSize: "1.1rem" }}>{text.toLocaleString('vi-VN')}đ</strong>,
    },
    {
      title: "Payment Name",
      dataIndex: "paymentName",
      key: "paymentName",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Payment Name"
            value={paymentNameFilter}
            onChange={handlePaymentNameFilter}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button type="primary" onClick={() => confirm()} icon="search" size="small" style={{ width: 90, marginRight: 8 }}>
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.paymentName.toLowerCase().includes(paymentNameFilter.toLowerCase()),
      render: (paymentName) => <span>{paymentName}</span>,
    },
    {
      title: "Detail",
      key: "action",
      render: (text, record) => (
        <Button icon={<MenuOutlined />} type="primary" onClick={() => fetchOrderDetails(record.orderID)} />
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const { isDelete } = record; // Assuming isDelete is a property in your record object
        const statusMap = {
          1: { text: "Accept", color: "green" },
          0: { text: "InAccept", color: "red" }
        };
        const { text, color } = statusMap[status] || {
          text: "Unknown",
          color: "gray"
        };
    
        if (status === 1) { // If status is already 1 (Accepted), disable the button
          return (
            <Tag color={color}>{text}</Tag>
          );
        }
    
        return (
          <Button onClick={() => updateStatus(record, onReload)} disabled={status === 1}>
            <Tag color={color}>{text}</Tag>
          </Button>
        );
      },
      filters: [
        { text: "Accept", value: 1 },
        { text: "InAccept", value: 0 }
      ],
      onFilter: (value, record) => record.status === value,
    }
    
    
   
  ];

  return (
    <>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <RangePicker onChange={handleDateRangeChange} />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredOrders}
        pagination={{ pageSize: 6 }}
        rowKey="orderID"
      />
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {loading ? (
          <Spin />
        ) : (
          orderDetails && (
            <Table
              columns={[
                {
                  title: "Order ID",
                  dataIndex: "orderID",
                  key: "orderID",
                },
                {
                  title: "Store Name",
                  dataIndex: "storeName",
                  key: "storeName",
                },
                {
                  title: "Product Name",
                  dataIndex: "productName",
                  key: "productName",
                },
                {
                  title: "Size",
                  dataIndex: "sizeName",
                  key: "sizeName",
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                  key: "quantity",
                },
                {
                  title: "Price",
                  dataIndex: "price",
                  key: "price",
                  render: (text) => `${text.toLocaleString('vi-VN')} đ`,
                },
              ]}
              dataSource={orderDetails}
              rowKey="id"
              pagination={false}
            />
          )
        )}
      </Modal>
    </>
  );
}

export default ListOrders;
