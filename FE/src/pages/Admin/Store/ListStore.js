import React from "react";
import { Space, Table, Tag } from "antd";

function ListStore() {
  // lấy qua API
  const columns = [
    {
      title: "Store Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>, // custom text
    },
    {
      title: "Store location",
      dataIndex: "location",
      key: "name",
      render: (text) => <a>{text}</a>, // custom text
    },
    {
      title: "Account Name",
      dataIndex: "accoutName",
      key: "name",
      render: (text) => <a>{text}</a>, // custom text
    },

  ];

  const data = [
    {
      name: "st 1",
      location: "Hoa Lac",
      accoutName: "Annt22"
    },
    {
      name: "st 2",
      location: "Hoa Lac",
      accoutName: "Annt22"
    },
    {
      name: "st3 3",
      location: "Hoa Lac",
      accoutName: "Annt22"
      
     
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default ListStore;
