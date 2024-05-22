import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from "antd";
import DeleteStoreManager from './DeleteStoreManager';
import UpdateStoreManager from './UpdateStoreManager';
import { get } from "../../../helpers/API.helper";
function ListStoreManager() {
  const columns = [
    {
      title: "AccountID",
      dataIndex: "accountId",
      key: "accountId",
       // Custom text rendering
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      // Custom text rendering
    },
    {
      title: "User Name",
      dataIndex: "userName",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
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

  const [AccountManager, setAccountManager] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await get("http://localhost:5264/api/AccountControllers");
      //


      setAccountManager(data);
    };

    fetchApi();
  }, []);
  // Define the data for the employee table


  return (
    <>
      <Table columns={columns} dataSource={AccountManager} />
    </>
  );
}

export default ListStoreManager