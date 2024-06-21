import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Table, Tag, message } from "antd";
import { get } from "../../../helpers/API.helper";
import { LIST_ORDER } from "../../../helpers/APILinks";
import {
  getColorText,
  getDateTime,
  getStatusText,
} from "../../../helpers/Text.helper";

function ListOrders() {
  const [orders, setOrders] = useState([]);
  const account = useSelector((state) => state.AccountReducer);
  console.log("account.storeId",account.storeId)
  // let data = [];
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // US English uses month-day-year order
    // console.log(date.toLocaleDateString('en-US'));
    // → "12/20/2012"

    // British English uses day-month-year order
    // console.log(date.toLocaleDateString('en-GB'));
    // → "20/12/2012"
    return date.toLocaleDateString('en-GB');
};

  useEffect(() => {
    const fetchApi = async () => {
      try {
        // Get data orders
        const data = await get(`${LIST_ORDER}/${account.storeId}`);
        console.log("data list order",data);
        if (data) {
          setOrders(data);
          if (data.length === 0) {
            message.error("No order in store");
          }
        }
      } catch (error) {
        // Notification Error
        console.log(error, "ListOrders");
        message.error("Server error");
      }
    };

    fetchApi();
  }, []);
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <a>{text}</a>, // custom text
    },
    {
      title: "Table Name",
      dataIndex: "tableId",
      key: "tableId",
      render: (text) => <strong>Table-{text}</strong>, // custom text
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getColorText(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{formatDate(getDateTime(date))}</span>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text) => <strong style={{ fontSize: "1.1rem" }}>${text}</strong>, // custom text
    },
    {
      title: "Detail",
      dataIndex: "orderId",
      key: "orderIdDetail",
      render: (orderId) => (
        <Link to={`/admin/orders/orderdetails/${orderId}/${account.storeId}`}>
          <Button type="primary">Detail</Button>
        </Link>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={orders}
        pagination={{ pageSize: 6 }}
        rowKey="id"
      />
    </>
  );
}

export default ListOrders;
