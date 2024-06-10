import React from "react";
import { Container, Row, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import CartItem from "../Cart/CartItem.js"

function Cart() {
  const cart = useSelector(state => state.cart)
  return (
    <Container>
      <Row>
    <>
      <div class="main-wrapper">
        {/* <!-- Begin Main Content Area --> */}
        <main class="main-content">
          <div class="breadcrumb-area breadcrumb-height">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="breadcrumb-item">
                    <h2 class="breadcrumb-heading">Cart Page</h2>
                    <ul>
                      <li>
                        <a href="index.html">Home</a>
                      </li>
                      <li>Cart Page</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-area">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <form action="javascript:void(0)">
                    <div class="table-content table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th class="product_remove">remove</th>
                            <th class="product-thumbnail">images</th>
                            <th class="cart-product-name">Product</th>
                            <th class="product-price">Unit Price</th>
                            <th class="product-quantity">Quantity</th>
                            <th class="product-subtotal">Total</th>
                          </tr>
                        </thead>


{/* <!-- product --> */}
                        <tbody>

                          {
                                cart?.list.map(item => {
                                    return (
                                        <CartItem 
                                            key={item?.productSizeID}
                                            data={item}
                                        />
                                    )
                                })
                            }

                          {/* <tr>
                            <td class="product_remove">
                              <a href="#">
                                <i
                                  class="pe-7s-close"
                                  data-tippy="Remove"
                                  data-tippy-inertia="true"
                                  data-tippy-animation="shift-away"
                                  data-tippy-delay="50"
                                  data-tippy-arrow="true"
                                  data-tippy-theme="sharpborder"
                                ></i>
                              </a>
                            </td>
                            <td class="product-thumbnail">
                              <a href="#">
                                <img
                                  src="assets/images/product/small-size/1-3-112x124.png"
                                  alt="Cart Thumbnail"
                                />
                              </a>
                            </td>
                            <td class="product-name">
                              <a href="#">Bleeding Heart</a>
                            </td>
                            <td class="product-price">
                              <span class="amount">$30.45</span>
                            </td>
                            <td class="quantity">
                              <div class="cart-plus-minus">
                                <input
                                  class="cart-plus-minus-box"
                                  value="1"
                                  type="text"
                                />
                                <div class="dec qtybutton">
                                  <i class="fa fa-minus"></i>
                                </div>
                                <div class="inc qtybutton">
                                  <i class="fa fa-plus"></i>
                                </div>
                              </div>
                            </td>
                            <td class="product-subtotal">
                              <span class="amount">$30.45</span>
                            </td>
                          </tr> */}
                        </tbody>
                      </table>
                    </div>

                    <div class="row">
                      <div class="col-md-5 ml-auto">
                        <div class="cart-page-total">
                          <h2>Cart totals</h2>
                          <ul>
                            {/* <li>
                              Subtotal <span>$79.35</span>
                            </li> */}
                            <li>
                              Total <span>{cart?.total}đ</span>
                            </li>
                          </ul>
                          <div class="center-button">
                            <a href="#">Proceed to checkout</a>
                          </div>


                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </>
    </Row>
    </Container>
  );
  
}

export default Cart;
