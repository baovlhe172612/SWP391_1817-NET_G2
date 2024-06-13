import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Space, Table, Tag } from "antd";
import { get, patch } from "../../../helpers/API.helper";
import {
  DELETE_STORE_ID,
  GET_STORES_STATUS,
  LIST_STORES,
  NEW_STORE,
  SEARCH_STORE,
} from "../../../helpers/APILinks";
import Swal from "sweetalert2";
import Status from "../../../components/Mixin/Status/Status";
import Search from "antd/es/input/Search";

function ListStore() {
  const [stores, setStores] = useState([]);
  const [searchStatus] = useSearchParams();
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();
  let status = searchStatus.get(`status`);
  status = status === "active" ? 1 : status === "inactive" ? 0 : 1;

  // lấy qua API
  useEffect(() => {
    const fetchApi = async () => {
      try {
        console.log(status);
        const data = await get(`${GET_STORES_STATUS}/${status}`);

        if (data) {
          setStores(data);
        }
      } catch (error) {
        console.log("err in ListStore", error);
        setStores([]);
      }
    };

    fetchApi();
  }, [updated, searchStatus, status]);

  // COLUMS
  const columns = [
    {
      title: "StoreID",
      dataIndex: "StoreID",
      key: "nStoreIDame",
    },
    {
      title: "StoreName",
      dataIndex: "StoreName",
      key: "StoreName",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (status) =>
        status == 1 ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (storeId) => (
        <Space size="middle">
          <Link to={`/admin/store/edit/${storeId}`}>
            <Button type="primary">Edit</Button>
          </Link>
          <Link to={`/admin/store/edit/${storeId}`}>
            <Button type="primary" ghost>
              Detail
            </Button>
          </Link>
          <Button type="primary" danger onClick={() => handleDelete(storeId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // DATA
  let data = [];

  // Nếu có data từ api => tạo data cho Table
  if (stores.length > 0) {
    data = stores.map((store, index) => {
      return {
        StoreID: store.storeId,
        StoreName: store.storeName,
        Location: store.location,
        Email: store.email,
        UserName: store.userName,
        Status: store.status,
        actions: store.storeId,
        key: index,
      };
    });
  }
  // Handler for deleting a store
  const handleDelete = async (storeId) => {
    // bởi vì Swal là file đợi => phải có await mới được
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
      console.log(`${DELETE_STORE_ID}${storeId}`);
      const dataDelete = await patch(`${DELETE_STORE_ID}${storeId}`, {
        storeId: storeId,
      });

      if (dataDelete) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        // load lại data
        setUpdated(!updated);
      }
    }
  };

  const handleStatus = (changeStores) => {
    setStores(changeStores);
  };

  // search
  const onSearch = async (values) => {
    try {
      let data = [];
      if (values) {
        data = await get(`${SEARCH_STORE}?name=${values}`);
      } else {
        data = await get(`${GET_STORES_STATUS}/${status}`);
      }

      setStores(data);
    } catch (error) {
      console.log(error, `ListStore`);
      setStores([]);
    }
  };

  const handleNewStore = async () => {
    const newStore = await get(`${NEW_STORE}`);

    if(newStore) {
      setStores(newStore)
    }
  }

  return (
    <>
      <Space>
        <Status handleStatus={handleStatus} />

        <Button type="primary" onClick={handleNewStore}>New Store</Button>

        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
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
