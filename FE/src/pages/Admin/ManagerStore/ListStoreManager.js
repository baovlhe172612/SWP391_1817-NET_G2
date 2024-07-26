import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, message,Input } from "antd";
import UpdateIsDelete from "./UpdateIsDelete";
import { get } from "../../../helpers/API.helper";
import UpdateStatus from "./UpdateStatus";
import { Link } from "react-router-dom";
import Filter from "./filter";
import { EditOutlined, FilterOutlined } from "@ant-design/icons";
import { LIST_ACCOUNT_MANAGERS } from "../../../helpers/APILinks";
function ListStoreManager() {
  const [AccountManager, setAccountManager] = useState([]);
  const [filters, setFilters] = useState({ status: "", isDeleted: "" });
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showColumn, setShowColumn] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Set the default page size to 3
  });
    // search
    const handleSearch = (e) => {
      console.log("search:",e)
      setSearch(e);
    };
    const handleSearchonchange = (e) => {
      setSearch(e.target.value);
    };
  const fetchApi = async (filters,search) => {
    try {
      const queryString = new URLSearchParams({ ...filters,search:search }).toString();
      console.log("quy:",queryString);
      const data = await get(`${LIST_ACCOUNT_MANAGERS}?${queryString}`);
      setAccountManager(data);
    } catch (error) {
      message.error("Error fetching accounts");
      console.log("Error in ListStoreManager", error);
      setAccountManager([]);
    }
  };

  useEffect(() => {
    fetchApi(filters,search);
  }, [filters,search]);
  //show columns
  useEffect(() => {
    setShowColumn(filters.status === "0" || filters.isDeleted === "1");
  }, [filters,search]);
  // reload
  const onReload = () => {
    fetchApi(filters,search);
  };
  // filter
  const handleApplyFilters = (filters) => {
    setFilters(filters);
  };
  // divide page
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
    },
    {
      title: "Citizens ID",
      dataIndex: "cccd",
      key: "cccd",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Date Worked",
      dataIndex: "dateStartWork",
      key: "dateStartWork",
      sorter: (a, b) => a.dateStartWork.localeCompare(b.dateStartWork),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
      sorter: (a, b) => a.roleName.localeCompare(b.roleName),
    },
    {
      title: "Store Name",
      dataIndex: "storeName",
      key: "storeName",
      sorter: (a, b) => a.storeName.localeCompare(b.storeName),
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
            <Link to={`/admin/managerStore/edit/${record.accountId}`}>
              <Button type="primary" icon={<EditOutlined />} />
            </Link>
          </Space>
        );
      },
    },
  ];

  return (
    <>
    <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<FilterOutlined />} onClick={() => setModalVisible(true)}>
          Filter
        </Button>
        <Input.Search
        placeholder="Search by name"
        onSearch={handleSearch}
        onChange={handleSearchonchange}
        style={{ width: 200 }}
        allowClear
        />
      </Space>
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