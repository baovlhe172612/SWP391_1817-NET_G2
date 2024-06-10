import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"

import { useDispatch } from "react-redux"
import { removeItem, updateQuantity } from "../../../redux/slice/cartSlice.js"
import styles from "./CartItem.module.css"


export default function CartItem({data}) {
    console.log(data);
    const dispatch = useDispatch();
    

    const [quantity, setQuantity] = useState(data?.quantity)
    const [totalPrice, setTotalPrice] = useState(+data?.price * +data?.quantity)

    const handleChange = (e) => {
        const value = parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1
        setQuantity(value)
    }

    const handleRemove = () => {
        dispatch(removeItem({id: data?.productSizeID}))
    }

    useEffect(() => {
        setTotalPrice(data?.price * quantity)
        dispatch(updateQuantity({id: data?.productSizeID, quantity}))
    }, [quantity, data?.price, data?.productSizeID, dispatch])

    return(
      <tr>
      <td class="product_remove">
        <Button  onClick={handleRemove}>
          <i
            class="pe-7s-close"
            data-tippy="Remove"
            data-tippy-inertia="true"
            data-tippy-animation="shift-away"
            data-tippy-delay="50"
            data-tippy-arrow="true"
            data-tippy-theme="sharpborder"
          ></i>
        </Button>
      </td>
      <td class="product-thumbnail">
        <a href="#">
          <img
            src={data.img}
            alt="Cart Thumbnail"
            style={{width: 100}}
          />
        </a>
      </td>
      <td class="product-name">
        <a href="#"> {data.productName} Size {data.sizeName}</a>
      </td>
      <td class="product-price">
        <span class="amount">{data.price}đ</span>
      </td>
      <td class="quantity">
        <div class="cart-plus-minus">
       

          <div class="dec qtybutton d-flex align-items-center justify-content-center">
          <button className={styles.changeBtn} onClick={() => {
                        if (quantity > 1) {
                            setQuantity(pre => pre - 1)
                        }
                    }}>-</button>
                    <input type="number" value={quantity} className={styles.input} onChange={handleChange} />
                    <button className={styles.changeBtn} onClick={() => setQuantity(pre => pre + 1)}>+</button>
            
          </div>
        </div>
      </td>
      <td class="product-subtotal">
        <span class="amount">{totalPrice}đ</span>
      </td>
    </tr>
    )
}