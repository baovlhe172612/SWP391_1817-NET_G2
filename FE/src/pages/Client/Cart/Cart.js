import React, { useCallback, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { post } from "../../../helpers/API.helper";
import { clearCart } from "../../../actions/CartAction";
import CartItem from "../Cart/CartItem";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const [cartData, setCartData] = useState(cart.list || []);

  const dispatch = useDispatch();

  const handleDeleteAll = () => {
    dispatch(clearCart());
    setCartData([]);
  };

  const handleItemChange = useCallback(
    (productSizeID, newQuantity, newPrice) => {
      setCartData((prevCartData) =>
        prevCartData.map((item) =>
          item.productSizeID === productSizeID
            ? { ...item, quantity: newQuantity, price: newPrice * newQuantity }
            : item
        )
      );
    },
    []
  );

  const handleCheckout = async () => {
    const dataToSend = cartData
      .filter((item) => item.quantity > 0) // Lọc ra những sản phẩm có số lượng lớn hơn 0
      .map((item) => ({
        productSizeID: item.productSizeID,
        quantity: item.quantity,
        price: item.price,
      }));

    console.log("dataToSend: ", dataToSend);

    if (dataToSend !== null && dataToSend.length > 0) {
      try {
        const response = await post(
          `http://localhost:5264/api/Order/AddOrderDetail`,
          dataToSend
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Response:", responseData);
        alert("Đã mua hàng thành công!");
      } catch (error) {
        console.error("Error sending data:", error);
        alert("Mua hàng không thành công!!!!");
      }
    } else {
      alert("Mua hàng không thành công!!!!");
    }
  };

  return (
    <Container>
      <div className="main-wrapper">
        {/* Begin Main Content Area */}
        <main className="main-content">
          <div className="breadcrumb-area breadcrumb-height">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-item">
                    <h2 className="breadcrumb-heading">Cart Page</h2>
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
          <div className="cart-area">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  {cart?.list.length > 0 ? (
                    <>
                      <div>
                        <Button
                          style={{
                            marginBottom: "20px",
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={handleDeleteAll}
                        >
                          Delete All
                        </Button>
                      </div>
                      <Row gutter={16}>
                        {cart?.list.map((item) => (
                          <CartItem
                            key={item?.productSizeID}
                            data={item}
                            onItemChange={handleItemChange}
                          />
                        ))}
                      </Row>
                      <div className="row">
                        <div className="col-md-5 ml-auto">
                          <div className="cart-page-total">
                            <h2>Total Price</h2>
                            <ul>
                              <li
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "800",
                                  padding: "15px 0px",
                                }}
                              >
                                Total: {cart?.total.toLocaleString("vi-VN")}đ
                              </li>
                            </ul>
                            <Link
                              to=""
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                width: "100%",
                                padding: "10px 20px",
                                textDecoration: "none",
                                color: "#fff",
                                backgroundColor: "green",
                                borderRadius: "5px",
                                fontWeight: "bold",
                              }}
                              onClick={handleCheckout}
                            >
                              Proceed to checkout
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "50px 0",
                      }}
                    >
                      <h3 style={{ color: "green", marginBottom: "10%" }}>
                        Your cart is empty
                      </h3>
                      <p>
                        <Link
                          to="/"
                          style={{
                            color: "#007bff",
                            textDecoration: "underline",
                            fontWeight: "bold",
                          }}
                        >
                          <Button type="primary">Continue shopping</Button>
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Container>
  );
}

export default Cart;
