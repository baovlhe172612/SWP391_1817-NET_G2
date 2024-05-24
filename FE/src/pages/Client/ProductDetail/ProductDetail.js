import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { get } from '../../../helpers/API.helper';

function ProductDetail() {
  // Sử dụng useLocation hook để lấy thông tin về URL hiện tại
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Lấy giá trị của các tham số từ query string
  const productId = searchParams.get('productId');
  const sizeId = searchParams.get('sizeId');

  const [productSize, setProducts] = useState();
  
  useEffect(() => {
    const fetchApi = async () => {
      const data = await get(`http://localhost:5264/api/ProductSizes/productSize?productId=${productId}&sizeId=${sizeId}`);

      console.log(data)
      setProducts(data);
    };

    fetchApi();
  }, []);

  return (
    <>
      


      {productSize ? (
        <>
        <main class="main-content">
        <div class="breadcrumb-area breadcrumb-height" data-bg-image="assets/images/breadcrumb/bg/1-1-1919x388.jpg">
          <div class="container h-100">
            <div class="row h-100">
              <div class="col-lg-12">
                <div class="breadcrumb-item">
                  <h2 class="breadcrumb-heading">Single Product</h2>
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
        <div class="single-product-area section-space-top-100">
          <div class="container">
            <div class="row">
              <div class="col-lg-6">
                <div class="single-product-img">

                  <div class="thumbs-arrow-holder">
                    <div class="swiper-container single-product-thumbs">
                      <div class="swiper-wrapper">
                        <a href="#" class="swiper-slide">
                          <img class="img-full" src={productSize.img} alt="Product Thumnail" />
                        </a>
                        {/* <a href="#" class="swiper-slide">
                          <img class="img-full" src="assets/images/product/large-size/1-2-570x633.jpg" alt="Product Thumnail" />
                        </a>
                        <a href="#" class="swiper-slide">
                          <img class="img-full" src="assets/images/product/large-size/1-3-570x633.jpg" alt="Product Thumnail" />
                        </a>
                        <a href="#" class="swiper-slide">
                          <img class="img-full" src="assets/images/product/large-size/1-4-570x633.jpg" alt="Product Thumnail" />
                        </a> */}
                      </div>

                      <div class=" thumbs-button-wrap d-none d-md-block">
                        <div class="thumbs-button-prev">
                          <i class="pe-7s-angle-left"></i>
                        </div>
                        <div class="thumbs-button-next">
                          <i class="pe-7s-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 pt-5 pt-lg-0">
                <div class="single-product-content">
                  <h2 class="title">{productSize.productName}</h2>
                  <div class="price-box">
                    <span class="new-price">{productSize.price}đ</span>
                  </div>
                  <div class="rating-box-wrap">
                    <div class="rating-box">
                      <ul>
                        <li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>
                      </ul>
                    </div>
                    <div class="review-status">
                      <a href="#">( 1 Review )</a>
                    </div>
                  </div>
                 
                  <div class="selector-wrap size-option">
                    <span class="selector-title">Size</span>
                    <select class="nice-select wide rounded-0">
                      <option value="medium">X</option>
                      <option value="large">L</option>
                      <option value="small">M</option>
                    </select>
                  </div>
                  
                  <div class="note-input">
                    <span class="note-label">Thêm ghi chú của bạn:</span>
                    <input type="text" class="note-text" placeholder='VD: 50% đường 50% đá' />
                  </div>


                  <div class="product-category">
                    <span class="title">Categories :</span>
                        Trà sữa
                  </div>
                  <hr></hr>
                  <p class="short-desc">
                       Please place an order at the nearest Mixue store. 
                       This website only introduces products and does not allow for orders.</p>
                  <ul class="quantity-with-btn">
                    <li class="quantity">
                      <div class="cart-plus-minus">
                        <input class="cart-plus-minus-box" value="1" type="text" />
                      </div>
                    </li>
                    <li class="add-to-cart">
                      <a class="btn btn-custom-size lg-size btn-pronia-primary" href="cart.html">Add to
                        cart</a>
                    </li>
                    <li class="wishlist-btn-wrap">
                      <a class="custom-circle-btn" href="wishlist.html">
                        <i class="pe-7s-like"></i>
                      </a>
                    </li>
                    <li class="compare-btn-wrap">
                      <a class="custom-circle-btn" href="compare.html">
                        <i class="pe-7s-refresh-2"></i>
                      </a>
                    </li>
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>
       

      </main>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default ProductDetail