import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { get } from '../../../helpers/API.helper';
import { Carousel, Col, Divider, Image } from 'antd';

function ProductDetail() {
  // Sử dụng useLocation hook để lấy thông tin về URL hiện tại
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  console.log("searchParams", searchParams)
  // Lấy giá trị của các tham số từ query string
  const productId = searchParams.get('productId');
  const categoryId = searchParams.get('categoryId');
  console.log("productId", productId)
  console.log("categoryId", categoryId)
  const sizeId = searchParams.get('sizeId');

  const [productSize, setProducts] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await get(`http://localhost:5264/api/ProductSizes/productSize?productId=${productId}&sizeId=${sizeId}`);
      console.log(data);
      setProducts(data);
      // Lấy danh sách các sản phẩm tương tự
      const similarProductsData = await get(`http://localhost:5264/api/ProductControlles/getProductByCategoryId?categoriesID=${categoryId}`);
      // Lọc ra các sản phẩm khác với sản phẩm hiện tại
      // Ensure the response is an array before filtering
      if (Array.isArray(similarProductsData)) {
        // Filter out the current product from the list of similar products
        const filteredSimilarProducts = similarProductsData.filter(product => product.id !== productId);
        console.log("filteredSimilarProducts", filteredSimilarProducts)
        setSimilarProducts(filteredSimilarProducts);
      } else {
        console.error('Similar products data is not an array:', similarProductsData);
      }
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
      <div>

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
                            <a className="btn-custom" href="#" style={{ border: '4px solid black' }}>Thêm vào giỏ hàng</a>
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
          <p>Loading...</p>


        )
        }

        <Divider />
        {similarProducts.length > 0 && (
          <Col span={24}>
          <div className="similar-products">
            <h3 style={{ textAlign: 'center', fontWeight: "850" }}>Sản phẩm tương tự</h3>
            <Carousel autoplay effect="fade" easing="ease" speed={500} autoplaySpeed={2000}>
              {similarProducts.map((product) => (
                <div className="slider-item" key={product.productId}>
                  <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="product-item">
                      <div className="product-img">
                        <a href={`/productDetail?productId=${product.productId}&sizeId=${1}&categoryId=${product.categoryId}`}>
                        <Image className="" src={product.img} alt="Product Images" style={{ width: "50%", height: "auto",marginLeft: "27%"}} />
                        </a>
                      </div>
                      <div className="product-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                        <a
                          href={`/productDetail?productId=${product.productId}&sizeId=${1}&categoryId=${product.categoryId}`}
                          style={{ fontFamily: "Arial", fontWeight: "bold", marginTop: "10px" }}
                        >
                          {product.productName}
                        </a>
                        <div className="price-box pb-1" >
                          <span className="new-price" style={{ fontSize: "16px" }}>
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
                    borderRadius: '5px',
                    marginBottom: '20px'
                  }}>
                    Thêm vào giỏ hàng
                  </button>
                </div>
                      </div>
                    </div>
                  </Col>
                </div>
              ))}
            </Carousel>
          </div>
        </Col>
          // <div className="similar-products">
          //   <h3>Sản phẩm tương tự</h3>
          //   <div className="row">
          //     {similarProducts.map((product) => (
          //       <div className="col-lg-3" key={product.id}>
          //         <div className="similar-product">
          //           <img src={product.img} alt={product.productName} />
          //           <h4>{product.productName}</h4>
          //           <span>{product.price}đ</span>
          //           <a href={`/productDetail?productId=${product.id}&sizeId=${product.sizeId}`}>Xem chi tiết</a>
          //         </div>
          //       </div>
          //     ))}
          //   </div>
          // </div>
        )}
      </div>

    </>
  );
}

export default ProductDetail;