import React from "react";
import { Link } from "react-router-dom";

function Product(props) {
  const { product } = props;
  console.log("product in product.js", product);

  return (
    <>
      {product ? (
        <div className="col-xl-3 col-md-4 col-sm-6 pt-4">
          <div className="product-item">
            <div className="product-img">
              <Link to={`/productDetail?productId=${product.productId}&sizeId=1`}>
                <img
                  className="primary-img"
                  src={product.img}
                  alt="Product Images"
                />
              </Link>
              {/* Uncomment and add src for secondary image if available
              <Link to={`/productDetail?productId=${product.productId}&sizeId=1`}>
                <img
                  className="secondary-img"
                  src={product.secondaryImg}
                  alt="Product Images"
                />
              </Link>
              */}
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
                    <Link to={`/productDetail?productId=${product.productId}&sizeId=1`}>
                      <i className="pe-7s-look"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="product-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <a className="product-name" href="shop.html" style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>
                {product.productName}
              </a>
              <div className="price-box pb-1">
                <span className="new-price" style={{ fontSize: '16px' }}>{product.price}đ</span>
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
        </div>
      ) : (
        <>
          Lỗi khi lấy data
        </>
      )}
    </>
  );
}

export default Product;
