import { Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useDispatch } from "react-redux"
import { addToCart } from "../../../redux/slice/cartSlice.js"

function Product(props) {
  const { product } = props;
  console.log(props)

  return (
    <>
      {product ? (
        <>
          <Col span={12}>
            <div className="product-item">
              <div className="product-img">
                <Link
                  to={`/productDetail?productId=${product.productId
                    }&sizeId=${1}&categoryId=${product.categoryId}`}
                >
                  <img
                    className="primary-img"
                    src={product.img}
                    alt="Product Images"
                  // style={{height: "50%", width: "50%"}}
                  />
                </Link>
                <div className="product-add-action">
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
                        <i className="pe-7s-like"></i>
                      </a>
                    </li>
                    <li>
                      <Link
                        to={`/productDetail?productId=${product.productId
                          }&sizeId=${1}&categoryId=${product.categoryId}`}
                      >
                        <i className="pe-7s-look"></i>
                      </Link>
                    </li>
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
        <>Lỗi khi lấy dữ liệu</>
      )}
    </>
  );
}

export default Product;
