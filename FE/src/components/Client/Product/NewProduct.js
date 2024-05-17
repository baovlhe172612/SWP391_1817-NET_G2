import React from "react";
import Product from "./Product";

function NewProduct() {
  return (
    <>
      <div class="product-area section-space-top-100">
        <div class="container">
          <div class="row">
            <div class="section-title-wrap without-tab">
              <h2 class="section-title">New Products</h2>
              <p class="section-desc">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature
              </p>
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
      </div>
    </>
  );
}

export default NewProduct;
