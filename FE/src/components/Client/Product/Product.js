import { Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { addToCart } from "../../../actions/CartAction";
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
          <Col
            xs={{ span: 12 }}
            sm={{ span: 12 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
          >
            <div className="product-item" style={{ textAlign: "center" }}>
              <div className="product-img">
                <Link
                  to={`/productDetail?productId=${product.productId}&sizeId=${product.sizeId}&categoryId=${product.category}`}
                >
                  <img
                    className="primary-img"
                    src={product.img}
                    alt="Product Images"
                    style={{
                      maxWidth: "170px",
                      height: "200px",
                      marginBottom: "10px",
                      borderRadius: "8px", // Thêm góc bo tròn
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Thêm bóng đổ
                      objectFit: "cover",
                      display: "block", // Đảm bảo ảnh không bị ảnh hưởng bởi các phần tử xung quanh
                      margin: "0 auto" // Căn giữa ảnh
                    }}
                  />
                </Link>
              </div>
              <div className="product-content">
                <Link
                  to={`/productDetail?productId=${product.productId}&sizeId=${product.sizeId}&categoryId=${product.category}`}
                  style={{
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    width: "150px", // Set fixed width
                    whiteSpace: "nowrap", // Prevent text from wrapping
                    overflow: "hidden", // Hide overflow text
                    textOverflow: "ellipsis"
                  }}
                >
                  {product.productName} Size {product.sizeName}
                </Link>
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
                      //padding: '10px 20px',
                      cursor: 'pointer',
                      borderRadius: '5px'
                    }}
                    onClick={handleAddToCart}
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
