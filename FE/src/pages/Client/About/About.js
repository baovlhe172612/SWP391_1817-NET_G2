import React from "react";
import { StarOutlined } from '@ant-design/icons';

function About() {
  return (
    <>
      <style>
        {`
          .about-content {
            margin-bottom: 2rem;
          }

          .about-content.service{
            display: flex;
            flex-direction: row-reverse;
            text-align: right;
          }
          
          .about-title span {
            color: #e74c3c; /* Màu đỏ cho chữ span */
          }

          .about-desc {
            margin-bottom: 1rem;
          }

          .about-signature img {
            max-width: 100px;
          }

          .text-right {
            text-align: right;
          }

          .d-flex {
            display: flex;
          }

          .flex-column {
            flex-direction: column;
          }

          .align-items-end {
            align-items: flex-end;
          }
        `}
      </style>

      {/* <!-- Begin Main Content Area --> */}
      <main className="main-content">
        <div
          className="breadcrumb-area breadcrumb-height"
          data-bg-image="assets/images/breadcrumb/bg/1-1-1919x388.jpg"
        >
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-lg-12">
                <div className="breadcrumb-item">
                  <h1 className="breadcrumb-heading">About Us</h1>
                  <ul>
                    <li>
                      <a href="home">Home</a>
                    </li>
                    <li>About Us</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-area section-space-top-95">
          <div className="container">
            <div className="row">
              <div className="about-content ogin">
                <div className="col-lg-6">
                  <h2 className="about-title">
                    Nguồn <span>Gốc</span>
                  </h2>
                  <p className="about-desc">
                    CÂU CHUYỆN NÀY LÀ CỦA CHÚNG MÌNH <br />
                    Highlands Coffee® được thành lập vào năm 1999, bắt nguồn từ
                    tình yêu dành cho đất Việt cùng với cà phê và cộng đồng nơi
                    đây. Ngay từ những ngày đầu tiên, mục tiêu của chúng mình là
                    có thể phục vụ và góp phần phát triển cộng đồng bằng cách
                    siết chặt thêm sự kết nối và sự gắn bó giữa người với người.
                  </p>
                </div>
              </div>

              <div className="about-content service">
                <div className="col-lg-6">
                  <h2 className="about-title">
                    Dịch <span>Vụ</span>
                  </h2>
                  <p className="about-desc">
                    DỊCH VỤ NÀY LÀ CỦA CHÚNG MÌNH
                    <br />
                    Highlands Coffee® là không gian của chúng mình nên mọi thứ ở
                    đây đều vì sự thoải mái của chúng mình. Đừng giữ trong lòng,
                    hãy chia sẻ với chúng mình điều bạn mong muốn để cùng nhau
                    giúp Highlands Coffee® trở nên tuyệt vời hơn.
                  </p>
                </div>
              </div>

              <div className="about-content chance">
                <div className="col-lg-6">
                  <h2 className="about-title">
                    Cơ <span>Hội</span>
                  </h2>
                  <p className="about-desc">
                    CƠ HỘI NÀY LÀ CỦA CHÚNG MÌNH
                    <br />
                    Là điểm hội tụ của cộng đồng, Highlands Coffee® luôn tìm
                    kiếm những thành viên mới với mong muốn không ngừng hoàn
                    thiện một không gian dành cho tất cả mọi người. Chúng mình
                    luôn chào đón bạn trở thành một phần của Highlands Coffee®
                    để cùng nhau siết chặt thêm những kết nối và sự gắn bó giữa
                    người với người.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Begin Shipping Area --> */}
        <div className="shipping-area section-space-y-axis-100">
          <div className="container">
            <div className="shipping-bg">
              <div className="row shipping-wrap">
                <div className="col-lg-4 col-md-6">
                  <div className="shipping-item">
                    <div className="shipping-img">
                      <img
                        src="assets/images/shipping/icon/car.png"
                        alt="Shipping Icon"
                      />
                    </div>
                    <div className="shipping-content">
                      <h2 className="title">Miễn Phí Vận Chuyển</h2>
                      <p className="short-desc mb-0">Giới Hạn 200.000VNĐ</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                  <div className="shipping-item">
                    <div className="shipping-img">
                      <img
                        src="assets/images/shipping/icon/card.png"
                        alt="Shipping Icon"
                      />
                    </div>
                    <div className="shipping-content">
                      <h2 className="title">Dễ Dàng Thanh Toán</h2>
                      <p className="short-desc mb-0">Nhận Mọi Phương Thức</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                  <div className="shipping-item">
                    <div className="shipping-img">
                      <img
                        src="assets/images/shipping/icon/service.png"
                        alt="Shipping Icon"
                      />
                    </div>
                    <div className="shipping-content">
                      <h2 className="title">Trải Nghiệm Tốt Nhất</h2>
                      <p className="short-desc mb-0">
                        Thân Thiện Và Chất Lượng
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Shipping Area End Here --> */}

        {/* <!-- Begin Banner Area --> */}
        <div className="banner-with-counter">
          <div className="banner-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="banner-boxshadow">
                    <div
                      className="banner-item"
                      data-bg-image="assets/images/banner/3-1-1208x542.jpg"
                    >
                      <div className="popup-btn">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/b6O-8VzZzW4?si=uNmkqq0qgfVYaZor"
                          frameborder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>

                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="counter-area">
            <div className="container">
              <h2 className="counter-title">
              Chúng tôi không cam kết bán hàng rẻ nhất,<br/>
                nhưng chúng tôi cam hết bán hàng chất lượng nhất !
               
              </h2>
              <div className="row">
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="counter-item">
                    <div className="count-wrap">
                      <h3 className="count mb-0" data-counterup-time="500">
                        100
                      </h3>
                      <span className="prefix">+</span>
                    </div>
                    <h4 className="count-title mb-0">Sản Phẩm</h4>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="counter-item">
                    <div className="count-wrap">
                      <h3 className="count mb-0" data-counterup-time="1000">
                        1000
                      </h3>
                      <span className="prefix">+</span>
                    </div>
                    <h4 className="count-title mb-0">Đơn Hàng</h4>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6 pt-4 pt-md-0">
                  <div className="counter-item">
                    <div className="count-wrap">
                      <h3 className="count mb-0" data-counterup-time="1500">
                        4.9/5 <StarOutlined />
                      </h3>
                    </div>
                    <h4 className="count-title mb-0">Đánh Giá</h4>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6 pt-4 pt-lg-0">
                  <div className="counter-item">
                    <div className="count-wrap">
                      <h3 className="count mb-0" data-counterup-time="2000">
                        70
                      </h3>
                      <span className="prefix">+</span>
                    </div>
                    <h4 className="count-title mb-0">Giải Thưởng</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Banner Area End Here --> */}

        {/* <!-- Brand Area End Here --> */}
      </main>
      {/* <!-- Main Content Area End Here --> */}
    </>
  );
}

export default About;
