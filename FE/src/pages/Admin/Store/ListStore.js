import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import {get} from '../../../helpers/API.helper'

function ListStore() {
  const [stores, setStores] = useState([]);

  // lấy qua API
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get("http://localhost:5264/api/stores");

        if (data) {
          setStores(data);
        }
      } catch (error) {
        console.log("err in ListStore", error);
        setStores([]);
      }
    };

    fetchApi();
  }, []);
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
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleUpdate(record)}>Update</Button>
          <Button type="default" onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    }

  ];

  let data = [];

  // Nếu có data từ api => tạo data cho Table
  if (stores.length > 0) {
    data = stores.map((store) => {
      return {
        "StoreID": store.storeId,
        "StoreName": store.storeName,
        "Location": store.location,
        "Email": store.email,
        "Status": store.status,
        key: store.storeId
      }
    });
  }
    // Handler for updating a store
    const handleUpdate = (record) => {
      console.log("Update", record);
      // Add your update logic here
    };
  
    // Handler for deleting a store
    const handleDelete = (record) => {
      console.log("Delete", record);
      // Add your delete logic here
    };

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default ListStore;
