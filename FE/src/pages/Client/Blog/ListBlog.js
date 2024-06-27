import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input, Space, Table, Tag } from "antd";
import { get, patch } from "../../../helpers/API.helper";
import {
  DELETE_BLOG_ID,
  GET_BLOGS_STATUS,
  UP_BLOG_ID,
} from "../../../helpers/APILinks";
import Swal from "sweetalert2";
import Search from "antd/es/input/Search";

function ListBlog() {
  const [blogs, setBlogs] = useState([]);
  const [searchStatus] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [updated, setUpdated] = useState(false);
  const [filterStatus, setFilterStatus] = useState([]); // State to store selected status filters
  const [filterIsDelete, setFilterIsDelete] = useState([]); // State to store selected isDelete filters
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term 

  const navigate = useNavigate();
  let status = searchStatus.get(`status`);
  status = status === "active" ? 1 : status === "inactive" ? 0 : 1;

  let data = [];

  // Fetch data from API
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`http://localhost:5264/api/Post`);
        console.log(data);
        if (data) {
          setBlogs(data);
        }
      } catch (error) {
        console.log("err in ListBlog", error);
        setBlogs([]);
      }
    };

    fetchApi();
  }, [updated, searchStatus, status]);

  // Prepare data for Table
  if (blogs.length > 0) {
    data = blogs.map((Blog, index) => {
      return {
        postId: Blog.postId,
        title: Blog.title,
        Contents: Blog.contents,
        Img: Blog.img,
        IsPublished: Blog.isPublished,
        Status: Blog.status,
        Author: Blog.author,
        Tags: Blog.tags,
        CreatedDate: Blog.createdDate,
        ModifiDate: Blog.modifiDate,
        key: index,
      };
    });
  }
  const getFilteredData = () => {
    let filteredData = blogs;

    // Apply status filter
    if (filterStatus.length > 0) {
      const statusMap = {
        active: 1,
        inactive: 0,
      };
      filteredData = filteredData.filter(
        (blog) => blog.status === statusMap[filterStatus[0]]
      );
    }

    // Apply isDelete filter
    if (filterIsDelete.length > 0) {
      filteredData = filteredData.filter(
        (blog) => blog.isDelete === parseInt(filterIsDelete[0])
      );
    }

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter((blogs) =>
        Object.keys(blogs).some((key) =>
          String(blogs[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filteredData;
  };

  // Define Table columns
  const columns = [
    {
      title: "postId",
      dataIndex: "postId",
      key: "postId",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "IsPublished",
      dataIndex: "isPublished",
      key: "isPublished",
      render: (isPublished) =>
        isPublished == 1 ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
      sorter: (a, b) => a.isPublished - b.isPublished,
      filters: [
        { text: 'Active', value: 1 },
        { text: 'Inactive', value: 0 },
      ],
      onFilter: (value, record) => record.isPublished === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status == 1 ? (
          <Tag color="green">Existing</Tag>
        ) : (
          <Tag color="red">Deleted</Tag>
        ),
      sorter: (a, b) => a.Status - b.Status,
      filters: [
        { text: 'Existing', value: 1 },
        { text: 'Deleted', value: 0 },
      ],
      onFilter: (value, record) => record.Status === value,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "CreatedDate",
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate),
    },
    {
      title: "ModifiDate",
      dataIndex: "modifiDate",
      key: "modifiDate",
      sorter: (a, b) => new Date(a.modifiDate) - new Date(b.modifiDate),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`edit/${record.postId}`}>
            <Button type="primary">Update</Button>
          </Link>
          {record.Status == 1 && record.IsPublished != 1 && (
            <Button type="primary" onClick={() => handlePost(record.postId)}>
              Post
            </Button>
          )}
          {record.Status == 1 ? (
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(record.postId)}
            >
              Delete
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => handleUndelete(record.postId)}
            >
              Undelete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // Handle post action
  const handlePost = async (postId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, post it!",
    });

    if (confirm.isConfirmed) {
      const dataPost = await patch(`${UP_BLOG_ID}${postId}`, {
        postId: postId,
        status: 1, // Assuming status 1 indicates "Posted"
      });

      if (dataPost) {
        Swal.fire({
          title: "Posted!",
          text: "Your file has been posted.",
          icon: "success",
        });

        setUpdated(!updated);
      }
    }
  };
  const filterBlogs = async (status) => {
    try {
      let data = [];
      if (status !== "") {
        data = await get(`${GET_BLOGS_STATUS}/${status}`);
      } else {
        data = await get(`http://localhost:5264/api/Post`);
      }
      setBlogs(data);
    } catch (error) {
      console.log("Error filtering blogs:", error);
      setBlogs([]);
    }
  };
  const handleStatusChange = (value) => {
    setSelectedStatus(value); // Lưu trữ giá trị status đã chọn
    filterBlogs(value); // Gọi hàm lọc bài viết khi status thay đổi
  };
  // Handle delete action
  const handleDelete = async (postId) => {
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
      const dataDelete = await patch(`${DELETE_BLOG_ID}${postId}`, {
        postId: postId,
        status: 0, // Assuming status 0 indicates "Deleted"
      });

      if (dataDelete) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        setUpdated(!updated);
      }
    }
  };

  // Handle undelete action
  const handleUndelete = async (postId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to undelete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, undelete it!",
    });

    if (confirm.isConfirmed) {
      const dataUndelete = await patch(`${DELETE_BLOG_ID}${postId}`, {
        postId: postId,
        status: 1, // Assuming status 1 indicates "Existing"
      });

      if (dataUndelete) {
        Swal.fire({
          title: "Undeleted!",
          text: "Your file has been undeleted.",
          icon: "success",
        });

        setUpdated(!updated);
      }
    }
  };
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  const filteredTitle = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchText.toLowerCase())
  );
  // Handle status change
  const handleStatus = (changeBlogs) => {
    setBlogs(changeBlogs);
  };

  // Handle search
  const onSearch = async (values) => {
    try {
      let data = [];
      if (values) {
        // Handle search logic
      } else {
        // Fetch data by status
        data = await get(`${GET_BLOGS_STATUS}/${status}`);
      }

      setBlogs(data);
    } catch (error) {
      console.log(error, `ListBlog`);
      setBlogs([]);
    }
  };

  return (
    <>
      <Input
        placeholder="Search Title"
        value={searchText}
        onChange={handleSearch}
        style={{ width: 800, height: 30, marginBottom: 20 }}
      />
      <Table columns={columns} pagination={{ pageSize: 5 }} dataSource={getFilteredData()} rowKey="title" />
    </>
  );
}

export default ListBlog;
