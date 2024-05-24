import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, Modal, message } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import UpdateStoreManager from './UpdateStoreManager';
import { get, deleteItem } from "../../../helpers/API.helper";

const { confirm } = Modal;

function ListStoreManager() {
  const [AccountManager, setAccountManager] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await get("http://localhost:5264/api/Account");
      setAccountManager(data);
    };

  useEffect(() => {
    fetchApi();
  }, []);

  const onReload = () => {
    fetchApi();
};
  const columns = [
    {
      title: "AccountID",
      dataIndex: "accountId",
      key: "accountId",
      // Custom text rendering
      // Custom text rendering
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Password",
      dataIndex: "passWord",
      key: "passWord",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusMap = {
          1: { text: "Active", color: "green" },
          0: { text: "Inactive", color: "red" },
        };
        const { text, color } = statusMap[status] || {
          text: "Unknown",
          color: "gray",
        };
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        return (
          <Space size="middle">         
            <DeleteStoreManager record={record} onDelete={handleDelete} /> {/* Pass the record to the delete component */}
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={AccountManager} rowKey="accountId" />
    </>
  );
}

// Define the DeleteStoreManager component outside the ListStoreManager function
const DeleteStoreManager = ({ record, onDelete }) => {
  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this account?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      onOk() {
        return deleteAccount(record.accountId);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const deleteAccount = async (accountId) => {
    try {
      console.log(`Deleting account with ID: ${accountId}`);
      const response = await deleteItem(`http://localhost:5264/api/Account?id=${accountId}`);
      console.log(`Delete response:`, response);
      onDelete(accountId);  // Call onDelete to update the state in the parent component
    } catch (error) {
      console.error("Failed to delete account: ", error);
      message.error('Failed to delete account');
    }
  };

  return (
    <Button type="danger" onClick={showDeleteConfirm} style={{ color: 'red' }}>
      Delete
    </Button>
  );
};

export default ListStoreManager;
