import React from "react";
import { Table, Tag } from "antd";

function OrderDetails() {
    const columns = [
        {
          title: "Order ID",
          dataIndex: "id",
          key: "id",
          render: (text) => <a>{text}</a>, // custom text
        },
        {
          title: "Table Name",
          dataIndex: "table_name",
          key: "table_name",
          render: (text) => <a>{text}</a>, // custom text
        },
        {
          title: "Store Name",
          dataIndex: "store_name",
          key: "store_name",
          render: (text) => <a>{text}</a>, // custom text
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (status) => (
            <Tag color={status === "1" ? "green" : "red"}>
              {status === "1" ? "Done" : "Process"}
            </Tag>
          ),
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text) => <a>{text}</a>, // custom text
          },
          {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (text) => <a>${text}</a>, // custom text
          },
      ];
    
      const data = [
        {
          id: "1",
          table_name: "Table 1",
          store_name: "Store A",
          status: "1",
          date: "2023-05-16",
          total: "50.00",
        },
        {
          id: "2",
          table_name: "Table 2",
          store_name: "Store B",
          status: "0",
          date: "2023-05-17",
          total: "75.00",
        },
        {
          id: "3",
          table_name: "Table 3",
          store_name: "Store A",
          status: "1",
          date: "2023-05-18",
          total: "100.00",
        },
        {
          id: "4",
          table_name: "Table 4",
          store_name: "Store C",
          status: "0",
          date: "2023-05-19",
          total: "120.00",
        },
        {
          id: "5",
          table_name: "Table 5",
          store_name: "Store B",
          status: "1",
          date: "2023-05-20",
          total: "60.00",
        },
      ];
    
      return (
        <>
          <Table columns={columns} dataSource={data} rowKey="id" />
        </>
      );
}

export default OrderDetails