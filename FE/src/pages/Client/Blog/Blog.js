import React from 'react'

function Blog() {
  return (
    <>
      <div class="main-content">
            <div class="breadcrumb-area breadcrumb-height" data-bg-image="assets/images/breadcrumb/bg/1-1-1919x388.jpg">
                <div class="container h-100">
                    <div class="row h-100">
                        {/* Phần dưới chữ Bog */}
                        <div class="col-lg-12">
                            <div class="breadcrumb-item">
                                <h2 class="breadcrumb-heading">Blog</h2>
                                <ul>
                                    <li>
                                        <a href="/">Home</a>
                                    </li>
                                    <li>Blog Grid View</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="blog-area section-space-y-axis-100">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-3 col-lg-4 order-2 pt-5 pt-lg-0">
                            <div class="sidebar-area">
                                {/* Thanh search bên tay phải:  */}
                                <div class="widgets-searchbox">
                                    <form id="widgets-searchbox">
                                        <input class="input-field" type="text" placeholder="Search"/>
                                        <button class="widgets-searchbox-btn" type="submit">
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </form>
                                </div>

                                {/* Category cho từng sản phẩm  */}
                                <div class="widgets-area">
                                    <div class="widgets-item pt-0">
                                        <h2 class="widgets-title mb-4">Categories</h2>
                                        <ul class="widgets-category">
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-chevron-right"></i>
                                                    All <span>(65)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-chevron-right"></i>
                                                    Trà sữa <span>(12)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-chevron-right"></i>
                                                    Cà Phê <span>(22)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-chevron-right"></i>
                                                    Nước ép <span>(19)</span>
                                                </a>
                                            </li>
                                                                                                                              
                                        </ul>                                      
                                    </div>

                                    {/* Bài đăng gần đây */}
                                    <div class="widgets-item">
                                        <h2 class="widgets-title mb-4">Recent Post</h2>
                                        <div class="swiper-container widgets-list-slider">
                                            <div class="swiper-wrapper">
                                                <div class="swiper-slide">
                                                    <div class="widgets-list-item">
                                                        <div class="widgets-list-img">
                                                            <a href="#">
                                                                <img class="img-full" src="assets/images/blog/small-size/1-1-70x70.png" alt="Blog Images"/>
                                                            </a>
                                                        </div>
                                                        <div class="widgets-list-content">
                                                            <div class="widgets-meta">
                                                                <ul>
                                                                    <li class="date">
                                                                        24 April 2021
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <h2 class="title mb-0">
                                                                <a href="#">Lorem ipsum dolo
                                                                    conse tetur.</a>
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="swiper-slide">
                                                    <div class="widgets-list-item">
                                                        <div class="widgets-list-img">
                                                            <a href="#">
                                                                <img class="img-full" src="assets/images/blog/small-size/1-2-70x70.png" alt="Blog Images"/>
                                                            </a>
                                                        </div>
                                                        <div class="widgets-list-content">
                                                            <div class="widgets-meta">
                                                                <ul>
                                                                    <li class="date">
                                                                        24 April 2021
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <h2 class="title mb-0">
                                                                <a href="#">Lorem ipsum dolo
                                                                    conse tetur.</a>
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="swiper-slide">
                                                    <div class="widgets-list-item">
                                                        <div class="widgets-list-img">
                                                            <a href="#">
                                                                <img class="img-full" src="assets/images/blog/small-size/1-3-70x70.png" alt="Blog Images"/>
                                                            </a>
                                                        </div>
                                                        <div class="widgets-list-content">
                                                            <div class="widgets-meta">
                                                                <ul>
                                                                    <li class="date">
                                                                        24 April 2021
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <h2 class="title mb-0">
                                                                <a href="#">Lorem ipsum dolo
                                                                    conse tetur.</a>
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="swiper-slide without-border">
                                                    <div class="widgets-list-item">
                                                        <div class="widgets-list-img">
                                                            <a href="#">
                                                                <img class="img-full" src="assets/images/blog/small-size/1-1-70x70.png" alt="Blog Images"/>
                                                            </a>
                                                        </div>
                                                        <div class="widgets-list-content">
                                                            <div class="widgets-meta">
                                                                <ul>
                                                                    <li class="date">
                                                                        24 April 2021
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <h2 class="title mb-0">
                                                                <a href="#">Lorem ipsum dolo
                                                                    conse tetur.</a>
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Đồ uống phổ biến */}
                                    <div class="widgets-item">
                                        <h2 class="widgets-title mb-4">Đồ uống phổ biến</h2>
                                        <ul class="widgets-tag">
                                            <li>
                                                <a href="#">Fashion</a>
                                            </li>
                                            <li>
                                                <a href="#">Organic</a>
                                            </li>
                                            <li>
                                                <a href="#">Old Fashion</a>
                                            </li>
                                            <li>
                                                <a href="#">Men</a>
                                            </li>
                                            <li>
                                                <a href="#">Fashion</a>
                                            </li>
                                            <li>
                                                <a href="#">Dress</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>                              
                               
                            </div>
                        </div>

                        {/* Bên trái: Danh sách các bài đăng */}
                        <div class="col-xl-9 col-lg-8 order-1">
                            <div class="blog-item-wrap row g-y-30">
                                <div class="col-md-6">
                                    <div class="blog-item">
                                        <div class="blog-content">
                                            <div class="blog-meta">
                                                <ul>
                                                    <li class="author">
                                                        <a href="#">By: Admin</a>
                                                    </li>
                                                    <li class="date">24 April 2021</li>
                                                </ul>
                                            </div>
                                            <h2 class="title">
                                                <a href="blog-detail.html">There Many Variations</a>
                                            </h2>
                                            <p class="short-desc mb-7">Lorem ipsum dolor sit amet, consecteturl adipisl elit,
                                                sed do eiusmod tempor incidio ut labore et dolore magna aliqua.</p>
                                        </div>
                                        <div class="blog-img img-hover-effect">
                                            <a href="blog-detail.html">
                                                <img class="img-full" src="assets/images/blog/medium-size/1-1-310x220.jpg" alt="Blog Image"/>
                                            </a>
                                            <div class="inner-btn-wrap">
                                                <a class="inner-btn" href="blog-detail.html">
                                                    <i class="pe-7s-link"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="swiper-container single-blog-slider">
                                        <div class="swiper-wrapper">
                                            <div class="swiper-slide">
                                                <div class="blog-item">
                                                    <div class="blog-content">
                                                        <div class="blog-meta">
                                                            <ul>
                                                                <li class="author">
                                                                    <a href="#">By: Admin</a>
                                                                </li>
                                                                <li class="date">24 April 2021</li>
                                                            </ul>
                                                        </div>
                                                        <h2 class="title">
                                                            <a href="blog-detail.html">Blog Gallery Post</a>
                                                        </h2>
                                                        <p class="short-desc mb-7">Lorem ipsum dolor sit amet, consecteturl
                                                            adipisl elit,
                                                            sed do eiusmod tempor incidio ut labore et dolore magna aliqua.</p>
                                                    </div>
                                                    <div class="blog-img img-hover-effect">
                                                        <a href="blog-detail.html">
                                                            <img class="img-full" src="assets/images/blog/medium-size/1-3-310x220.jpg" alt="Blog Image"/>
                                                        </a>
                                                        <div class="inner-btn-wrap">
                                                            <a class="inner-btn" href="blog-detail.html">
                                                                <i class="pe-7s-link"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="swiper-slide">
                                                <div class="blog-item">
                                                    <div class="blog-content">
                                                        <div class="blog-meta">
                                                            <ul>
                                                                <li class="author">
                                                                    <a href="#">By: Admin</a>
                                                                </li>
                                                                <li class="date">24 April 2021</li>
                                                            </ul>
                                                        </div>
                                                        <h2 class="title">
                                                            <a href="blog-detail.html">Blog Second Gallery Post</a>
                                                        </h2>
                                                        <p class="short-desc mb-7">Lorem ipsum dolor sit amet, consecteturl
                                                            adipisl elit,
                                                            sed do eiusmod tempor incidio ut labore et dolore magna aliqua.</p>
                                                    </div>
                                                    <div class="blog-img img-hover-effect">
                                                        <a href="blog-detail.html">
                                                            <img class="img-full" src="assets/images/blog/medium-size/1-2-310x220.jpg" alt="Blog Image"/>
                                                        </a>
                                                        <div class="inner-btn-wrap">
                                                            <a class="inner-btn" href="blog-detail.html">
                                                                <i class="pe-7s-link"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="swiper-slide">
                                                <div class="blog-item">
                                                    <div class="blog-content">
                                                        <div class="blog-meta">
                                                            <ul>
                                                                <li class="author">
                                                                    <a href="#">By: Admin</a>
                                                                </li>
                                                                <li class="date">24 April 2021</li>
                                                            </ul>
                                                        </div>
                                                        <h2 class="title">
                                                            <a href="blog-detail.html">Blog Third Gallery Post</a>
                                                        </h2>
                                                        <p class="short-desc mb-7">Lorem ipsum dolor sit amet, consecteturl
                                                            adipisl elit,
                                                            sed do eiusmod tempor incidio ut labore et dolore magna aliqua.</p>
                                                    </div>
                                                    <div class="blog-img img-hover-effect">
                                                        <a href="blog-detail.html">
                                                            <img class="img-full" src="assets/images/blog/medium-size/1-1-310x220.jpg" alt="Blog Image"/>
                                                        </a>
                                                        <div class="inner-btn-wrap">
                                                            <a class="inner-btn" href="blog-detail.html">
                                                                <i class="pe-7s-link"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="blog-item">
                                        <div class="blog-content">
                                            <div class="blog-meta">
                                                <ul>
                                                    <li class="author">
                                                        <a href="#">By: Admin</a>
                                                    </li>
                                                    <li class="date">24 April 2021</li>
                                                </ul>
                                            </div>
                                            <h2 class="title">
                                                <a href="blog-detail.html">Blog Audio Post</a>
                                            </h2>
                                            <p class="short-desc mb-7">Lorem ipsum dolor sit amet, consecteturl adipisl elit,
                                                sed do eiusmod tempor incidio ut labore et dolore magna aliqua.</p>
                                        </div>
                                        <div class="ratio ratio-16x9">
                                            <iframe allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/182537870&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true"></iframe>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="blog-item">
                                        <div class="blog-content">
                                            <div class="blog-meta">
                                                <ul>
                                                    <li class="author">
                                                        <a href="#">By: Admin</a>
                                                    </li>
                                                    <li class="date">24 April 2021</li>
                                                </ul>
                                            </div>
                                            <h2 class="title">
                                                <a href="blog-detail.html">Blog Video Post</a>
                                            </h2>
                                            <p class="short-desc mb-7">Lorem ipsum dolor sit amet, consecteturl adipisl elit,
                                                sed do eiusmod tempor incidio ut labore et dolore magna aliqua.</p>
                                        </div>
                                        <div class="ratio ratio-16x9">
                                            <iframe src="https://www.youtube.com/embed/ovs-7L5WEPM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
                                            </iframe>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="blog-item">
                                        <div class="blog-content">
                                            <div class="blog-meta">
                                                <ul>
                                                    <li class="author">
                                                        <a href="#">By: Admin</a>
                                                    </li>
                                                    <li class="date">24 April 2021</li>
                                                </ul>
                                            </div>
                                            <h2 class="title">
                                                <a href="blog-detail.html">There Many Variations</a>
                                            </h2>
                                            <p class="short-desc mb-7">Lorem ipsum dolor sit amet, consecteturl adipisl elit,
                                                sed do eiusmod tempor incidio ut labore et dolore magna aliqua.</p>
                                        </div>
                                        <div class="blog-img img-hover-effect">
                                            <a href="blog-detail.html">
                                                <img class="img-full" src="assets/images/blog/medium-size/1-2-310x220.jpg" alt="Blog Image"/>
                                            </a>
                                            <div class="inner-btn-wrap">
                                                <a class="inner-btn" href="blog-detail.html">
                                                    <i class="pe-7s-link"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="blog-item">
                                        <div class="blog-content">
                                            <div class="blog-meta">
                                                <ul>
                                                    <li class="author">
                                                        <a href="#">By: Admin</a>
                                                    </li>
                                                    <li class="date">24 April 2021</li>
                                                </ul>
                                            </div>
                                            <h2 class="title">
                                                <a href="blog-detail.html">There Many Variations</a>
                                            </h2>
                                            <p class="short-desc mb-7">Lorem ipsum dolor sit amet, consecteturl adipisl elit,
                                                sed do eiusmod tempor incidio ut labore et dolore magna aliqua.</p>
                                        </div>
                                        <div class="blog-img img-hover-effect">
                                            <a href="blog-detail.html">
                                                <img class="img-full" src="assets/images/blog/medium-size/1-3-310x220.jpg" alt="Blog Image"/>
                                            </a>
                                            <div class="inner-btn-wrap">
                                                <a class="inner-btn" href="blog-detail.html">
                                                    <i class="pe-7s-link"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pagination-area">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination justify-content-end">
                                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                        <li class="page-item">
                                            <a class="page-link" href="#" aria-label="Next">&raquo;</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Blog