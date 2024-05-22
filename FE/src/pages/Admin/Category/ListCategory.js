import React from 'react'
import { Space, Table, Tag } from "antd";
function ListCategory() {
  const columns = [
    {
      title: "Category ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>, // custom text
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>, // custom text
    },


  ];

  const data = [
    {
      id: "1",
      name: "name1",
      
    },
    {
      id: "2",
      name: "name2",
      
    },
    
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default ListCategory