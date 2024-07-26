


import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, message, Input, Tooltip } from "antd";
import { LIST_Employee } from "../../../helpers/APILinks";
import { get } from "../../../helpers/API.helper";
import { Link } from "react-router-dom";
import UpdateIsDelete from "./UpdateIsDelete";
import updateStatus from "./UpdateStatus";
import { EditOutlined, MenuOutlined } from "@ant-design/icons";

const { Search } = Input;

function ListEmployee() {
  const [accountEmployee, setAccountEmployee] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]); // State to store selected status filters
  const [filterIsDelete, setFilterIsDelete] = useState([]); // State to store selected isDelete filters
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  const fetchApi = async () => {
    try {
      const data = await get(LIST_Employee);
      setAccountEmployee(data);
    } catch (error) {
      message.error("Error fetching accounts");
      setAccountEmployee([]);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const onReload = () => {
    fetchApi();
  };



  const getFilteredData = () => {
    let filteredData = accountEmployee;

    // Apply status filter
    if (filterStatus.length > 0) {
      const statusMap = {
        active: 1,
        inactive: 0,
      };
      filteredData = filteredData.filter(
        (employee) => employee.status === statusMap[filterStatus[0]]
      );
    }

    // Apply isDelete filter
    if (filterIsDelete.length > 0) {
      filteredData = filteredData.filter(
        (employee) => employee.isDelete === parseInt(filterIsDelete[0])
      );
    }

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter((employee) =>
        Object.keys(employee).some((key) =>
          String(employee[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filteredData;
  };

  const columns = [
    {
      title: "AccountID",
      dataIndex: "accountId",
      key: "accountId",
      sorter: (a, b) => a.accountId.localeCompare(b.accountId), // String comparison
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName), // String comparison
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
      sorter: (a, b) => a.roleName.localeCompare(b.roleName), // String comparison
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
        const { isDelete } = record; // Assuming isDelete is a property in your record object
        const statusMap = {
          1: { text: "Active", color: "green" },
          0: { text: "Inactive", color: "red" }
        };
        const { text, color } = statusMap[status] || {
          text: "Unknown",
          color: "gray"
        };

        if (isDelete === 1) {
          return (
            <Tag color="default">Deleted</Tag>
          );
        }

        return (
          <Button onClick={() => updateStatus(record, onReload)}>
            <Tag color={color}>{text}</Tag>
          </Button>
        );
      },
      filters: [
        { text: "Active", value: 1 },
        { text: "Inactive", value: 0 }
      ],
      onFilter: (value, record) => record.status === value,
    },


    {
      title: "isDelete",
      dataIndex: "isDelete",
      key: "isDelete",
      filters: [
        { text: 'Undeleted', value: 0 },
        { text: 'Deleted', value: 1 },
      ],
      onFilter: (value, record) => record.isDelete === value,

      render: (isDelete) => {
        const statusMap = {
          0: { text: "Undeleted", color: "green" },
          1: { text: "Deleted", color: "red" },
        };

        const { text, color } = statusMap[isDelete] || {
          text: "Unknown",
          color: "gray",
        };
        return <Tag color={color}>{text}</Tag>;
      },
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <UpdateIsDelete record={record} onReload={onReload} />
          <Tooltip title="Edit">
            <Link to={`/admin/employee/edit/${record.accountId}`}>
              <Button type="primary" icon={<EditOutlined />} />
            </Link>
          </Tooltip>

          <Tooltip title="Detail">
            <Link to={`/admin/employee/detail/${record.accountId}`}>
             
              <Button type="primary" icon={<MenuOutlined />} ghost />
            </Link>
          </Tooltip>

        </Space>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200 }}
        />
      </Space>
      <Table columns={columns} dataSource={getFilteredData()} />
    </>
  );
}

export default ListEmployee;
