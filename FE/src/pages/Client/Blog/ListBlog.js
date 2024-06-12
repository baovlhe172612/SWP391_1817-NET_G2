import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Space, Table, Tag } from "antd";
import { get, patch } from "../../../helpers/API.helper";
import {
  DELETE_BLOG_ID,
  GET_BLOGS_STATUS,
  LIST_BLOGS,
  SEARCH_BLOG,
} from "../../../helpers/APILinks";
import Swal from "sweetalert2";
import Status from "../../../components/Mixin/Status/Status";
import Search from "antd/es/input/Search";

function ListBlog() {
  const [Blogs, setBlogs] = useState([]);
  const [searchStatus] = useSearchParams();
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();
  let status = searchStatus.get(`status`);
  status = status === "active" ? 1 : status === "inactive" ? 0 : 1;

  // lấy qua API
  useEffect(() => {
    const fetchApi = async () => {
      try {
        console.log(status);
        const data = await get(`${GET_BLOGS_STATUS}/${status}`);

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

  // COLUMS
  const columns = [
    {
      title: "BlogID",
      dataIndex: "BlogID",
      key: "BlogID",
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Contents",
      dataIndex: "Contents",
      key: "Contents",
    },
    {
      title: "Image",
      dataIndex: "Img",
      key: "Img",
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
      title: "Tags",
      dataIndex: "Tags",
      key: "Tags",
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
      render: (BlogId) => (
        <Space size="middle">
          <Link to={`/admin/Blog/edit/${BlogId}`}>
            <Button type="primary">Edit</Button>
          </Link>
          <Link to={`/admin/Blog/edit/${BlogId}`}>
            <Button type="primary" ghost>
              Detail
            </Button>
          </Link>
          <Button type="primary" danger onClick={() => handleDelete(BlogId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // DATA
  let data = [];

  // Nếu có data từ api => tạo data cho Table
  if (Blogs.length > 0) {
    data = Blogs.map((Blog, index) => {
      return {
        BlogID: Blog.BlogId,
        BlogName: Blog.BlogName,
        Location: Blog.location,
        Email: Blog.email,
        UserName: Blog.userName,
        Status: Blog.status,
        actions: Blog.BlogId,
        key: index,
      };
    });
  }
  // Handler for deleting a Blog
  const handleDelete = async (BlogId) => {
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
      console.log(`${DELETE_BLOG_ID}${BlogId}`);
      const dataDelete = await patch(`${DELETE_BLOG_ID}${BlogId}`, {
        BlogId: BlogId,
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
        data = await get(`${SEARCH_BLOG}?name=${values}`);
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
