import { Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useDispatch } from "react-redux"
import { addToCart } from "../../../reducers/cartSlice.js"

function Product(props) {
  const { product } = props;
  const dispatch = useDispatch()
    const handleAddToCart = () => {
        dispatch(addToCart({
            ...product,
            quantity: 1
        }))       
    }

  return (
    <>
      {product ? (
        <>
          <Col span={12}>
            <div className="product-item" style={{textAlign:"center"}}>
              <div className="product-img">
                <Link
                  to={`/productDetail?productId=${
                    product.productId
                  }&sizeId=${product.sizeId}&categoryId=${product.category}`}
                >
                  <img
                    className="primary-img"
                    src={product.img}
                    alt="Product Images"
                    style={{
                      maxWidth: "150px", // Điều chỉnh kích thước tối đa của ảnh
                      height: "auto", // Đảm bảo tỉ lệ ảnh không bị méo
                      marginBottom: "10px" // Khoảng cách phía dưới ảnh
                    }}
                  />
                </Link>
                {/* <div className="product-add-action">
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
                        to={`/productDetail?productId=${
                          product.productId
                        }&sizeId=${product.sizeId}&categoryId=${product.category}`}
                      >
                        <i className="pe-7s-look"></i>
                      </Link>
                    </li>
                  </ul>
                </div> */}
              </div>
              <div className="product-content">
                <a
                  className="product-name"
                  href="shop.html"
                  style={{ fontFamily: "Arial", fontWeight: "bold" }}
                >
                  {product.productName} Size {product.sizeName}
                </a>
                <div className="price-box pb-1">
                  <span className="new-price" style={{ fontSize: "16px" }}>
                    {product.price}đ
                  </span>
                </div>
                <div className="price-box pb-1">
                  <Button
                    className="add-to-cart-btn"
                    style={{
                      backgroundColor: '#ff9900',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      cursor: 'pointer',
                      borderRadius: '5px'
                    }}
                    onClick={handleAddToCart} variant="success"
                  >
                    Thêm vào giỏ hàng
                  </Button>
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
