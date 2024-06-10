import React, { useEffect, useState } from "react";
import { Row, Space, Table, Tag, Button } from "antd";
import { LIST_PRODUCT_DTOS } from "../../../helpers/APILinks";
import { get } from "../../../helpers/API.helper";
import CreateProduct from './CreateProduct';
import { FaPlus } from 'react-icons/fa';
import UpdateIsDelete from "./UpdateIsDelete";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

function ListProductAdmin() {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Set the default page size to 3
  });
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
    // divide page
    const handleTableChange = (pagination) => {
      setPagination(pagination);
    };
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
        return <img src={img} alt="product" style={{ width: 50, height: 50 }} />;
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
      render: (_, record) => {
        return (
          <Space size="middle">
            <UpdateIsDelete record={record} />
            <Link to={`/admin/manager-store/edit/${record.productId}`}>
              <Button type="primary" icon={<EditOutlined />} />
            </Link>
          </Space>
        );
      },
    },
  ];

  // data for table
  let data = [
    // {
    //   name: "Product 1",
    //   image:
    //     "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/anh-dep-thien-nhien-2-1.jpg",
    //   price: "$20",
    //   size: "M",
    //   discount: "10%",
    //   tag: { status: true, name: "hello" },
    //   action: ["Detail", "Delete", "Update"],
    // },
  ];
  // if data exist => give a new data
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button icon={<FaPlus />} type="primary" onClick={showModal}>
        New Product
      </Button>
      <CreateProduct isVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
      <Table columns={columns}
       dataSource={data && data.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize).map((account) => ({ ...account, key: account.accountId }))}
        pagination={{
          ...pagination,
          total: data.length,
        }}
      onChange={handleTableChange}
      />
    </>
  );
}

export default ListProductAdmin;
