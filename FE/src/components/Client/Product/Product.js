import { Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Product(props) {
  const { product } = props;
  // console.log(props)
 
  return (
    <>
      {product ? (
        <>
          {/* <Col sm={8} > //</>class="col-xl-3 col-md-4 col-sm-3" > */}
          <Col span={12} >
            <div class="product-item">
              <div class="product-img">
                <Link
                  to={`/productDetail?productId=${
                    product.productId
                  }&sizeId=${1}`}
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
                        to={`/productDhttp://localhost:3000/listProduct/shop.htmletail?productId=${
                          product.productId
                        }&sizeId=${1}`}
                      >
                        <i class="pe-7s-look"></i>
                      </Link>
                    </li>
                    <li>
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
                <a
                  class="product-name"
                  href="shop.html"
                  style={{ fontFamily: "Arial", fontWeight: "bold" }}
                >
                  {product.productName}
                </a>
                <div class="price-box pb-1">
                  <span class="new-price" style={{ fontSize: "16px" }}>
                    {product.price}đ
                  </span>
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
