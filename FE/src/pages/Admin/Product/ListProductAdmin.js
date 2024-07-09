import React, { useEffect, useState } from "react";
import { Row, Space, Table, Tag, Button, Modal } from "antd";
import { LIST_PRODUCT_DTOS, LIST_PRODUCT_SIZE } from "../../../helpers/APILinks";
import { get, put } from "../../../helpers/API.helper";
import CreateProduct from './CreateProduct';
import { FaPlus } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import UpdateIsDelete from "./UpdateIsDelete";

function ListProductAdmin() {
  const [filterIsDelete, setFilterIsDelete] = useState([]); // State to store selected status filters
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Set the default page size to 5
  });

  // Fetch data from API
  const fetchApi = async () => {
    try {
      const data = await get(LIST_PRODUCT_SIZE);
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.log("err in ListStore", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const onReload = () => {
    fetchApi();
  };

  const handleDelete = async (id) => {
    try {
      await put(`http://localhost:5264/api/ProductSizes/delete/${id}/1`);
      onReload();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const getFilteredData = () => {
    let filteredData = products;

    // Apply isDelete filter
    if (filterIsDelete.length > 0) {
      filteredData = filteredData.filter(
        (product) => product.isDelete === parseInt(filterIsDelete[0])
      );
    }

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter((product) =>
        Object.keys(product).some((key) =>
          String(product[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filteredData;
  };

  // Handle table change for pagination
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      sorter: (a, b) => a.productName.localeCompare(b.productName), // String comparison
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price, // Numeric comparison
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img) => {
        return <img src={img} alt="product" style={{ width: 50, height: 50 }} />;
      }
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName)
    },
    {
      title: "Size",
      dataIndex: "sizeName",
      key: "sizeName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity, // Numeric comparison
    },
    {
      title: "Delete",
      dataIndex: "isDelete",
      key: "isDelete",
      filters: [
        { text: 'Active', value: 0 },
        { text: 'Inactive', value: 1 },
      ],
      onFilter: (value, record) => record.isDelete === value,
      render: (isDelete, record) => {
        const isDeleteMap = {
          0: { text: "Active", color: "green" },
          1: { text: "Inactive", color: "red" },
        };

        const { text, color } = isDeleteMap[isDelete] || {
          text: "Unknown",
          color: "gray"
        };

        return <span style={{ color }}>{text}</span>;
      }
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Link to={`/admin/product/edit/${record.productSizeID}`} state={record}>
              <Button type="primary" icon={<EditOutlined />} />
            </Link>
            <UpdateIsDelete record={record} onReload={onReload} />
          </Space>
        );
      },
    },
  ];

  const filteredData = getFilteredData();

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
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200 }}
        />
      </Space>
      <CreateProduct isVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} onReload={onReload} />
      <Table
        columns={columns}
        dataSource={filteredData.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize).map((product) => ({ ...product, key: product.productSizeID }))}
        pagination={{
          ...pagination,
          total: filteredData.length,
        }}
        onChange={handleTableChange}
      />
    </>
  );
}

export default ListProductAdmin;
