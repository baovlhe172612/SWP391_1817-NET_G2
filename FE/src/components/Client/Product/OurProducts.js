import React, { useEffect, useState } from "react";
import Product from "./Product";
import { get } from "../../../helpers/API.helper";

function OurProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(
          "http://localhost:5264/api/ProductSizes/getFourProductMin"
        );
        //
        setProducts(data);
      } catch (error) {
        console.log("Lỗi tại OurProducts", error);
        setProducts([]);
      }
    };

    fetchApi();
  }, []);

  return (
    <>
      {/* <!-- Begin Product Area --> */}
      <div class="product-area section-space-top-100">
        <div class="container">
          <div class="section-title-wrap m-2">
            <h2 class="section-title mb-0">Drinks Sale</h2>
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

                    {products.length > 0 && products.map(product => {
                      return (
                        <Product product={product}/>
                      )
                    })}

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