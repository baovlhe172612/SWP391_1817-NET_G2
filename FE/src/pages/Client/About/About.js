import React from 'react'

function About() {
  return (
    <>
    {/* <   !-- Begin Main Content Area --> */}
    <main className="main-content">
         <div className="breadcrumb-area breadcrumb-height" data-bg-image="assets/images/breadcrumb/bg/1-1-1919x388.jpg">
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-lg-12">
                        <div className="breadcrumb-item">
                            <h1 className="breadcrumb-heading">About Us</h1>
                            <ul>
                                <li>
                                    <a href="home">Home</a>
                                </li>
                                <li>About Us</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <div className="about-area section-space-top-95">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="about-content">
                            <h2 className="about-title">Our <span>Story</span></h2>
                            <p className="about-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure dolor
                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur
                                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est
                                laborum. Sed ut perspiciatis</p>
                            <div className="about-signature">
                                <img src="assets/images/about/icon/2.png" alt="Signature"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Begin Shipping Area --> */}
        <div className="shipping-area section-space-y-axis-100">
            <div className="container">
                <div className="shipping-bg">
                    <div className="row shipping-wrap">
                        <div className="col-lg-4 col-md-6">
                            <div className="shipping-item">
                                <div className="shipping-img">
                                    <img src="assets/images/shipping/icon/car.png" alt="Shipping Icon"/>
                                </div>
                                <div className="shipping-content">
                                    <h2 className="title">Free Shipping</h2>
                                    <p className="short-desc mb-0">Capped at $319 per order</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                            <div className="shipping-item">
                                <div className="shipping-img">
                                    <img src="assets/images/shipping/icon/card.png" alt="Shipping Icon"/>
                                </div>
                                <div className="shipping-content">
                                    <h2 className="title">Safe Payment</h2>
                                    <p className="short-desc mb-0">With our payment gateway</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                            <div className="shipping-item">
                                <div className="shipping-img">
                                    <img src="assets/images/shipping/icon/service.png" alt="Shipping Icon"/>
                                </div>
                                <div className="shipping-content">
                                    <h2 className="title">Best Services</h2>
                                    <p className="short-desc mb-0">Friendly & Supper Services</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Shipping Area End Here --> */}

        {/* <!-- Begin Banner Area --> */}
        <div className="banner-with-counter">
            <div className="banner-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="banner-boxshadow">
                                <div className="banner-item" data-bg-image="assets/images/banner/3-1-1208x542.jpg">
                                    <div className="popup-btn">
                                        <a className="popup-vimeo wave-btn"
                                            href="https://player.vimeo.com/video/172601404?autoplay=1">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <div className="icon">
                                                <i className="pe-7s-play"></i>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="counter-area">
                <div className="container">
                    <h2 className="counter-title">Lorem ipsum dolor sit amet, consectetur adipisicing <br/> elit, sed do
                        <span>eiusmod tempor</span> incididunt.
                    </h2>
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-6">
                            <div className="counter-item">
                                <div className="count-wrap">
                                    <h3 className="count mb-0" data-counterup-time="500">150</h3>
                                    <span className="prefix">+</span>
                                </div>
                                <h4 className="count-title mb-0">Projects</h4>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6">
                            <div className="counter-item">
                                <div className="count-wrap">
                                    <h3 className="count mb-0" data-counterup-time="1000">359</h3>
                                    <span className="prefix">+</span>
                                </div>
                                <h4 className="count-title mb-0">Clients</h4>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 pt-4 pt-md-0">
                            <div className="counter-item">
                                <div className="count-wrap">
                                    <h3 className="count mb-0" data-counterup-time="1500">251</h3>
                                    <span className="prefix">+</span>
                                </div>
                                <h4 className="count-title mb-0">Rating</h4>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 pt-4 pt-lg-0">
                            <div className="counter-item">
                                <div className="count-wrap">
                                    <h3 className="count mb-0" data-counterup-time="2000">110</h3>
                                    <span className="prefix">+</span>
                                </div>
                                <h4 className="count-title mb-0">Award</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Banner Area End Here --> */}

        <div className="team-area section-space-top-100">
            <div className="container">
                <div className="section-title-wrap without-tab">
                    <h2 className="section-title">Our Team</h2>
                    <p className="section-desc">Contrary to popular belief, Lorem Ipsum is not simply random text. It
                        has roots
                        in a piece of classNameical Latin literature
                    </p>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-sm-6 pt-sm-5">
                        <div className="team-item">
                            <div className="team-img">
                                <img src="assets/images/about/team/1-1-270x270.png" alt="Team Member"/>
                                <div className="inner-content">
                                    <h2 className="team-member-name">Micheal Murphy</h2>
                                    <span className="occupation">Sales man</span>
                                    <div className="social-link with-border">
                                        <ul>
                                            <li>
                                                <a href="#" data-tippy="Facebook" data-tippy-inertia="true"
                                                    data-tippy-animation="shift-away" data-tippy-delay="50"
                                                    data-tippy-arrow="true" data-tippy-theme="sharpborder">
                                                    <i className="fa fa-facebook"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" data-tippy="Twitter" data-tippy-inertia="true"
                                                    data-tippy-animation="shift-away" data-tippy-delay="50"
                                                    data-tippy-arrow="true" data-tippy-theme="sharpborder">
                                                    <i className="fa fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" data-tippy="Pinterest" data-tippy-inertia="true"
                                                    data-tippy-animation="shift-away" data-tippy-delay="50"
                                                    data-tippy-arrow="true" data-tippy-theme="sharpborder">
                                                    <i className="fa fa-pinterest"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="team-content">
                                <h2 className="team-member-name mb-0">Micheal Murphy</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 pt-5 pt-sm-0">
                        <div className="team-item">
                            <div className="team-img">
                                <img src="assets/images/about/team/1-2-270x270.png" alt="Team Member"/>
                                <div className="inner-content">
                                    <h2 className="team-member-name">Kari Rasmus</h2>
                                    <span className="occupation">Sales man</span>
                                    <div className="social-link with-border">
                                        <ul>
                                            <li>
                                                <a href="#" data-tippy="Facebook" data-tippy-inertia="true"
                                                    data-tippy-animation="shift-away" data-tippy-delay="50"
                                                    data-tippy-arrow="true" data-tippy-theme="sharpborder">
                                                    <i className="fa fa-facebook"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" data-tippy="Twitter" data-tippy-inertia="true"
                                                    data-tippy-animation="shift-away" data-tippy-delay="50"
                                                    data-tippy-arrow="true" data-tippy-theme="sharpborder">
                                                    <i className="fa fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" data-tippy="Pinterest" data-tippy-inertia="true"
                                                    data-tippy-animation="shift-away" data-tippy-delay="50"
                                                    data-tippy-arrow="true" data-tippy-theme="sharpborder">
                                                    <i className="fa fa-pinterest"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="team-content">
                                <h2 className="team-member-name mb-0">Kari Rasmus</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 pt-5">
                        <div className="team-item">
                            <div className="team-img">
                                <img src="assets/images/about/team/1-3-270x270.png" alt="Team Member"/>
                                <div className="inner-content">
                                    <h2 className="team-member-name">Britney Cooper</h2>
                                    <span className="occupation">Sales man</span>
                                    <div className="social-link with-border">
                                        <ul>
                                            <li>
                                                <a href="#" data-tippy="Facebook" data-tippy-inertia="true"
                                                    data-tippy-animation="shift-away" data-tippy-delay="50"
                                                    data-tippy-arrow="true" data-tippy-theme="sharpborder">
                                                    <i className="fa fa-facebook"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" data-tippy="Twitter" data-tippy-inertia="true"
                                                    data-tippy-animation="shift-away" data-tippy-delay="50"
                                                    data-tippy-arrow="true" data-tippy-theme="sharpborder">
                                                    <i className="fa fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" data-tippy="Pinterest" data-tippy-inertia="true"
                                                    data-tippy-animation="shift-away" data-tippy-delay="50"
                                                    data-tippy-arrow="true" data-tippy-theme="sharpborder">
                                                    <i className="fa fa-pinterest"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="team-content">
                                <h2 className="team-member-name mb-0">Britney Cooper</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 pt-5 pt-sm-0">
                        <div className="team-item">
                            <div className="team-img">
                                <img src="assets/images/about/team/1-4-270x270.png" alt="Team Member"/>
                                <div className="inner-content">
                                    <h2 className="team-member-name">Marissa Swan</h2>
                                    <span className="occupation">Sales man</span>
                                    <div className="social-link with-border">
                                        <ul>
                                            <li>
                                                <a href="#" data-tippy="Facebook" data-tippy-inertia="true"
                                                    data-tippy-animation="shift-away" data-tippy-delay="50"
                                                    data-tippy-arrow="true" data-tippy-theme="sharpborder">
                                                    <i className="fa fa-facebook"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" data-tippy="Twitter" data-tippy-inertia="true"
                                                    data-tippy-animation="shift-away" data-tippy-delay="50"
                                                    data-tippy-arrow="true" data-tippy-theme="sharpborder">
                                                    <i className="fa fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" data-tippy="Pinterest" data-tippy-inertia="true"
                                                    data-tippy-animation="shift-away" data-tippy-delay="50"
                                                    data-tippy-arrow="true" data-tippy-theme="sharpborder">
                                                    <i className="fa fa-pinterest"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="team-content">
                                <h2 className="team-member-name mb-0">Marissa Swan</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Begin Brand Area --> */}
        <div className="brand-area section-space-y-axis-100">
            <div className="container">
                <div className="brand-bg" data-bg-image="assets/images/brand/bg/1-1170x300.jpg">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="swiper-container brand-slider">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <a className="brand-item" href="#">
                                            <img src="assets/images/brand/1-1.png" alt="Brand Image"/>
                                        </a>
                                    </div>
                                    <div className="swiper-slide">
                                        <a className="brand-item" href="#">
                                            <img src="assets/images/brand/1-2.png" alt="Brand Image"/>
                                        </a>
                                    </div>
                                    <div className="swiper-slide">
                                        <a className="brand-item" href="#">
                                            <img src="assets/images/brand/1-3.png" alt="Brand Image"/>
                                        </a>
                                    </div>
                                    <div className="swiper-slide">
                                        <a className="brand-item" href="#">
                                            <img src="assets/images/brand/1-4.png" alt="Brand Image"/>
                                        </a>
                                    </div>
                                    <div className="swiper-slide">
                                        <a className="brand-item" href="#">
                                            <img src="assets/images/brand/1-5.png" alt="Brand Image"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Brand Area End Here --> */}

    </main>
    {/* <!-- Main Content Area End Here --> */}
</>
  )
}

export default About