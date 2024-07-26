import React, { useEffect, useState } from "react";
import Product from "./Product";
import { get } from "../../../helpers/API.helper";
import { LIST_FOUR_PRODUCT_SIZE_MAX } from "../../../helpers/APILinks";

function NewProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(
          `${LIST_FOUR_PRODUCT_SIZE_MAX}`
        );
        //
        setProducts(data);
      } catch (error) {
        console.log("Lỗi tại NewProduct", error);
        setProducts([]);
      }
    };

    fetchApi();
  }, []);
  return (
    <>
      <div class="product-area section-space-top-100">
        <div class="container">
          <div class="row">
            <div class="section-title-wrap without-tab">
              <h2 class="section-title">New Drinks</h2>
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
                      {products.length > 0 &&
                        products.map((product) => {
                          return <Product key={product.productSizeID} product={product} />;
                        })}
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