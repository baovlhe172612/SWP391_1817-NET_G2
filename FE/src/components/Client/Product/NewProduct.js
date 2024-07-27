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
          <div class="">
            <div class="section-title-wrap without-tab">
              <h2 class="section-title">New Drinks</h2>
              <p class="section-desc">
                the refreshing new drinks combine the zesty flavors of citrus
                with a touch of natural sweetness. Perfectly crafted for those
                looking for a burst of flavor in every sip, Sparkle Bliss is
                more than just a drink, it's an experience. Packed with
                essential vitamins and antioxidants, it is the ideal choice for
                a healthy, vibrant lifestyle. Whether you're on the go, at the
                gym or relaxing with friends, Sparkle Bliss is your new drink to
                energize. Try it today and feel the sparkle in every drop!
              </p>
            </div>

            <div class="">
              <div class="col-lg-12 mb-3">
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="featured"
                    role="tabpanel"
                    aria-labelledby="featured-tab"
                  >
                    <div class="product-item-wrap row" style={{ "gutter-x": "0rem" }}>
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