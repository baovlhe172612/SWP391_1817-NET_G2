import React, { useEffect, useState } from "react";
import Product from "../../../components/Client/Product/Product"
import { useParams } from "react-router-dom";
import {setCookie} from "../../../helpers/Cookie.helper"
import { get } from "../../../helpers/API.helper";

function ListProduct() {
  return (
    <>
      <div class="shop-area section-space-y-axis-100">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">

                {/* ========== UL =============== */}
              <div class="product-topbar">
                <ul>
                  <li class="page-count">
                    <span>4</span> Product Found of <span>{totalProduct}</span>
                  </li>
                  <li class="product-view-wrap">
                    <ul class="nav" role="tablist">
                      <li class="grid-view" role="presentation">
                        <a
                          class="active"
                          id="grid-view-tab"
                          data-bs-toggle="tab"
                          href="#grid-view"
                          role="tab"
                          aria-selected="true"
                        >
                          <i class="fa fa-th"></i>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="short">
                    <select class="nice-select">
                      <option value="1">Sort by Default</option>
                      <option value="2">Sort by Popularity</option>
                      <option value="3">Sort by Rated</option>
                      <option value="4">Sort by Latest</option>
                      <option value="5">Sort by High Price</option>
                      <option value="6">Sort by Low Price</option>
                    </select>
                  </li>
                </ul>
              </div>
                {/* ========== UL =============== */}

              {/* ================ TAB - CONTENT =================== */}
              <div class="tab-content">
                <div
                  class="tab-pane fade show active"
                  id="grid-view"
                  role="tabpanel"
                  aria-labelledby="grid-view-tab"
                >
                  <div class="product-grid-view row g-y-20">
                    {/* <!-- PRODUCT --> */}
                    {products.length > 0 && products.map(product => {
                      return (
                        <Product product={product}/>
                      )
                      })}
                      {/* <!-- PRODUCT --> */}
                  </div>
                </div>
              </div>
              {/* ================ TAB - CONTENT =================== */}
                                  
              {/* ================ PAGINATION =================== */}
              <div class="pagination-area">
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">


                  {totalPages.map((item, index) => (
                       //<li key={index}>{item.tenTruong}</li> // Thay "tenTruong" bằng trường dữ liệu thực tế từ API
                       <li class="page-item active">
                       <li class={`page-item ${item === currentPage ? 'active' : ''}`}  onClick={() => {handleDataByPage(item)}} style={{ cursor: 'pointer' }}>
                          {item}
                       </li>
                     </li>
                  ))}

                   
                  </ul>
                </nav>
              </div>
              {/* ================ PAGINATION =================== */}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListProduct;