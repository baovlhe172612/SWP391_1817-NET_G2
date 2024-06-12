import React from "react";
import { Container, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import CartItem from "../Cart/CartItem.js"
import { clearCart } from "../../../reducers/cartSlice.js";
import { Link } from "react-router-dom";
import { Button } from "antd";

function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const handleDeleteAll = () => {

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
                            <Link to="/">Home</Link>
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
                      {cart?.list.length > 0 ? (<>
                        <div>
                          <button
                            style={{
                              marginBottom: "20px",
                              backgroundColor: "green",
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
                        <Row gutter={16}>
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
                        </Row>
                        <div className="row" >
                          <div className="col-md-5 ml-auto">
                            <div className="cart-page-total">
                              <h2>Total Price</h2>
                              <ul>
                                <li style={{
                                  fontSize: '18px',
                                  fontWeight: '800',
                                  padding: '15px 0px',
                                }}>
                                  Total  <span>  Total: {cart?.total.toLocaleString('vi-VN')}đ</span>
                                </li>
                              </ul>
                              <Link
                                to=""
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  textAlign: 'center',
                                  width: '100%',
                                  padding: '10px 20px',
                                  textDecoration: 'none', // Important to remove underline
                                  color: '#fff', // Use hex color without !important
                                  backgroundColor: 'green', 
                                  borderRadius: '5px',
                                  fontWeight: 'bold',
                                }}

                              >
                                Proceed to checkout
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>) : ((
                        <div style={{ textAlign: 'center', padding: '50px 0' }}>
                          <h3 style={{color:'green', marginBottom:'10%'}}>Your cart is empty</h3>
                          <p>
                            <Link
                              to="/"
                              style={{
                                color: '#007bff',
                                textDecoration: 'underline',
                                fontWeight: 'bold',
                               
                              }}
                            >
                              <Button type="primary" > Continue shopping</Button>
                             
                            </Link>
                          </p>
                        </div>
                      ))}


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
