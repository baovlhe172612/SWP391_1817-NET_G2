import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { get } from "../../../helpers/API.helper";
import { Button, Col, Row, Container } from "react-bootstrap";
import "./Blog.css";
import { Badge } from "antd";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      const data = await get(`http://localhost:5264/api/Post/${id}`);
      setBlog(data);
      console.log(data);
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
          <Container className="h-100">
            <Row className="h-100 align-items-center">
              <Col>
                <div className="breadcrumb-item text-center">
                  <h2 className="breadcrumb-heading">Blog Detail</h2>
                  <ul className="breadcrumb-list">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <Link to="/blog">Blog</Link>
                    </li>
                    <li>{blog.title}</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="blog-detail-area section-space-y-axis-100">
          <Container>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <div className="blog-detail-content">
                  <h1 className="blog-detail-title">{blog.title}</h1>
                  <div className="blog-detail-meta d-flex justify-content-between">
                    <span className="author">By: {blog.author}</span>
                    <span className="date">{formatDate(blog.createdDate)}</span>
                  </div>
                  <div className="blog-detail-img">
                    <img src={blog.img} alt="Blog" className="img-fluid" />
                  </div>
                  <div className="blog-detail-text mt-4">{blog.contents}</div>
                  <div className="blog-detail-tags mt-4">
                    <h5>Tags:</h5>
                    <div color="blue">
                    {blog.tags}
                    </div>
                  </div>
                  <div className="back-to-blog text-center mt-5">
                    <Button variant="primary">
                      <Link to="/blog" className="text-white">Back to Blog</Link>
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
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

          .breadcrumb-list {
            list-style: none;
            padding: 0;
            display: flex;
            justify-content: center;
            color: #000;
          }

          .breadcrumb-list li {
            display: inline;
            color: #000;
            margin: 0 10px;
          }

          .breadcrumb-list li a {
            color: #000;
            text-decoration: none;
          }

          .blog-detail-area {
            padding: 50px 0;
          }

          .blog-detail-title {
            font-size: 36px;
            margin-bottom: 20px;
          }

          .blog-detail-meta {
            font-size: 16px;
            margin-bottom: 20px;
            color: #888;
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
          }

          .back-to-blog .btn {
            background-color: #007bff;
            border-color: #007bff;
          }
        `}
      </style>
    </>
  );
}

export default BlogDetail;
