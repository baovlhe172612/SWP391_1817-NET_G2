import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, message } from "antd";
import UpdateIsDelete from "./UpdateIsDelete";
import { get } from "../../../helpers/API.helper";
import UpdateStatus from "./UpdateStatus";
import { Link } from "react-router-dom";
function ListStoreManager() {
  const [AccountManager, setAccountManager] = useState([]);

  const fetchApi = async () => {
    try {
      const data = await get("http://localhost:5264/api/Account/manager");     
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
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "Store Name",
      dataIndex: "storeName",
      key: "storeName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const statusMap = {
          1: { text: "Active", color: "green" },
          0: { text: "Inactive", color: "red" }
        };
        const { text, color } = statusMap[status] || {
          text: "Unknown",
          color: "gray"
        };
    
        return (
          <Button onClick={() => UpdateStatus(record,onReload)}>
            <Tag color={color}>{text}</Tag>
          </Button>
        );
      }
    },
   
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        return (
          <Space size="middle">                     
            <UpdateIsDelete record={record} onReload={onReload}/> 
            <Link to={`/admin/manager-store/edit/${record.accountId}`}>
            <Button type="primary">Update</Button>
          </Link>         
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