import React, { useEffect, useState } from "react";
import { useParams, Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { get } from "../../../helpers/API.helper";
import { Button, Col, Row } from "antd";
import "./Blog.css";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      const data = await get(`http://localhost:5264/api/Post/${id}`);
      setBlog(data);
    };
    fetchBlogDetail();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="main-content">
        <div className="breadcrumb-area breadcrumb-height" data-bg-image="assets/images/breadcrumb/bg/1-1-1919x388.jpg">
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-lg-12">
                <div className="breadcrumb-item">
                  <h2 className="breadcrumb-heading">Blog Detail</h2>
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <Link to="/blog">Blog</Link>
                    </li>
                    <li>{blog.title}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-detail-area section-space-y-axis-100">
          <div className="container">
            <div className="row">
              <Col span={24}>
                <div className="blog-detail-content">
                  <h1 className="blog-detail-title">{blog.title}</h1>
                  <div className="blog-detail-meta">
                    <span className="author">By: {blog.author}</span>
                    <span className="date">{formatDate(blog.createdDate)}</span>
                  </div>
                  <div className="blog-detail-img">
                    <img src={blog.img} alt="Blog" />
                  </div>
                  <div className="blog-detail-text">{blog.contents}</div>
                </div>
              </Col>
            </div>
            <div className="row">
              <Col span={24}>
                <div className="back-to-blog">
                  <Button type="primary">
                    <Link to="/blog">Back to Blog</Link>
                  </Button>
                </div>
              </Col>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .main-content {
            padding: 20px;
          }

          .breadcrumb-area {
            background-size: cover;
            background-position: center center;
            padding: 100px 0;
            text-align: center;
          }

          .breadcrumb-heading {
            color: #fff;
            font-size: 48px;
            font-weight: bold;
          }

          .breadcrumb-item ul {
            list-style: none;
            padding: 0;
          }

          .breadcrumb-item ul li {
            display: inline;
            color: #fff;
            margin: 0 10px;
          }

          .breadcrumb-item ul li a {
            color: #fff;
            text-decoration: none;
          }

          .blog-area {
            padding: 50px 0;
          }

          .blog-item-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
          }

          .blog-item {
            border: 1px solid #ddd;
            border-radius: 5px;
            overflow: hidden;
            background: #fff;
          }

          .blog-content {
            padding: 20px;
          }

          .blog-meta {
            margin-bottom: 10px;
          }

          .blog-meta ul {
            list-style: none;
            padding: 0;
          }

          .blog-meta ul li {
            display: inline;
            color: #888;
            margin-right: 10px;
          }

          .blog-img {
            position: relative;
          }

          .blog-img img {
            width: 100%;
            display: block;
          }

          .inner-btn-wrap {
            position: absolute;
            top: 10px;
            right: 10px;
          }

          .inner-btn {
            background: rgba(0, 0, 0, 0.6);
            padding: 10px;
            border-radius: 50%;
            color: #fff;
          }

          .pagination-area {
            margin-top: 20px;
            text-align: right;
          }

          .pagination .page-link {
            color: #007bff;
          }

          .pagination .page-item.active .page-link {
            background-color: #007bff;
            border-color: #007bff;
            color: #fff;
          }

          .blog-detail-area {
            padding: 50px 0;
          }

          .blog-detail-content {
            text-align: center;
          }

          .blog-detail-title {
            font-size: 36px;
            margin-bottom: 20px;
          }

          .blog-detail-meta {
            font-size: 16px;
            margin-bottom: 20px;
            color: #888;
            display: flex;
            justify-content: space-between;
          }

          .blog-detail-meta .author {
            text-align: left;
          }

          .blog-detail-meta .date {
            text-align: right;
          }

          .blog-detail-img img {
            width: 100%;
            max-width: 800px;
            margin-bottom: 30px;
          }

          .blog-detail-text {
            font-size: 18px;
            line-height: 1.6;
            text-align: left;
            margin: 0 auto;
            max-width: 800px;
          }

          .back-to-blog {
            margin-top: 30px;
            text-align: center;
          }
        `}
      </style>
    </>
  );
}

export default BlogDetail;
