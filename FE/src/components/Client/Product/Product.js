import { Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Product(props) {
  const { product } = props;
  console.log(props)

  return (
    <>
      {product ? (
        <>
          {/* <Col sm={8} > //</>class="col-xl-3 col-md-4 col-sm-3" > */}
          <Col span={12} >
            <div class="product-item">
              <div class="product-img">
                <Link
                  to={`/productDetail?productId=${product.productId
                    }&sizeId=${1}&categoryId=${product.categoryId}`}
                >
                  <img
                    class="primary-img"
                    src={product.img}
                    alt="Product Images"
                  // style={{height: "50%", width: "50%"}}
                  />
                </Link>
                <div class="product-add-action">
                  <ul>
                    <li>
                      <a
                        data-tippy="Add to wishlist"
                        data-tippy-inertia="true"
                        data-tippy-animation="shift-away"
                        data-tippy-delay="50"
                        data-tippy-arrow="true"
                        data-tippy-theme="sharpborder"
                      >
                        <i class="pe-7s-like"></i>
                      </a>
                    </li>

                    <li>
                      <Link
                        to={`/productDetail?productId=${product.productId
                          }&sizeId=${1}&categoryId=${product.categoryId}`}
                      >
                        <i class="pe-7s-look"></i>
                      </Link>
                    </li>
                    {/* <li>
                      <a
                        href="cart.html"
                        data-tippy="Add to cart"
                        data-tippy-inertia="true"
                        data-tippy-animation="shift-away"
                        data-tippy-delay="50"
                        data-tippy-arrow="true"
                        data-tippy-theme="sharpborder"
                      >
                        <i class="pe-7s-cart"></i>
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div
                class="product-content"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {/* <a
                  class="product-name"
                  href={`/productDetail?productId=${product.productId
                  }&sizeId=${1}&categoryId=${product.categoryId}`}
                  style={{ fontFamily: "Arial", fontWeight: "bold" }}
                >
                  {product.productName}
                </a> */}
                <Link
                 class="product-name"
                        to={`/productDetail?productId=${product.productId
                          }&sizeId=${1}&categoryId=${product.categoryId}`}
                      >
                        <i class="pe-7s-look"></i>
                        {product.productName}
                      </Link>
                <div class="price-box pb-1">
                  <span class="new-price" style={{ fontSize: "16px" }}>
                    {product.price + 10000}đ
                  </span>
                </div>
                <div className="price-box pb-1">
                  <button className="add-to-cart-btn" style={{
                    backgroundColor: '#ff9900',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    borderRadius: '5px'
                  }}>
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>

            </div>
          </Col>
        </>
      ) : (
        <>Lỗi khi lấy data</>
      )}
    </>
  );
}

export default Product;
