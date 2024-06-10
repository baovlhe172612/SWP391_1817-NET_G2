import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../../../reducers/cartSlice.js";
import styles from "./CartItem.module.css";

export default function CartItem({ data }) {
    const dispatch = useDispatch();
    
    const [quantity, setQuantity] = useState(data?.quantity);
    const [totalPrice, setTotalPrice] = useState(data?.price * data?.quantity);

    const handleChange = (e) => {
        const value = parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1;
        setQuantity(value);
    };

    const handleRemove = () => {
        dispatch(removeItem({ productSizeID: data?.productSizeID }));
    };

    useEffect(() => {
        setTotalPrice(data?.price * quantity);
        dispatch(updateQuantity({ productSizeID: data?.productSizeID, quantity }));
    }, [quantity, data?.price, data?.productSizeID, dispatch]);

    return(
        <tr>
            <td className="product_remove">
                <Button onClick={handleRemove}>
                    <i
                        className="pe-7s-close"
                        data-tippy="Remove"
                        data-tippy-inertia="true"
                        data-tippy-animation="shift-away"
                        data-tippy-delay="50"
                        data-tippy-arrow="true"
                        data-tippy-theme="sharpborder"
                    ></i>
                </Button>
            </td>
            <td className="product-thumbnail">
                <a href="#">
                    <img
                        src={data.img}
                        alt="Cart Thumbnail"
                        style={{ width: 100 }}
                    />
                </a>
            </td>
            <td className="product-name">
                <a href="#"> {data.productName} Size {data.sizeName}</a>
            </td>
            <td className="product-price">
                <span className="amount">{data.price}đ</span>
            </td>
            <td className="quantity">
                <div className="cart-plus-minus">
                    <div className="dec qtybutton d-flex align-items-center justify-content-center">
                        <button className={styles.changeBtn} onClick={() => {
                            if (quantity > 1) {
                                setQuantity(pre => pre - 1);
                            }
                        }}>-</button>
                        <input type="number" value={quantity} className={styles.input} onChange={handleChange} />
                        <button className={styles.changeBtn} onClick={() => setQuantity(pre => pre + 1)}>+</button>
                    </div>
                </div>
            </td>
            <td className="product-subtotal">
                <span className="amount">{totalPrice}đ</span>
            </td>
        </tr>
    );
}
