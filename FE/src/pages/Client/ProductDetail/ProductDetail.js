import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { get } from '../../../helpers/API.helper';
import { Button, Carousel, Col, Divider, Image } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../actions/CartAction';
import { LIST_PRODUCT_SIZE } from '../../../helpers/APILinks';


function ProductDetail(props) {

  // Sử dụng useLocation hook để lấy thông tin về URL hiện tại
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  console.log("searchParams", searchParams)
  // Lấy giá trị của các tham số từ query string
  const productId = searchParams.get('productId');
  const categoryId = searchParams.get('categoryId');

  const sizeId = searchParams.get('sizeId');

  const [productSize, setProducts] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await get(`${LIST_PRODUCT_SIZE}/productSize?productId=${productId}&sizeId=${sizeId}`);

      console.log("data: ",data)
      setProducts(data);
      //Lấy danh sách các sản phẩm tương tự
      const similarProductsData = await get(`${LIST_PRODUCT_SIZE}/getProductSizeSimilarMinToMax?min=${data.price - 5000}&max=${data.price + 5000}&categoriID=${data.category}`);
      // Lọc ra các sản phẩm khác với sản phẩm hiện tại
      // Ensure the response is an array before filtering
      if (Array.isArray(similarProductsData)) {
        // Filter out the current product from the list of similar products
        const filteredSimilarProducts = similarProductsData.slice(0, 3);
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
      const response = await fetch(`${LIST_PRODUCT_SIZE}/productSize?productId=${productId}&sizeId=${newSizeId}`);
      if (!response.ok) {
        const errorText = await response.text(); // Lấy thông tin chi tiết về lỗi

      }
      const data = await response.json(); // Giải mã dữ liệu JSON từ phản hồi
      const similarProductsData = await get(`${LIST_PRODUCT_SIZE}/getProductSizeSimilarMinToMax?min=${data.price - 5000}&max=${data.price + 5000}&categoriID=${data.category}`);
      // Lọc ra các sản phẩm khác với sản phẩm hiện tại
      // Ensure the response is an array before filtering
      if (Array.isArray(similarProductsData)) {
        // Filter out the current product from the list of similar products
        const filteredSimilarProducts = similarProductsData.slice(0, 3);
        console.log("filteredSimilarProducts", filteredSimilarProducts)
        setSimilarProducts(filteredSimilarProducts);
      } else {
        console.error('Similar products data is not an array:', similarProductsData);
      }
      setProducts(data);
    } catch (error) {
      console.error('Error updating size:', error);
    }
  };

  const dispatch = useDispatch()
  const handleAddToCart = (product) => {
    dispatch(addToCart({
      ...product,
      quantity: 1
    }));
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
                        <h2 className="breadcrumb-heading">Drink detail</h2>
                        <ul>
                          <li>
                            <a href="/">Home</a>
                          </li>
                          <li>Drink variable</li>
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
                            {/* <div className="thumbs-button-wrap d-none d-md-block">
                              <div className="thumbs-button-prev">
                                <i className="pe-7s-angle-left"></i>
                              </div>
                              <div className="thumbs-button-next">
                                <i className="pe-7s-angle-right"></i>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 pt-5 pt-lg-0">
                      <div className="single-product-content">
                        <h2 className="title">{productSize.productName} Size {productSize.sizeName}</h2>
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
                     
                        <hr />
                        <p className="short-desc">
                          Please place an order at the nearest store. This website only introduces products and does not allow for orders.
                        </p>
                        <Button
                          className="add-to-cart-btn"
                          size='large'
                          style={{
                            backgroundColor: '#ff9900',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px'
                          }}
                          onClick={() => handleAddToCart(productSize)} // Truyền productSize vào hàm handleAddToCart
                          variant="success"
                        >
                          Add to cart
                        </Button>

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
      <h3 style={{ textAlign: 'center', fontWeight: "bold", marginBottom: "20px" }}>Sản phẩm tương tự</h3>
      <Carousel autoplay effect="fade" easing="ease" speed={800} className="carousel-container">
        {similarProducts.map((product) => (
          <div className="slider-item" key={product.productSizeID} style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="product-item" style={{ textAlign: 'center', padding: '10px' }}>
              <div className="product-img" style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to={`/productDetail?productId=${product.productId}&sizeId=${product.sizeId}&categoryId=${product.category}`}>
                  <img className="primary-img" src={product.img} alt="Product Images"
                    style={{
                      maxWidth: "120px", // Điều chỉnh kích thước tối đa của ảnh
                      maxHeight: "120px", // Đảm bảo ảnh không quá lớn
                      height: "auto", // Đảm bảo tỉ lệ ảnh không bị méo
                      // marginBottom: "10px" // Khoảng cách phía dưới ảnh
                    }} />
                </Link>
              </div>
              <div className="product-content">
                <Link className="product-name" to={`/productDetail?productId=${product.productId}&sizeId=${product.sizeId}&categoryId=${product.category}`}
                  style={{
                    display: 'block',
                    fontSize: '14px', // Giảm kích thước chữ
                    fontWeight: 'bold',
                    color: '#000',
                    marginBottom: '5px',
                    textDecoration: 'none',
                    textAlign: 'center', // Căn giữa tên sản phẩm
                  }}>
                  {product.productName} Size {product.sizeName}
                </Link>
                <div className="price-box pb-1" style={{ textAlign: 'center' }}>
                  <span className="new-price" style={{ fontSize: "14px", color: '#000' }}>
                    {product.price.toLocaleString('vi-VN')} ₫
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  </Col>
)}


      </div>

    </>
  );
}

export default ProductDetail;