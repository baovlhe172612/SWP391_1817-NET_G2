import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { get } from '../../../helpers/API.helper';

function ProductDetail() {
  // Sử dụng useLocation hook để lấy thông tin về URL hiện tại
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Lấy giá trị của các tham số từ query string
  const productId = searchParams.get('productId');
  const sizeId = searchParams.get('sizeId');

  const [productSize, setProducts] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await get(`http://localhost:5264/api/ProductSizes/productSize?productId=${productId}&sizeId=${sizeId}`);
      console.log(data);
      setProducts(data);
    };

    fetchApi();
  }, [productId, sizeId]);

  // Hàm xử lý thay đổi size và gửi yêu cầu API
  const handleSizeChange = async (e) => {
    const newSizeId = parseInt(e.target.value);

    try {
      const response = await fetch(`http://localhost:5264/api/ProductSizes/productSize?productId=${productId}&sizeId=${newSizeId}`);
      if (!response.ok) {
        const errorText = await response.text(); // Lấy thông tin chi tiết về lỗi
       
      }
      const data = await response.json(); // Giải mã dữ liệu JSON từ phản hồi
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error('Error updating size:', error);
    }
  };

  return (
    <>
      {productSize ? (
        <>
          <main className="main-content">
            <div className="breadcrumb-area breadcrumb-height" data-bg-image="assets/images/breadcrumb/bg/1-1-1919x388.jpg">
              <div className="container h-100">
                <div className="row h-100">
                  <div className="col-lg-12">
                    <div className="breadcrumb-item">
                      <h2 className="breadcrumb-heading">Single Product</h2>
                      <ul>
                        <li>
                          <a href="index.html">Home</a>
                        </li>
                        <li>Single Product variable</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="single-product-area section-space-top-100">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="single-product-img">
                      <div className="thumbs-arrow-holder">
                        <div className="swiper-container single-product-thumbs">
                          <div className="swiper-wrapper">
                            <a href="#" className="swiper-slide">
                              <img className="img-full" src={productSize.img} alt="Product Thumbnail" />
                            </a>
                          </div>
                          <div className="thumbs-button-wrap d-none d-md-block">
                            <div className="thumbs-button-prev">
                              <i className="pe-7s-angle-left"></i>
                            </div>
                            <div className="thumbs-button-next">
                              <i className="pe-7s-angle-right"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 pt-5 pt-lg-0">
                    <div className="single-product-content">
                      <h2 className="title">{productSize.productName}</h2>
                      <div className="price-box">
                        <span className="new-price">{productSize.price}đ</span>
                      </div>
                      <div className="selector-wrap size-option">
                        <span className="selector-title">Size</span>
                        <select
                          className="nice-select wide rounded-0"
                          value={productSize.sizeId}
                          onChange={handleSizeChange}
                        >
                          <option value="1" selected={productSize.sizeId === 1}>X</option>
                          <option value="2" selected={productSize.sizeId === 2}>L</option>
                          <option value="3" selected={productSize.sizeId === 3}>M</option>
                        </select>
                      </div>
                      <div className="note-input">
                        <span className="note-label">Thêm ghi chú của bạn:</span>
                        <input
                          type="text"
                          className="note-text"
                          placeholder="VD: 50% đường 50% đá"
                        />
                      </div>
                      <hr />
                      <p className="short-desc">
                        Please place an order at the nearest Mixue store. This website only introduces products and does not allow for orders.
                      </p>
                      <ul className="quantity-with-btn">
                        {/* <li className="quantity">
                          <div className="cart-plus-minus">
                            <input className="cart-plus-minus-box" value="1" type="text" />
                          </div>
                        </li> */}
                        <li className="add-to-cart">
                          <a className="btn btn-custom-size lg-size btn-pronia-primary" href="http://localhost:3000/cart" style={{ border: '4px solid black' }}>Add to cart</a>
                        </li>
                        {/* <li className="wishlist-btn-wrap">
                          <a className="custom-circle-btn" href="wishlist.html">
                            <i className="pe-7s-like"></i>
                          </a>
                        </li>
                        <li className="compare-btn-wrap">
                          <a className="custom-circle-btn" href="compare.html">
                            <i className="pe-7s-refresh-2"></i>
                          </a>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default ProductDetail;