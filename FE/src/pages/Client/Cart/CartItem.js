import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styles from "./CartItem.module.css";
import { Avatar, Card, Col, Row } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta.js";
import { removeItem, updateQuantity } from "../../../actions/CartAction";

export default function CartItem({ data, onItemChange }) {
    const dispatch = useDispatch();
    
    const [quantity, setQuantity] = useState(data?.quantity);
    const [totalPrice, setTotalPrice] = useState(data?.price * data?.quantity);

    
    const handleChange = (e) => {
        const value = parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1;
        setQuantity(value);
    };

    const handleRemove = () => {
        //console.log("OK")
        dispatch(removeItem(data?.productSizeID));
        onItemChange(data.productSizeID, 0, data.price); 
    };

    useEffect(() => {
        setTotalPrice(data?.price * quantity);
        dispatch(updateQuantity( data?.productSizeID, quantity ));
        onItemChange(data.productSizeID, quantity, data.price);
    }, [quantity, data?.price, data?.productSizeID, dispatch]);

    return (
        <>
            <div>
                <Col lg={24} md={24} xs={48}>
                    <Card
                        style={{
                            width: '100%',
                            marginBottom: "10px",
                        }}
                    >
                        <button
                            onClick={handleRemove}
                            style={{
                                // position: 'absolute',
                                // top: '10px',
                                // right: '10px',
                                border: 'none',
                                background: 'none',
                                backgroundColor: 'green',
                                fontSize: '10px',
                                cursor: 'pointer',
                                color: 'white',
                                fontWeight: '800',


                            }}
                        >
                            {/* &times; */}X
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: '0 0 20%' }}>
                                <img src={data.img} />
                            </div>
                            <div style={{ flex: '1' }}>
                                {/* <Meta
                                title="Card title"
                                description=""
                            /> */}
                                <Col lg={12} md={12} xs={20}>
                                    <a href="#"> {data.productName} Size {data.sizeName}</a>
                                </Col>
                                <Col lg={12} md={12} xs={48}>
                                    <div className="amount"> {data.price.toLocaleString('vi-VN')}đ * {quantity}</div>
                                </Col>

                            </div>
                            <div>
                                <Col lg={24} md={24} xs={24}>
                                    <div className="amount" style={{

                                        fontSize: '15px',

                                        fontWeight: '700',


                                    }} >   Total: {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}</div>
                                </Col>
                                <Col lg={24} md={24} xs={22}>
                                    <div className="cart-plus-minus">
                                        <div className="dec qtybutton d-flex align-items-center justify-content-center">
                                            <button className={styles.changeBtn} onClick={() => {
                                                if (quantity > 1) {
                                                    setQuantity(pre => pre - 1);
                                                }
                                            }}>-</button>
                                            <input value={quantity} className={styles.input} onChange={handleChange} />
                                            <button className={styles.changeBtn} onClick={() => setQuantity(pre => pre + 1)}>+</button>
                                        </div>
                                    </div>
                                </Col>
                            </div>

                            {/* <div className="product-subtotal">
                                <span className="amount">{totalPrice}đ</span>
                            </div> */}
                        </div>


                    </Card>


                </Col>
            </div>







        </>
    );
}