import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, message } from "antd";
import { LIST_Employee } from "../../../helpers/APILinks";
import { get } from "../../../helpers/API.helper";
import { Link } from "react-router-dom";
import UpdateIsDelete from "./UpdateIsDelete";

function ListEmployee() {
  const [accountEmployee, setAccountEmployee] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]); // State to store selected filters

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

  const handleFilterChange = (status) => {
    // Toggle filter status
    setFilterStatus((prevStatus) => 
      prevStatus.includes(status) ? [] : [status]
    );
  };

  const getFilteredData = () => {
    if (filterStatus.length === 0) return accountEmployee; // No filters selected, return all data

    const statusMap = {
      active: 1,
      inactive: 0,
    };

    return accountEmployee.filter(
      (employee) => employee.status === statusMap[filterStatus[0]]
    );
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
          <Link to={`/admin/employee/detail/${record.accountId}`}>
            <Button type="primary">Detail</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/** Filter buttons for Active and Inactive */}
      <Button.Group>
        <Button
          type={filterStatus.includes("active") ? "primary" : ""}
          onClick={() => handleFilterChange("active")}
        >
          Active
        </Button>
        <Button
          type={filterStatus.includes("inactive") ? "primary" : ""}
          onClick={() => handleFilterChange("inactive")}
        >
          Inactive
        </Button>
      </Button.Group>

      <Table columns={columns} dataSource={getFilteredData()} />
    </>
  );
}

export default ListEmployee;
