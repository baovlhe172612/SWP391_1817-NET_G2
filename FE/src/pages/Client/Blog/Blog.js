import React, { useEffect, useState } from "react";
import { get, post } from "../../../helpers/API.helper";
import "./Blog.css";
import { Button, Col, Input, Row } from "antd";
import { Link } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    contents: "",
    img: null,
  });

  useEffect(() => {
    const fetchApi = async () => {
      const data = await get("http://localhost:5264/api/Post");
      setBlogs(data);
    };
    fetchApi();
  }, []);

 

  return (
    <>
      <div className="main-content">
        <div
          className="breadcrumb-area breadcrumb-height"
          data-bg-image="assets/images/breadcrumb/bg/1-1-1919x388.jpg"
        >
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-lg-12">
                <div className="breadcrumb-item">
                  <h2 className="breadcrumb-heading">Blog</h2>
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>Blog Grid View</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-area section-space-y-axis-100">
          <div className="container">
            <div className="row">
              
              <div className="col-xl-9 col-lg-8 order-1">
                <div className="blog-item-wrap row g-y-30">
                  {blogs.map((item, index) => (
                    <div key={index} className="col-md-6">
                      <div className="blog-item">
                        <div className="blog-content">
                          <div className="blog-meta">
                            <ul>
                              <li className="author">
                                <a href="#">
                                  <strong>By:</strong> {item.author}
                                </a>
                              </li>
                              <br />
                              <li className="date">{item.createdDate}</li>
                            </ul>
                          </div>
                          <div>
                            <h2 className="title" key={item.postId}>
                              <Link to={`/blog-detail/${item.postId}`}>
                                {item.title}
                              </Link>
                            </h2>
                          </div>
                          <p className="short-desc mb-7">{item.contents}</p>
                        </div>
                        <div className="blog-img img-hover-effect">
                          <a href="blog-detail.html">
                            <img
                              className="img-full"
                              src={item.img}
                              alt="Blog Image"
                            />
                          </a>
                          <div className="inner-btn-wrap">
                            <a className="inner-btn" href="blog-detail.html">
                              <i className="pe-7s-link"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pagination-area">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                          &raquo;
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
