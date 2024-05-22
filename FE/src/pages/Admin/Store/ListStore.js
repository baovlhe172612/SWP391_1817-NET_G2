import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import { get } from "../../../helpers/API.helper";

function ListStore() {
  const [stores, setStores] = useState([]);

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
      title: "Location",
      dataIndex: "Location",
      key: "Location",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
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
  ];
  let data = [];

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

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default ListStore;
