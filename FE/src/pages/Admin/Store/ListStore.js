import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Space, Table, Tag } from "antd";
import { get, patch } from "../../../helpers/API.helper";
import { DELETE_STORE_ID, STORES_DTOS } from "../../../helpers/APILinks";
import Swal from "sweetalert2";

function ListStore() {
  const [stores, setStores] = useState([]);
  const [updated, setUpdated] = useState(false);

  // lấy qua API
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(STORES_DTOS);

        if (data) {
          setStores(data);
          console.log(data)
        }
      } catch (error) {
        console.log("err in ListStore", error);
        setStores([]);
      }
    };

    fetchApi();
  }, [updated]);

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
      title: "UserName",
      dataIndex: "UserName",
      key: "UserName",
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
            <Button
              type="primary"
            >Update</Button>
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

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default ListStore;
