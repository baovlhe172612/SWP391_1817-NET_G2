import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Row, Space, Table, Tag, Button, Modal, Input } from "antd";
import { LIST_PRODUCT_DTOS, LIST_PRODUCT_SIZE, LOCALHOST_API } from "../../../helpers/APILinks";
import { get, put } from "../../../helpers/API.helper";
import CreateProduct from './CreateProduct';
import { FaPlus } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateIsDelete from "./UpdateIsDelete";

const { Search } = Input;

function ListProductAdmin() {
  const [state, setState] = useState({
    filterIsDelete: [],
    searchTerm: "",
    products: [],
    isModalVisible: false,
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const fetchApi = useCallback(async () => {
    try {
      const data = await get(LIST_PRODUCT_SIZE);
      if (data) {
        setState((prevState) => ({ ...prevState, products: data }));
      }
    } catch (error) {
      console.log("Error in ListStore", error);
      setState((prevState) => ({ ...prevState, products: [] }));
    }
  }, []);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const onReload = useCallback(() => {
    fetchApi();
  }, [fetchApi]);

  const handleDelete = useCallback(async (id) => {
    try {
      await put(`${LOCALHOST_API}/api/ProductSizes/delete/${id}/1`);
      onReload();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  }, [onReload]);

  const handleTableChange = (pagination) => {
    setState((prevState) => ({ ...prevState, pagination }));
  };

  const getFilteredData = useCallback(() => {
    const { products, filterIsDelete, searchTerm } = state;
    let filteredData = products;

    if (filterIsDelete.length > 0) {
      filteredData = filteredData.filter((product) => product.isDelete === parseInt(filterIsDelete[0]));
    }

    if (searchTerm) {
      filteredData = filteredData.filter((product) =>
        Object.keys(product).some((key) => String(product[key]).toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filteredData;
  }, [state]);

  const columns = useMemo(() => [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_, __, index) => (state.pagination.current - 1) * state.pagination.pageSize + index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      sorter: (a, b) => a.productName.localeCompare(b.productName),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img) => <img src={img} alt="product" style={{ width: 50, height: 50 }} />,
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
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
      sorter: (a, b) => a.quantity - b.quantity,
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
      render: (isDelete) => {
        const statusMap = {
          0: { text: "Active", color: "green" },
          1: { text: "Inactive", color: "red" },
        };
        const { text, color } = statusMap[isDelete] || { text: "Unknown", color: "gray" };
        return <span style={{ color }}>{text}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/product/edit/${record.productSizeID}`} state={record}>
            <Button type="primary" icon={<EditOutlined />} />
          </Link>
          <UpdateIsDelete record={record} onReload={onReload} />
        </Space>
      ),
    },
  ], [state.pagination.current, state.pagination.pageSize, onReload]);

  const filteredData = useMemo(() => getFilteredData(), [getFilteredData]);

  const showModal = useCallback(() => {
    setState((prevState) => ({ ...prevState, isModalVisible: true }));
  }, []);

  const handleOk = useCallback(() => {
    setState((prevState) => ({ ...prevState, isModalVisible: false }));
  }, []);

  const handleCancel = useCallback(() => {
    setState((prevState) => ({ ...prevState, isModalVisible: false }));
  }, []);

  return (
    <>
      <Button icon={<FaPlus />} type="primary" onClick={showModal}>
        New Product
      </Button>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search"
          onChange={(e) => setState((prevState) => ({ ...prevState, searchTerm: e.target.value }))}
          style={{ width: 200 }}
        />
      </Space>
      <CreateProduct isVisible={state.isModalVisible} handleOk={handleOk} handleCancel={handleCancel} onReload={onReload} />
      <Table
        columns={columns}
        dataSource={filteredData.slice((state.pagination.current - 1) * state.pagination.pageSize, state.pagination.current * state.pagination.pageSize).map((product) => ({ ...product, key: product.productSizeID }))}
        pagination={{ ...state.pagination, total: filteredData.length }}
        onChange={handleTableChange}
      />
    </>
  );
}

export default ListProductAdmin;
