import React, { useEffect, useState } from "react";
import { Space, Table, Tag, message } from "antd";
import UpdateIsDelete from "./UpdateIsDelete";
import { get } from "../../../helpers/API.helper";
import UpdateStoreManager from "./UpdateStoreManager";
import {Link} from "react-router-dom"

function ListStoreManager() {
  const [AccountManager, setAccountManager] = useState([]);

  const fetchApi = async () => {
    try {
      const data = await get("http://localhost:5264/api/Account");     
      setAccountManager(data);
    } catch (error) {
      message.error("Error fetching accounts");
      console.log("Error in ListStoreManager", error);
      setAccountManager([]);
    }
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
            {/* <UpdateStoreManager /> */}
            <Link to={`edit/${record.accountId}`}>
              Update123
            </Link>
            <UpdateIsDelete record={record} onReload={onReload}/>          
          </Space>
        );
      },
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={AccountManager.map(account => ({ ...account, key: account.accountId }))}
    />
  );
}

export default ListStoreManager;