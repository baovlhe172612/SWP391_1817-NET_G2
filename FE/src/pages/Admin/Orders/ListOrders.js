import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  // let data = [];

  useEffect(() => {
    const fetchApi = async () => {
      try {
        // Get data orders
        const data = await get(`${LIST_ORDER}`);

        console.log(data);

        if (data) {
          setOrders(data);
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
      render: (date) => <span>{getDateTime(date)}</span>,
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
        <Link to={`${1}/${orderId}`}>
          <Button type="primary">Detail</Button>
        </Link>
      ),
    },
  ];

  return (
    <>
         
         <Table columns={columns} dataSource={orders} pagination={{pageSize: 6}}  rowKey="id" />
    </>
  );
}

export default ListOrders;
