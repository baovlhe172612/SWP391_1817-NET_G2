

import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, message } from "antd";
import { LIST_Employee } from "../../../helpers/APILinks";
import { get } from "../../../helpers/API.helper";
import UpdateIsDelete from "../ManagerStore/UpdateIsDelete";
import { Link } from "react-router-dom";

function ListEmployee() {
  const [AccountEmployee, setAccountEmployee] = useState([]);

  const fetchApi = async () => {
    try {
      const data = await get(LIST_Employee);
      setAccountEmployee(data);
    } catch (error) {
      message.error("Error fetching accounts");
      console.log("Error in ListStoreManager", error);
      setAccountEmployee([]);
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
      // Custom text rendering
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleId",
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
      render: (status) => {
        const statusMap = {
          1: { text: "Active", color: "green" },
          0: { text: "Inactive", color: "red" },
        };
        const { text, color } = statusMap[status] || { text: "Unknown", color: "gray" };
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <UpdateIsDelete record={record} onReload={onReload} />

          <Link to={`/admin/employee/edit/${record.accountId}`}>
            <Button type="primary">Edit</Button>
          </Link>

          <Link  to={`/admin/employee/detail/${record.accountId}`}>
            <Button type="primary">Detail</Button>
          </Link>
        </Space>
      ),
    },
  ];

  console.log("AccountEmployee: ", AccountEmployee);

  return (
    <>
      <Table columns={columns} dataSource={AccountEmployee} />
    </>
  );
}

export default ListEmployee;
