import React from 'react'
import { Space, Table, Tag } from "antd";
import DeleteStoreManager from './DeleteStoreManager';
import UpdateStoreManager from './UpdateStoreManager';
function ListStoreManager() {
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <a>{text}</a>, // Custom text rendering
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Active' : 'Inactive'}
        </Tag>
      ), // Render status with color-coded tags
    },
    {
      title: "Account ID",
      dataIndex: "accountId",
      key: "accountId",
    },
    {
      title: "Role ID",
      dataIndex: "roleId",
      key: "roleId",
    },

    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => {
        return (
          <Space size="middle">
            <UpdateStoreManager record={record} />
            <DeleteStoreManager record={record} /> {/* Pass the record to the delete component */}
          </Space>
        );
      }
    },
  ];

  // Define the data for the employee table
  const data = [
    {
      fullName: "John Doe",
      user: "johndoe",
      password: "password123",
      phone: "123-456-7890",
      status: "active",
      accountId: "A123",
      roleId: "Manager",
    },
    {
      fullName: "Jane Smith",
      user: "janesmith",
      password: "password456",
      phone: "987-654-3210",
      status: "inactive",
      accountId: "A124",
      roleId: "Manager",

    },
    {
      fullName: "Sam Johnson",
      user: "samjohnson",
      password: "password789",
      phone: "555-666-7777",
      status: "active",
      accountId: "A125",
      roleId: "Manager",

    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default ListStoreManager