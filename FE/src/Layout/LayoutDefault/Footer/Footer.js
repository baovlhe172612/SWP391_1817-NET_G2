import React from "react";

function Footer() {
  return (
    <>
      {/* <!-- Begin Footer Area --> */}
      <div
        className="footer-area"
        data-bg-image="assets/images/footer/bg/1-1920x465.jpg"
        style={{
          backgroundImage: `url("assets/images/footer/bg/1-1920x465.jpg")`,
        }}
      >
        <div className="footer-top section-space-top-100 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="footer-widget-item">
                  <div className="footer-widget-logo">
                    <a href="index.html">
                      <img src="assets/images/logo/dark.png" alt="Logo" />
                    </a>
                  </div>
                  <p className="footer-widget-desc">
                    Lorem ipsum dolor sit amet, consec adipisl elit, sed do
                    eiusmod tempor
                    <br />
                    incidio ut labore et dolore magna.
                  </p>
                  <div className="social-link with-border">
                    <ul>
                      <li>
                        <a
                          href="#"
                          data-tippy="Facebook"
                          data-tippy-inertia="true"
                          data-tippy-animation="shift-away"
                          data-tippy-delay="50"
                          data-tippy-arrow="true"
                          data-tippy-theme="sharpborder"
                        >
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-tippy="Twitter"
                          data-tippy-inertia="true"
                          data-tippy-animation="shift-away"
                          data-tippy-delay="50"
                          data-tippy-arrow="true"
                          data-tippy-theme="sharpborder"
                        >
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-tippy="Pinterest"
                          data-tippy-inertia="true"
                          data-tippy-animation="shift-away"
                          data-tippy-delay="50"
                          data-tippy-arrow="true"
                          data-tippy-theme="sharpborder"
                        >
                          <i className="fa fa-pinterest"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-tippy="Dribbble"
                          data-tippy-inertia="true"
                          data-tippy-animation="shift-away"
                          data-tippy-delay="50"
                          data-tippy-arrow="true"
                          data-tippy-theme="sharpborder"
                        >
                          <i className="fa fa-dribbble"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 pt-40">
                <div className="footer-widget-item">
                  <h3 className="footer-widget-title">Useful Links</h3>
                  <ul className="footer-widget-list-item">
                    <li>
                      <a href="#">About Pronia</a>
                    </li>
                    <li>
                      <a href="#">How to shop</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                    <li>
                      <a href="#">Contact us</a>
                    </li>
                    <li>
                      <a href="#">Log in</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 pt-40">
                <div className="footer-widget-item">
                  <h3 className="footer-widget-title">My Account</h3>
                  <ul className="footer-widget-list-item">
                    <li>
                      <a href="#">Sign In</a>
                    </li>
                    <li>
                      <a href="#">View Cart</a>
                    </li>
                    <li>
                      <a href="#">My Wishlist</a>
                    </li>
                    <li>
                      <a href="#">Track My Order</a>
                    </li>
                    <li>
                      <a href="#">Help</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 pt-40">
                <div className="footer-widget-item">
                  <h3 className="footer-widget-title">Our Service</h3>
                  <ul className="footer-widget-list-item">
                    <li>
                      <a href="#">Payment Methods</a>
                    </li>
                    <li>
                      <a href="#">Money Guarantee!</a>
                    </li>
                    <li>
                      <a href="#">Returns</a>
                    </li>
                    <li>
                      <a href="#">Shipping</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 pt-40">
                <div className="footer-contact-info">
                  <h3 className="footer-widget-title">Got Question? Call Us</h3>
                  <a className="number" href="tel://123-456-789">
                    123 456 789
                  </a>
                  <div className="address">
                    <ul>
                      <li>Your Address Goes Here</li>
                    </ul>
                  </div>
                </div>
                <div className="payment-method">
                  <a href="#">
                    <img
                      src="assets/images/payment/1.png"
                      alt="Payment Method"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="copyright">
                  <span className="copyright-text">
                    © 2021 Pronia Made with{" "}
                    <i className="fa fa-heart text-danger"></i> by
                    <a
                      href="https://hasthemes.com/"
                      rel="noopener"
                      target="_blank"
                    >
                      HasThemes
                    </a>{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer Area End Here --> */}

      {/* <!-- Begin Modal Area --> */}
      <div
        className="modal quick-view-modal fade"
        id="quickModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="quickModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                data-tippy="Close"
                data-tippy-inertia="true"
                data-tippy-animation="shift-away"
                data-tippy-delay="50"
                data-tippy-arrow="true"
                data-tippy-theme="sharpborder"
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-wrap row">
                <div className="col-lg-6">
                  <div className="modal-img">
                    <div className="swiper-container modal-slider">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <a href="#" className="single-img">
                            <img
                              className="img-full"
                              src="assets/images/product/large-size/1-1-570x633.jpg"
                              alt="Product Image"
                            />
                          </a>
                        </div>
                        <div className="swiper-slide">
                          <a href="#" className="single-img">
                            <img
                              className="img-full"
                              src="assets/images/product/large-size/1-2-570x633.jpg"
                              alt="Product Image"
                            />
                          </a>
                        </div>
                        <div className="swiper-slide">
                          <a href="#" className="single-img">
                            <img
                              className="img-full"
                              src="assets/images/product/large-size/1-3-570x633.jpg"
                              alt="Product Image"
                            />
                          </a>
                        </div>
                        <div className="swiper-slide">
                          <a href="#" className="single-img">
                            <img
                              className="img-full"
                              src="assets/images/product/large-size/1-4-570x633.jpg"
                              alt="Product Image"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 pt-5 pt-lg-0">
                  <div className="single-product-content">
                    <h2 className="title">American Marigold</h2>
                    <div className="price-box">
                      <span className="new-price">$23.45</span>
                    </div>
                    <div className="rating-box-wrap">
                      <div className="rating-box">
                        <ul>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="review-status">
                        <a href="#">( 1 Review )</a>
                      </div>
                    </div>
                    <div className="selector-wrap color-option">
                      <span className="selector-title border-bottom-0">Color</span>
                      <select className="nice-select wide border-bottom-0 rounded-0">
                        <option value="default">Black & White</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="red">Red</option>
                      </select>
                    </div>
                    <div className="selector-wrap size-option">
                      <span className="selector-title">Size</span>
                      <select className="nice-select wide rounded-0">
                        <option value="medium">Medium Size & Poot</option>
                        <option value="large">Large Size With Poot</option>
                        <option value="small">Small Size With Poot</option>
                      </select>
                    </div>
                    <p className="short-desc">
                      Lorem ipsum dolor sit amet, consectetur adipisic elit, sed
                      do eiusmod tempo incid ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostru exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit in voluptate
                    </p>
                    <ul className="quantity-with-btn">
                      <li className="quantity">
                        <div className="cart-plus-minus">
                          <input
                            className="cart-plus-minus-box"
                            value="1"
                            type="text"
                          />
                        </div>
                      </li>
                      <li className="add-to-cart">
                        <a
                          className="btn btn-custom-size lg-size btn-pronia-primary"
                          href="cart.html"
                        >
                          Add to cart
                        </a>
                      </li>
                      <li className="wishlist-btn-wrap">
                        <a className="custom-circle-btn" href="wishlist.html">
                          <i className="pe-7s-like"></i>
                        </a>
                      </li>
                      <li className="compare-btn-wrap">
                        <a className="custom-circle-btn" href="compare.html">
                          <i className="pe-7s-refresh-2"></i>
                        </a>
                      </li>
                    </ul>
                    <ul className="service-item-wrap pb-0">
                      <li className="service-item">
                        <div className="service-img">
                          <img
                            src="assets/images/shipping/icon/car.png"
                            alt="Shipping Icon"
                          />
                        </div>
                        <div className="service-content">
                          <span className="title">
                            Free <br /> Shipping
                          </span>
                        </div>
                      </li>
                      <li className="service-item">
                        <div className="service-img">
                          <img
                            src="assets/images/shipping/icon/card.png"
                            alt="Shipping Icon"
                          />
                        </div>
                        <div className="service-content">
                          <span className="title">
                            Safe <br /> Payment
                          </span>
                        </div>
                      </li>
                      <li className="service-item">
                        <div className="service-img">
                          <img
                            src="assets/images/shipping/icon/service.png"
                            alt="Shipping Icon"
                          />
                        </div>
                        <div className="service-content">
                          <span className="title">
                            Safe <br /> Payment
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal Area End Here --> */}
    </>
  );
}

export default Footer;
