import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Space, Table, Tag } from "antd";
import { get, patch } from "../../../helpers/API.helper";
import {
  DELETE_STORE_ID,
  LIST_STORES,
} from "../../../helpers/APILinks";
import Swal from "sweetalert2";
import Status from "../../../components/Mixin/Status/Status";
import PaginationDesign from "../../../components/Mixin/Pagination/Pagination";

function ListStore() {
  const [stores, setStores] = useState([]);
  const [searchStatus] = useSearchParams();
  const [updated, setUpdated] = useState(false);

  // lấy qua API
  useEffect(() => {
    const fetchApi = async () => {
      try {
        let data = [];
        if (searchStatus.get("status")) {
          data = await get(`${LIST_STORES}?status=${searchStatus.get("status")}`);
        } else {
          data = await get(`${LIST_STORES}`);
        }

        console.log('hello')

        if (data) {
          setStores(data);
          console.log(data);
        }
      } catch (error) {
        console.log("err in ListStore", error);
        setStores([]);
      }
    };

    fetchApi();
  }, [updated, searchStatus]);

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
        status == 0 ? (
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
            <Button type="primary" ghost>Detail</Button>
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
    data = stores.map((store) => {
      return {
        StoreID: store.storeId,
        StoreName: store.storeName,
        Location: store.location,
        Email: store.email,
        UserName: store.userName,
        Status: store.isDelete,
        actions: store.storeId,
        key: store.storeId,
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

  // Handler for change status in  store
  const handleStatus = async (status) => {
    try {
      // truy vấn store
      const dataStore = await get(`${LIST_STORES}?status=${status}`);
      if (dataStore) {
        setStores(dataStore);
      }
    } catch (error) {}
  };

  return (
    <>
      <Status handleStatus={handleStatus} />
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ margin: "20px 0" }}
      />
      <PaginationDesign />
    </>
  );
}

export default ListStore;
