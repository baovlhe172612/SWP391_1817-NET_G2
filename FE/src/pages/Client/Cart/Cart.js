import React, { useCallback, useState } from "react";
import { Container, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import CartItem from "../Cart/CartItem.js"
import { clearCart } from "../../../reducers/cartSlice.js";
import { post } from "../../../helpers/API.helper.js";

function Cart() {
  const cart = useSelector(state => state.cart);
  const [cartData, setCartData] = useState(cart.list || []);

  const dispatch = useDispatch();
  const handleDeleteAll = () => {

    dispatch(clearCart());
    setCartData([]);
  }



  const handleItemChange = useCallback((productSizeID, newQuantity, newPrice) => {
    setCartData(prevCartData =>
      prevCartData.map(item =>
        item.productSizeID === productSizeID ? { ...item, quantity: newQuantity, price: newPrice * newQuantity } : item
      )
    );
  }, []);



  const handleCheckout = async () => {
    const dataToSend = cartData
      .filter(item => item.quantity > 0) // Lọc ra những sản phẩm có số lượng lớn hơn 0
      .map(item => ({
        productSizeID: item.productSizeID,
        quantity: item.quantity,
        price: item.price,
      }));

    //console.log("data 36: " + JSON.stringify(dataToSend, null, 2));

    if (dataToSend !== null && dataToSend.length > 0) {
      try {
        const response = await post(`http://localhost:5264/api/Order/AddOrderDetail`, dataToSend);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);

        }

        const responseData = await response.json();
        console.log('Response:', responseData);
        alert('Đã mua hàng thành công!');
      } catch (error) {
        console.error('Error sending data:', error);
      }
    } else {
      alert('Mua hàng không thành công!!!!');
    }
    
  };

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
                                      onItemChange={handleItemChange}
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

                              <button onClick={handleCheckout}>Proceed to checkout</button>
                              
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
