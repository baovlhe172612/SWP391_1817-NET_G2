import React, { useEffect, useState } from "react";
import { Row, Space, Table, Tag } from "antd";
import { LIST_PRODUCT_DTOS } from "../../../helpers/APILinks";
import { get } from "../../../helpers/API.helper";
function ListProductAdmin() {
  const [products, setProducts] = useState([]);

  // lấy qua API
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(LIST_PRODUCT_DTOS);

        if (data) {
          console.log(data)
          setProducts(data);
        }
      } catch (error) {
        console.log("err in ListStore", error);
        setProducts([]);
      }
    };

    fetchApi();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "productName",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "img",
      dataIndex: "img",
      key: "img",
      render: (img) => {
        <><img src={img}/></>
      }
    },
    {
      title: "categoryName",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Delete",
      dataIndex: "isDelete",
      key: "isDelete",
      render: (isDelete) => (
        <>
          {isDelete == 0 ? (
            <Tag color="green">UnDelete</Tag>
          ) : (
            <Tag color="red">Deleted</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, records) => (
        <>
          <Space size="middle">
            {records.action.map((record) => (
              <a>{record}</a>
            ))}
          </Space>
        </>
      ),
    },
  ];

  let data = [
    {
      name: "Product 1",
      image:
        "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-dep-thien-nhien-2-1.jpg",
      price: "$20",
      size: "M",
      discount: "10%",
      tag: { status: true, name: "hello" },
      action: ["Detail", "Delete", "Update"],
    },
  ];
  if(products.length > 0) {
    data = products.map((product, index) => {
      return {
        "stt": index + 1,
        "productName": product.productName,
        "price" : product.price,
        "img": product.img,
        "categoryName": product.categoryName,
        "isDelete": product.isDelete,
        "action": ["Delete", "Update"]
      }
    })
  }

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default ListProductAdmin;
