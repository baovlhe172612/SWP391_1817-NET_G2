import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Input, Space, Row, Col, Carousel, Collapse, Image, Tabs } from 'antd';
import "./Header.css"
const { Search } = Input;

function Header({ tableId }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const navigate = useNavigate();

  const handleSearch = (value) => {
    navigate(`/listproduct?search=${value}`);
  };
  
  return (
    <>

      <div className={`header-top bg-pronia-primary ${!isMenuOpen ? 'd-none d-lg-block' : ''}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6">
              <div className="header-top-left">
                <span className="pronia-offer" >
                  HELLO table {tableId}
                </span>
              </div>
            </div>
            <div className="col-6">
              <div className="header-top-right" style={{ paddingTop: '20px' }}>

                <ul className="dropdown-wrap">
                  <li className="dropdown">

                    VND

                  </li>
                  <li className="dropdown">

                    FPT University

                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Middle */}
      <div className="header-middle py-30">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="header-middle-wrap position-relative d-flex justify-content-between align-items-center">
                <Link to="/">
                  <img style={{ paddingRight: '30px' }} src="assets/images/logo/dark.png" alt="Header Logo" />
                </Link>

                <div style={{ paddingTop: '30px' }} className="header-right d-flex align-items-center">
                <Search
                    placeholder="Search for products"
                    enterButton
                    onSearch={handleSearch}
                  />
                  <ul className="d-flex align-items-center m-0">
                    <li className="minicart-wrap me-3 me-lg-0">
                      <Link to="/cart" className="minicart-btn toolbar-btn">
                        <i className="pe-7s-shopbag"></i>
                        <span className="quantity">3</span>
                      </Link>
                    </li>

                    <li className="mobile-menu_wrap d-block d-lg-none">
                      <i className="pe-7s-menu" onClick={toggleMenu}></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Carousel autoplay effect="fade" easing="ease" speed={800}>
        <div className="slider-item">

          <Image
            width={400}
            height={400}
            src={`https://png.pngtree.com/png-vector/20240207/ourlarge/pngtree-juice-drink-sticker-retro-png-image_11712623.png`}
          />
        </div>
        <div className="slider-item">

          <Image
            width={400}
            height={400}
            src={`https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/thumbs/270_crop_HLC_New_logo_5.1_Products__PHINDI_KEM_SUA.jpg`}
          />

        </div>
        <div className="slider-item">

          <Image
            width={400}
            height={400}
            src="https://www.highlandscoffee.com.vn/vnt_upload/product/HLCPOSTOFFICE_DRAFT/PNG_FINAL/3_MENU_NGUYEN_BAN/thumbs/270_crop_Chanh_Da_Xay.jpg"
          />

        </div>
        <div className="slider-item">
          <Image
            width={400}
            height={400}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM_nfnQkXXCNcOhXS-766JKhhtqwGoAIhH0Q&s"
          />


        </div>
      </Carousel>


      {/* Header Middle */}

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="header-bottom d-block d-lg-none">

          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-menu position-relative">
                  <nav className="main-nav">
                    <ul>
                      <li className="drop-holder">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="megamenu-holder">
                        <Link to="/listProduct">Menu</Link>
                      </li>

                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li className="megamenu-holder">
                        <Link to="/blog">Blog</Link>
                      </li>
                      <li className="drop-holder">
                        <Link to="/contact">FeedBack</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header Area */}
      <header className="main-header-area">
        <div className="header-bottom d-none d-lg-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-menu position-relative">
                  <nav className="main-nav">
                    <ul>
                      <li className="drop-holder">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="megamenu-holder">
                        <Link to="/listProduct">Menu</Link>
                      </li>

                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li className="megamenu-holder">
                        <Link to="/blog">Blog</Link>
                      </li>
                      <li className="drop-holder">
                        <Link to="/contact">FeedBack</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>



      {/* <!-- Begin Main Header Area --> */}
      <header className="main-header-area">

        {/* ============== NAV ============== */}

        {/* ================== NAV AFTER SCROLL =============== */}
        <div className="header-sticky py-2 py-lg-0">
          <div className="container">
            <div className="header-nav position-relative">
              {/* <div className="row align-items-center">
                <div className="col-6">
                  <div className="header-top-left">
                    <span className="pronia-offer">
                      HELLO HELLO table {tableId}
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="header-top-right" style={{ paddingTop: '20px' }}>
                    <ul className="dropdown-wrap">
                      <li className="dropdown">VND</li>
                      <li className="dropdown">FPT University</li>
                    </ul>
                  </div>
                </div>
              </div> */}
              <div className="row align-items-center">
                <div className="header-middle-wrap position-relative d-flex justify-content-between align-items-center">
                  <Link to="/">
                    <img
                      style={{ paddingRight: '30px' }}
                      src="assets/images/logo/dark.png"
                      alt="Header Logo"
                    />
                  </Link>

                  <div
                    style={{ paddingTop: '30px' }}
                    className="header-right d-flex align-items-center"
                  >
                  
                  <Search
                    placeholder="Search for products"
                    enterButton
                    onSearch={handleSearch}
                  /> 

                    <ul className="d-flex align-items-center m-0">
                      <li className="minicart-wrap me-3 me-lg-0">
                        <Link to="/cart" className="minicart-btn toolbar-btn">
                          <i className="pe-7s-shopbag"></i>
                          <span className="quantity">3</span>
                        </Link>
                      </li>
                      <li className="mobile-menu_wrap d-block d-lg-none">
                        <i className="pe-7s-menu" onClick={toggleMenu}></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-12">
                  <div className="main-menu d-flex justify-content-center">
                    <nav className="main-nav">
                      <ul>
                        <li className="drop-holder">
                          <Link to="/">Home</Link>
                        </li>
                        <li className="megamenu-holder">
                          <Link to="/listProduct">Menu</Link>
                        </li>
                        <li className="drop-holder">
                          <Link to="/about">About Us</Link>
                        </li>
                        <li className="megamenu-holder">
                          <Link to="/blog">Blog</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================== NAV AFTER SCROLL =============== */}

        <div className="mobile-menu_wrapper" id="mobileMenu">
          <div className="offcanvas-body">
            <div className="inner-body">
              <div className="offcanvas-top">
                <a href="#" className="button-close">
                  <i className="pe-7s-close"></i>
                </a>
              </div>
              <div className="header-contact offcanvas-contact">
                <i className="pe-7s-call"></i>
                <a href="tel://+00-123-456-789">+00 123 456 789</a>
              </div>
              <div className="offcanvas-user-info">
                <ul className="dropdown-wrap">
                  <li className="dropdown dropdown-left">
                    <button
                      className="btn btn-link dropdown-toggle ht-btn"
                      type="button"
                      id="languageButtonTwo"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      English
                    </button>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>


      </header>
    </>
  );
}

export default Header;

