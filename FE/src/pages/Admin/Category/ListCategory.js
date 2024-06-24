import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Input } from "antd";
import { get, patch } from "../../../helpers/API.helper";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ListCategory() {
  const [Category, setCategory] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [updated, setUpdated] = useState(false); // Add a state to trigger re-fetch

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get("http://localhost:5264/api/Category");
        console.log(data);
        setCategory(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchApi();
  }, [updated]); // Add updated state to dependency array

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredCategories = Category.filter(category =>
    category.categoryName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Category ID",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "isDelete",
      dataIndex: "isDelete",
      key: "isDelete",
      render: (isDelete) => (
        <Tag color={isDelete ? "red" : "green"}>
          {isDelete ? "Deleted" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Link to={`edit/${record.categoryId}`}>
            <Button type="primary">Update</Button>
          </Link>
          <Button type="default" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = async (record) => {
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
      try {
        const dataDelete = await patch(
          `http://localhost:5264/api/Category/delete/${record.categoryId}`,
          {
            isDelete: 1,
          }
        );
        console.log("dataDelete: ", dataDelete);

        if (dataDelete) {
          Swal.fire({
            title: "Deleted!",
            text: "Your category has been marked as deleted.",
            icon: "success",
          });

          setUpdated(!updated); // Trigger re-fetch of data
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was an error marking the category as deleted.",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <Input
        placeholder="Search Category"
        value={searchText}
        onChange={handleSearch}
        style={{ width: 800, height: 30,  marginBottom: 20 }}
        
      />
      <Table columns={columns} dataSource={filteredCategories} rowKey="categoryId" />
    </>
  );
}

export default ListCategory;
