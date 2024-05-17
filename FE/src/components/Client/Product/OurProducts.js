import React from "react";
import Product from "./Product";

function OurProducts() {
  return (
    <>
      {/* <!-- Begin Product Area --> */}
      <div class="product-area section-space-top-100">
        <div class="container">
          <div class="section-title-wrap m-2">
            <h2 class="section-title mb-0">Our Products</h2>
          </div>
          <div class="row">
            <div class="col-lg-12 mb-3">
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="featured"
                  role="tabpanel"
                  aria-labelledby="featured-tab"
                >
                  <div class="product-item-wrap row">
                    {/* <!-- PRODUCT --> */}
                    <Product />
                    {/* <!-- PRODUCT --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Product Area End Here --></div> */}
    </>
  );
}

export default OurProducts;
