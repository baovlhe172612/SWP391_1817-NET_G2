import React from "react";
import { Space, Table, Tag } from "antd";
function ListProductAdmin() {
  // lấy qua API
  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>, // custom text
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} />, // custom text
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "tag",
      dataIndex: "tag",
      key: "tag",
      render: (_, tag) => (
        <>
          {tag.tag.status ? (
            <Tag color="green">{tag.tag.name}</Tag>
          ) : (
            <Tag color="red">{tag.name}</Tag>
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

  const data = [
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
    {
      name: "Product 2",
      image:
        "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-dep-thien-nhien-2-1.jpg",
      price: "$30",
      size: "L",
      discount: "15%",
      tag: { status: false, name: "hello2" },
      action: ["Detail", "Delete", "Update"],
    },
    {
      name: "Product 3",
      image:
        "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-dep-thien-nhien-2-1.jpg",
      price: "$25",
      size: "S",
      discount: "5%",
      tag: { status: true, name: "hello234" },
      action: ["Detail", "Delete", "Update"],
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default ListProductAdmin;
