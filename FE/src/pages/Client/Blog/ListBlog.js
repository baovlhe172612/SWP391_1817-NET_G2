import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Space, Table, Tag } from "antd";
import { get, patch } from "../../../helpers/API.helper";
import { DELETE_BLOG_ID, GET_BLOGS_STATUS, UP_BLOG_ID } from "../../../helpers/APILinks";
import Swal from "sweetalert2";
import Status from "../../../components/Mixin/Status/Status";
import Search from "antd/es/input/Search";

function ListBlog() {
  const [blogs, setBlogs] = useState([]);
  const [searchStatus] = useSearchParams();
  const [updated, setUpdated] = useState(false);
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
      dataIndex: "IsPublished",
      key: "IsPublished",
      render: (IsPublished) =>
        IsPublished == 1 ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (Status) =>
        Status == 1 ? <Tag color="green">Existing</Tag> : <Tag color="red">Deleted</Tag>,
    },
    {
      title: "Author",
      dataIndex: "Author",
      key: "Author",
    },
    {
      title: "CreatedDate",
      dataIndex: "CreatedDate",
      key: "CreatedDate",
    },
    {
      title: "ModifiDate",
      dataIndex: "ModifiDate",
      key: "ModifiDate",
    },
    {
      title: "Tags",
      dataIndex: "Tags",
      key: "Tags",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/Blog/update_post/${record.postId}`}>
            <Button type="primary">Update</Button>
          </Link>
          {record.Status == 1 && record.IsPublished !== 1 && (
            <Button type="primary" onClick={() => handlePost(record.postId)}>
              Post
            </Button>
          )}
          {record.Status == 1 ? (
            <Button type="primary" danger onClick={() => handleDelete(record.postId)}>
              Delete
            </Button>
          ) : (
            <Button type="primary" onClick={() => handleUndelete(record.postId)}>
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
      <Space>
        <Status handleStatus={handleStatus} />

        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Space>

      <Table
        columns={columns}
        dataSource={data}
        style={{ margin: "20px 0" }}
        pagination={{ pageSize: 6 }}
      />
    </>
  );
}

export default ListBlog;
