import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, message } from "antd";
import UpdateIsDelete from "./UpdateIsDelete";
import { get } from "../../../helpers/API.helper";
import UpdateStatus from "./UpdateStatus";
import { Link } from "react-router-dom";
import Filter from "./filter";
import { EditOutlined, FilterOutlined } from "@ant-design/icons";

function ListStoreManager() {
  const [AccountManager, setAccountManager] = useState([]);
  const [filters, setFilters] = useState({ status: "", isDeleted: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [showColumn, setShowColumn] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Set the default page size to 5
  });

  const fetchApi = async (filters) => {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const data = await get(`http://localhost:5264/api/Account/manager?${queryString}`);
      setAccountManager(data);
    } catch (error) {
      message.error("Error fetching accounts");
      console.log("Error in ListStoreManager", error);
      setAccountManager([]);
    }
  };

  useEffect(() => {
    fetchApi(filters);
  }, [filters]);

  useEffect(() => {
    setShowColumn(filters.status === "0" || filters.isDeleted === "1");
  }, [filters]);

  const onReload = () => {
    fetchApi(filters);
  };

  const handleApplyFilters = (filters) => {
    setFilters(filters);
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const columns = [
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
      title: "CCCD",
      dataIndex: "cccd",
      key: "cccd",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Date Worked",
      dataIndex: "dateStartWork",
      key: "dateStartWork",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
    showColumn && {
      title: "Date Inactivity",
      dataIndex: "statusDate",
      key: "statusDate",
    },
    showColumn && {
      title: "Is Delete",
      dataIndex: "isDelete",
      key: "isDelete",
      render: (isDelete, record) => {
        const statusMap = {
          1: { text: "Deleted", color: "red" },
          0: { text: "UnDeleted", color: "green" }
        };
        const { text, color } = statusMap[isDelete] || {
          text: "Unknown",
          color: "gray"
        };
        return <Tag color={color}>{text}</Tag>;
      }
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
          <Button onClick={() => UpdateStatus(record, onReload)}>
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
            <UpdateIsDelete record={record} onReload={onReload} />
            <Link to={`/admin/manager-store/edit/${record.accountId}`}>
              <Button type="primary" icon={<EditOutlined />} />
            </Link>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Button type="primary" icon={<FilterOutlined />} onClick={() => setModalVisible(true)}>
        Filter
      </Button>
      <Filter
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        applyFilters={handleApplyFilters}
      />
      <Table
        columns={columns.filter((column) => !!column)} // Lọc bỏ các cột null
        dataSource={AccountManager && AccountManager.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize).map((account) => ({ ...account, key: account.accountId }))}
        pagination={{
          ...pagination,
          total: AccountManager.length,
        }}
        onChange={handleTableChange}
      />
    </>
  );
}

export default ListStoreManager;
