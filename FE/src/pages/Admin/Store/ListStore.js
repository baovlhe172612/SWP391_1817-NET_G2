import React from "react";
import { Button, Space, Table, Tag } from "antd";

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
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleUpdate(record)}>Update</Button>
          <Button type="default" onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    }

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
    // Handler for updating a store
    const handleUpdate = (record) => {
      console.log("Update", record);
      // Add your update logic here
    };
  
    // Handler for deleting a store
    const handleDelete = (record) => {
      console.log("Delete", record);
      // Add your delete logic here
    };

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default ListStore;
