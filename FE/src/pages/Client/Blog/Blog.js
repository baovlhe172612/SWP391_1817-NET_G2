import React, { useEffect, useState } from "react";
import { get, post } from "../../../helpers/API.helper"; // Giả sử bạn đã có phương thức POST trong API.helper
import "./Blog.css";
import { Button, Col, Input, Row } from "antd";
import { Link } from "react-router-dom";

function Blog() {
  const [Blog, setBlog ]= useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    contents: "",
    img: null,
  });

  useEffect(() => {
    const fetchApi = async () => {
      const data = await get("http://localhost:5264/api/Post");
      setBlog(data);
    };
    fetchApi();
  }, []);

  const handleInputChange = (e) => {
    console.log("e.target.name:", e.target.name);
    console.log("e.target.content:", e.target.value);
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewPost({ ...newPost, img: e.target.files[0] });
  };

  console.log("newposst", newPost);
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  console.log(Blog)

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

        {/* Form Đăng Trạng Thái */}
        <div className="container1">
          <div className="row mb-4">
            <div className="col-12">





              <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div className="form-group">
                      <p>Title:</p>
                      <Input
                        type="text"
                        name="title"
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Title"
                        required
                      />
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="form-group">
                      <p>Contents:</p>
                      <textarea
                        name="contents"
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="What's on your mind?"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="form-group">
                      <p>Image:</p>
                      <input
                        type="file"
                        name="img"
                        onChange={handleImageChange}
                        className="form-control-file"
                      />
                    </div>
                  </Col>
                  <Col
                    span={24}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button type="primary" htmlType="submit">
                      Đăng
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </div>

        <div className="blog-area section-space-y-axis-100">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4 order-2 pt-5 pt-lg-0">
                <div className="sidebar-area">
                  <div className="widgets-searchbox">
                    <form id="widgets-searchbox">
                      <input
                        className="input-field"
                        type="text"
                        placeholder="Search"
                      />
                      <button className="widgets-searchbox-btn" type="submit">
                        <i className="fa fa-search"></i>
                      </button>
                    </form>
                  </div>
                  <div className="widgets-area">
                    <div className="widgets-item pt-0">
                      <h2 className="widgets-title mb-4">Categories</h2>
                      <ul className="widgets-category">
                        <li>
                          <a href="#">
                            <i className="fa fa-chevron-right"></i>
                            All <span>(65)</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-chevron-right"></i>
                            Trà sữa <span>(12)</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-chevron-right"></i>
                            Cà Phê <span>(22)</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-chevron-right"></i>
                            Nước ép <span>(19)</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="widgets-item">
                      <h2 className="widgets-title mb-4">Recent Post</h2>
                      <div className="swiper-container widgets-list-slider">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div className="widgets-list-item">
                              <div className="widgets-list-img">
                                <a href="#">
                                  <img
                                    className="img-full"
                                    src="assets/images/blog/small-size/1-1-70x70.png"
                                    alt="Blog Images"
                                  />
                                </a>
                              </div>
                              <div className="widgets-list-content">
                                <div className="widgets-meta">
                                  <ul>
                                    <li className="date">24 April 2021</li>
                                  </ul>
                                </div>
                                <h2 className="title mb-0">
                                  <a href="#">Lorem ipsum dolo conse tetur.</a>
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="widgets-list-item">
                              <div className="widgets-list-img">
                                <a href="#">
                                  <img
                                    className="img-full"
                                    src="assets/images/blog/small-size/1-2-70x70.png"
                                    alt="Blog Images"
                                  />
                                </a>
                              </div>
                              <div className="widgets-list-content">
                                <div className="widgets-meta">
                                  <ul>
                                    <li className="date">24 April 2021</li>
                                  </ul>
                                </div>
                                <h2 className="title mb-0">
                                  <a href="#">Lorem ipsum dolo conse tetur.</a>
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="widgets-list-item">
                              <div className="widgets-list-img">
                                <a href="#">
                                  <img
                                    className="img-full"
                                    src="assets/images/blog/small-size/1-3-70x70.png"
                                    alt="Blog Images"
                                  />
                                </a>
                              </div>
                              <div className="widgets-list-content">
                                <div className="widgets-meta">
                                  <ul>
                                    <li className="date">24 April 2021</li>
                                  </ul>
                                </div>
                                <h2 className="title mb-0">
                                  <a href="#">Lorem ipsum dolo conse tetur.</a>
                                </h2>
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide without-border">
                            <div className="widgets-list-item">
                              <div className="widgets-list-img">
                                <a href="#">
                                  <img
                                    className="img-full"
                                    src="assets/images/blog/small-size/1-1-70x70.png"
                                    alt="Blog Images"
                                  />
                                </a>
                              </div>
                              <div className="widgets-list-content">
                                <div className="widgets-meta">
                                  <ul>
                                    <li className="date">24 April 2021</li>
                                  </ul>
                                </div>
                                <h2 className="title mb-0">
                                  <a href="#">Lorem ipsum dolo conse tetur.</a>
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="widgets-item">
                      <h2 className="widgets-title mb-4">Đồ uống phổ biến</h2>
                      <ul className="widgets-tag">
                        <li>
                          <a href="#">Fashion</a>
                        </li>
                        <li>
                          <a href="#">Organic</a>
                        </li>
                        <li>
                          <a href="#">Old Fashion</a>
                        </li>
                        <li>
                          <a href="#">Men</a>
                        </li>
                        <li>
                          <a href="#">Fashion</a>
                        </li>
                        <li>
                          <a href="#">Dress</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-9 col-lg-8 order-1">
                <div className="blog-item-wrap row g-y-30">
                  {Blog.map((item, index) => {
                    return (
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
                    );
                  })}
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
