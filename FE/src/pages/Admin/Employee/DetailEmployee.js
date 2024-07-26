import React, { useEffect, useState } from "react";
import { Table, Tag, message } from "antd";
import { LIST_ACCOUNT, LIST_Employee } from "../../../helpers/APILinks";
import { get } from "../../../helpers/API.helper";
import UpdateIsDelete from "../ManagerStore/UpdateIsDelete";
import { useParams } from 'react-router-dom';

function DetailEmployee() {
  const { id } = useParams();
  console.log("id: ",id)
  const [accountEmployee, setAccountEmployee] = useState(null);

  const fetchApi = async () => {
    try {
      const data = await get(`${LIST_Employee}/${id}`);
      console.log("Data fetched:", data);
      setAccountEmployee(data);
    } catch (error) {
      message.error("Error fetching account details");
      console.log("Error in DetailEmployee:", error);
      setAccountEmployee(null);
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
      render: (passWord) => (
        <div style={{ wordBreak: 'break-word' }}>
          {passWord}
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
      title: "CCCD",
      dataIndex: "cccd",
      key: "cccd",
    },
    {
      title: "Date Start Work",
      dataIndex: "dateStartWork",
      key: "dateStartWork",
    },
    {
      title: "Date Inactivity",
      dataIndex: "statusDate",
      key: "statusDate",
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
        const { text, color } = statusMap[status] || { text: "Unknown", color: "gray" };
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  console.log("AccountEmployee state:", accountEmployee);

  return (
    <>
      {accountEmployee ? (
        <Table columns={columns} dataSource={[accountEmployee]} />
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}

export default DetailEmployee;