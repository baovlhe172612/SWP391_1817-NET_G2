import React from "react";
import { Table, Tag } from "antd";

function ListTopping() {
  const columns = [
    {
      title: "Topping ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>, // custom text
    },
    {
      title: "Topping Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>, // custom text
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>${text}</a>, // custom text
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "1" ? "green" : "red"}>
          {status === "1" ? "Stock" : "Out of Stock"}
        </Tag>
      ),
    },
  ];

  const data = [
    {
      id: "1",
      name: "Cheese",
      price: "2.5",
      status: "1"
    },
    {
      id: "2",
      name: "Pepperoni",
      price: "3.0",
      status: "0"
    },
    {
      id: "3",
      name: "Mushrooms",
      price: "1.75",
      status: "1"
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </>
  );
}

export default ListTopping;