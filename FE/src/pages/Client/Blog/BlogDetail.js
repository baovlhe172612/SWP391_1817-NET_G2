import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Space, Table, Tag } from "antd";
import { get, patch } from "../../../helpers/API.helper";
import {
  DELETE_BLOG_ID,
  GET_BLOGS_STATUS,
  LIST_BLOGS,
} from "../../../helpers/APILinks";
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

  // lấy qua API
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`http://172.20.10.5:5264/api/Post`);
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

  if (blogs.length > 0) {
    data = blogs.map((Blog, index) => {
      return {
        postId: Blog.postId,
        title: Blog.title,
        Contents: Blog.contents,
        Img: Blog.img,
        IsPublished: Blog.isPublished,
        IsNewFeed: Blog.isNewFeed,
        IsDelete: Blog.isDelete,
        Author: Blog.author,
        Tags: Blog.tags,
        CreatedDate: Blog.createdDate,
        ModifiDate: Blog.modifiDate,
        key: index,
      };
    });
  }

  // COLUMS
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
      render: (status) =>
        status == 1 ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "IsNewFeed",
      dataIndex: "IsNewFeed",
      key: "IsNewFeed",
      render: (status) =>
        status == 1 ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "IsDelete",
      dataIndex: "IsDelete",
      key: "IsDelete",
      render: (status) =>
        status == 1 ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
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
          <Link to={`/admin/Blog/edit/${record.postId}`}>
            <Button type="primary">Edit</Button>
          </Link>
          <Link to={`/admin/Blog/edit/${record.postId}`}>
            <Button type="primary" ghost>
              Detail
            </Button>
          </Link>
          <Button type="primary" danger onClick={() => handleDelete(record.postId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // DATA

  // Handler for deleting a Blog
  const handleDelete = async (postId) => {
    // bởi vì Swal là file đợi => phải có await mới được
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
      console.log(`${DELETE_BLOG_ID}${postId}`);
      const dataDelete = await patch(`${DELETE_BLOG_ID}${postId}`, {
        postId: postId,
      });

      if (dataDelete) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        // load lại data
        setUpdated(!updated);
      }
    }
  };

  const handleStatus = (changeBlogs) => {
    setBlogs(changeBlogs);
  };

  // search
  const onSearch = async (values) => {
    try {
      let data = [];
      if (values) {
      } else {
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
