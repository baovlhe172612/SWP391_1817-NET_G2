import React, { useCallback, useState } from "react";
import { Container, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import CartItem from "../Cart/CartItem.js"
import { post } from "../../../helpers/API.helper.js";
import { Link } from "react-router-dom";
import { Button, message } from "antd";
import { clearCart } from "../../../actions/CartAction.js";
import CheckoutModal from "./CheckoutModal.js";
import { API_ORDER } from "../../../helpers/APILinks.js";
import { getCookie, setCookie } from "../../../helpers/Cookie.helper.js";

function Cart() {
  const cart = useSelector(state => state.cart);
  const [cartData, setCartData] = useState(cart.list || []);

  const [cartDataModal, setCartDataModal] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  let storeId = getCookie('storeId');
  let tableId = getCookie('tableId');



  // Kiểm tra nếu cookie không tồn tại, đặt giá trị mặc định
  if (!storeId) {
    storeId = -1;
  }
  if (!tableId) {
    tableId = -1;
  }

  
  const dispatch = useDispatch();
  const handleDeleteAll = () => {

    dispatch(clearCart());
    setCartData([]);
  }


  // show modal
  const showModal = () => {
    setIsModalVisible(true);

    //console.log(cartData);

    const dataToSend = cartData
      .filter(item => item.quantity > 0) // Lọc ra những sản phẩm có số lượng lớn hơn 0
      .map(item => ({
        productSizeID: item.productSizeID,
        productName: `${item.productName} - ${item.sizeName}`,
        quantity: item.quantity,
        price: item.price,
      }));


    console.log("dataToSend", dataToSend);
    setCartDataModal(dataToSend);
  };

  const handleOk = async (formValues) => {
    setIsModalVisible(false);

    var note = formValues.notes;

    if (note === undefined) {
      note = null;
    }

    handleCheckout(formValues.paymentMethod, note);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //item change
  const handleItemChange = useCallback((productSizeID, newQuantity, newPrice) => {
    setCartData(prevCartData =>
      prevCartData.map(item =>
        item.productSizeID === productSizeID ? {
          ...item,
          quantity: newQuantity, price: newPrice * newQuantity
        } : item
      )
    );


  }, []);


  //checkout
  const handleCheckout = async (value, note) => {
    const dataToSend = cartData
      .filter(item => item.quantity > 0) // Lọc ra những sản phẩm có số lượng lớn hơn 0
      .map(item => ({
        productSizeID: item.productSizeID,
        quantity: item.quantity,
        price: item.price,
      }));



    // console.log("dataToSend: ", dataToSend)
    // console.log("data 36: " + JSON.stringify(dataToSend, null, 2));

    if (dataToSend !== null && dataToSend.length > 0) {
      try {

        const response = await post(`${API_ORDER}/AddOrderDetail?payMentID=${value}&note=${note}&storeId=${storeId}&tableId=${tableId}`, dataToSend);

        const responseData = response;
        //console.log('Response:', responseData);
        message.success('Đã mua hàng thành công!');
      } catch (error) {
        console.log('Error sending data:', error);
      }
    } else {
      message.error('Mua hàng không thành công!!!!');
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
                                  onItemChange={handleItemChange}
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
                              <Button
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
                                onClick={showModal}                             
                              >
                                Proceed to checkout
                              </Button>
                              <CheckoutModal handleDeleteAll={handleDeleteAll} isVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} cartDataModal={cartDataModal} />
                            </div>
                          </div>
                        </div>
                      </>) : ((
                        <div style={{ textAlign: 'center', padding: '50px 0' }}>
                          <h3 style={{ color: 'green', marginBottom: '10%' }}>Your cart is empty</h3>
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