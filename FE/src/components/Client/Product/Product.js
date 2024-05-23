import React from "react";
import { Link } from "react-router-dom";

function Product(props) {
  const { product } = props;
  return (
    <>
      {product ? (
        <>
          <div class="col-xl-3 col-md-4 col-sm-6 pt-4">
            <div class="product-item">
              <div class="product-img">
                <Link to="/productDetail">
                  <img
                    class="primary-img"
                    src={product.img}
                    alt="Product Images"
                  />
                </Link>
                <div class="product-add-action">
                  <ul>
                    <li>
                      <a
                        href="wishlist.html"
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
                    <li
                      class="quuickview-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#quickModal"
                    >
                      <a
                        href="#"
                        data-tippy="Quickview"
                        data-tippy-inertia="true"
                        data-tippy-animation="shift-away"
                        data-tippy-delay="50"
                        data-tippy-arrow="true"
                        data-tippy-theme="sharpborder"
                      >
                        <i class="pe-7s-look"></i>
                      </a>
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
              <div class="product-content">
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
          </div>
        </>
      ) : (
        <>
        Lỗi khi lấy data
        </>
      )}
    </>
  );
}

export default Product;
