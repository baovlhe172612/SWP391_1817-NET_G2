import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input, Space, Table, Tag } from "antd";
import { get, patch } from "../../../helpers/API.helper";
import { DELETE_BLOG_ID, GET_BLOGS_STATUS, LOCALHOST_API, UP_BLOG_ID } from "../../../helpers/APILinks";
import Swal from "sweetalert2";
import Search from "antd/es/input/Search";
import { useSelector } from "react-redux";

function ListBlog() {
  const [blogs, setBlogs] = useState([]);
  const [searchStatus] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [updated, setUpdated] = useState(false);
  const [filterStatus, setFilterStatus] = useState([]); // State to store selected status filters
  const [filterIsPublished, setFilterIsPublished] = useState([]); // State to store selected isDelete filters
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term 

  const navigate = useNavigate();
  let status = searchStatus.get(`status`);
  status = status === "active" ? 1 : status === "inactive" ? 0 : 1;
  const account = useSelector(state => state.AccountReducer);
  let data = [];

  // Fetch data from API
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`${LOCALHOST_API}/api/Post`);
        const dataFilter = data.filter(item => item.storeId == account.storeId)
        console.log(dataFilter);
        if (dataFilter) {
          setBlogs(dataFilter);
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
    data = blogs.map((Blog, index) => ({
      postId: Blog.postId,
      title: Blog.title,
      Contents: Blog.contents,
      Img: Blog.img,
      isPublished: Blog.isPublished,
      status: Blog.status,
      author: Blog.author,
      tags: Blog.tags,
      createdDate: Blog.createdDate,
      modifiDate: Blog.modifiDate,
      key: index,
    }));
  }

  const getFilteredData = () => {
    let filteredData = blogs;

    // Apply status filter
    if (filterStatus.length > 0) {
      filteredData = filteredData.filter((blog) => filterStatus.includes(blog.status));
    }

    // Apply isPublished filter
    if (filterIsPublished.length > 0) {
      filteredData = filteredData.filter((blog) => filterIsPublished.includes(blog.isPublished));
    }

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter((blog) =>
        Object.keys(blog).some((key) =>
          String(blog[key]).toLowerCase().includes(searchTerm.toLowerCase())
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
        isPublished === 1 ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
      filters: [
        { text: "Active", value: 1 },
        { text: "Inactive", value: 0 },
      ],
      onFilter: (value, record) => record.isPublished === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === 1 ? (
          <Tag color="green">Existing</Tag>
        ) : (
          <Tag color="red">Deleted</Tag>
        ),
      filters: [
        { text: "Existing", value: 1 },
        { text: "Deleted", value: 0 },
      ],
      onFilter: (value, record) => {
        return record.status == value
      },
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
          {record.status === 1 && record.isPublished !== 1 && (
            <Button type="primary" onClick={() => handlePost(record.postId)}>
              Post
            </Button>
          )}
          {record.status === 1 ? (
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
        data = await get(`${LOCALHOST_API}/api/Post`);
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
    setSearchTerm(e.target.value); // Set search term for filtering
  };

  return (
    <>
     <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search"
          onChange={handleSearch}
          style={{ width: 200 }}
        />
      </Space>
      
      <Table
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={getFilteredData()}
        rowKey="title"
      />
    </>
  );
}

export default ListBlog;
