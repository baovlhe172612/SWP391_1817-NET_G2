import React from "react";
import { Container, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import CartItem from "../Cart/CartItem.js"
import { clearCart } from "../../../reducers/cartSlice.js";

function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch(); 
  const handleDeleteAll = () =>{
   
      dispatch(clearCart());
  
  }
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
                            <a href="/">Home</a>
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
                      <div>
                      <button
  style={{
    marginBottom: "20px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer"
  }}
  onClick={handleDeleteAll}
>
  Delete All
</button>

                      </div>
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
                            
                            </tbody>
                          </table>
                        </div>

                        <div class="row">
                          <div class="col-md-5 ml-auto">
                            <div class="cart-page-total">
                              <h2>Cart totals</h2>
                              <ul>                          
                                <li>
                                  Total <span>{cart?.total}đ</span>
                                </li>
                              </ul>
                              
                                <a href="#">Proceed to checkout</a>                            
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
