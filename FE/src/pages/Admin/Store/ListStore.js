import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Space, Table, Tag, Tooltip, Input } from "antd";
import { get, patch } from "../../../helpers/API.helper";
import {
  DELETE_STORE_ID,
  GET_STORES_STATUS,
  NEW_STORE,
  SEARCH_STORE,
} from "../../../helpers/APILinks";
import Swal from "sweetalert2";
import Search from "antd/es/input/Search";
import { DeleteOutlined, EditOutlined, MenuOutlined, SearchOutlined } from "@ant-design/icons";

function ListStore() {
  const [stores, setStores] = useState([]);
  const [storesFollowName, setStoresFollowName] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [managerFilter, setManagerFilter] = useState("");

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`${GET_STORES_STATUS}/${1}`);
        if (data) {
          setStores(data);
          setStoresFollowName(data)
        }
      } catch (error) {
        console.log("err in ListStore", error);
        setStores([]);
      }
    };

    fetchApi();
  }, [updated]);

  // Tạo danh sách các bộ lọc từ dữ liệu
  const uniqueStoreNames = [...new Set(storesFollowName.map((item) => item.storeName))];
  const storeNameFilters = uniqueStoreNames.map((name) => ({
    text: name,
    value: name,
  }));

  // Columns
  const columns = [
    {
      title: "StoreID",
      dataIndex: "StoreID",
      key: "StoreID",
    },
    {
      title: "StoreName",
      dataIndex: "StoreName",
      key: "StoreName",
      filters: storeNameFilters,
      onFilter: (value, record) => record.StoreName.includes(value),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      filters: [
        { text: "Active", value: 1 },
        { text: "Inactive", value: 0 },
      ],
      onFilter: (value, record) => record.Status === value,
      render: (status) =>
        status === 1 ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: "Manager",
      dataIndex: "Manager",
      key: "Manager",
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Manager"
            value={managerFilter}
            onChange={(e) => setManagerFilter(e.target.value)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => handleManagerFilter(managerFilter)}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            type="primary"
            onClick={() => handleManagerFilter("")}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) => record.Manager.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (storeId) => (
        <Space size="middle">
          <Tooltip title="edit">
            <Link to={`/admin/store/edit/${storeId}`}>
              <Button type="primary" icon={<EditOutlined />} />
            </Link>
          </Tooltip>

          <Tooltip title="detail">
            <Link to={`/admin/store/edit/${storeId}`}>
              <Button type="primary" icon={<MenuOutlined />} ghost />
            </Link>
          </Tooltip>

          <Tooltip title="delete">
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDelete(storeId)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Data
  let data = [];

  // Nếu có data từ API, tạo data cho Table
  if (storesFollowName.length > 0) {
    data = storesFollowName.map((store, index) => ({
      StoreID: store.storeId,
      StoreName: store.storeName,
      Location: store.location,
      Manager: store.accountName,
      Status: store.status,
      actions: store.storeId,
      key: index,
    }));
  }

  // Handler cho việc xóa cửa hàng
  const handleDelete = async (storeId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const dataDelete = await patch(`${DELETE_STORE_ID}${storeId}`, {
        storeId: storeId,
      });

      if (dataDelete) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        // Load lại dữ liệu
        setUpdated(!updated);
      }
    }
  };

  // Handler cho filter Manager
  const handleManagerFilter = (value) => {
    const filteredData = stores.filter((store) =>
      store.accountName.toLowerCase().includes(value.toLowerCase())
    );
    setStoresFollowName(filteredData);
  };
  
  // Handler cho tạo store mới
  const handleNewStore = async () => {
    const newStore = await get(`${NEW_STORE}`);

    if (newStore) {
      setStores(newStore);
    }
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={handleNewStore}>
          New Store
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={data}
        style={{ margin: "20px 0" }}
        pagination={{ pageSize: 6 }}
      />
    </>
  );
}

export default ListStore;
