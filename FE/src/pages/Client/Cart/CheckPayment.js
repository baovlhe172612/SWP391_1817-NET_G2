import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../../actions/CartAction';
import Swal from 'sweetalert2';
import { API_ORDER, LOCALHOST_API } from '../../../helpers/APILinks';
import { post, put } from '../../../helpers/API.helper';
import { message } from 'antd';
import { deleteCookie, getCookie, setCookie } from '../../../helpers/Cookie.helper';
import { useNavigate } from 'react-router-dom';

const CheckPayment = ({ totalMoney, txt, dataToSend, value, note }) => {
    const navigate = useNavigate();

    console.log({ totalMoney, txt })
    const [paidLoad, setPaidLoad] = useState(0);
    const cart = useSelector(state => state.cart);
    console.log({ cart })

    let storeId = getCookie('storeId');
    let tableId = getCookie('tableId');

    console.log({ storeId, tableId, value, note, dataToSend })

    const dispatch = useDispatch();

    const saveInDb = useMemo(() => {
        const check = async () => {
            try {
                const response = await post(`${API_ORDER}/AddOrderDetail?payMentID=${value}&note=${note}&storeId=${storeId}&tableId=${tableId}`, dataToSend);
                const responseData = response;
                message.success('Đã mua hàng thành công!');
            } catch (error) {
                // console.log('Error sending data:', error);
                message.error('Mua hàng không thành công!!!!');
            }
        }

        return check;
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            async function checkPay() {
                const response = await fetch(
                    "https://script.googleusercontent.com/macros/echo?user_content_key=r7S_GvxGdl-AfJpjkd5NbAroWLxgDYeb3iVz7_Hh_D0vdVHQqPStrpkJrAK1HTU7dtp_vX5o7PXhT3KEaMpM6nkmGomLPKx0m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnP8argURt8ZMi-D9kZTDB-XnFQusGZK8JqhXpRuMQQ_q4VyKGvX2akzZ2O6nv5L9CzJMyn4zYaK-bb32IMZwRWAlcauYPO8yng&lib=MHlL8RN1boYWEFmcjcb_Mjs9owhmw9jII"
                );
                const data = await response.json();
                // console.log(data);
                data.data.forEach(item => {
                    console.log({item})

                    if (item["Mô tả"].includes(txt)) {
                        console.log("checkkkkkkkkkkkkkkkkkkkkkkkkkkk: " + item["Mô tả"].includes(txt));
                        if (item["Giá trị"] === totalMoney) {
                            setPaidLoad(1);
                            Swal.fire({
                                title: "Payment Successful!",
                                text: "Thank you. Enjoy your meal!",
                                icon: "success",
                            });
                            // alert("Thanh toán thành công !!!!")
                            if (dataToSend.length > 0) {
                                let checkPay = getCookie('checkPay');

                                if(checkPay) {
                                    deleteCookie("checkPay")
                                } else {
                                    saveInDb();
                                    setCookie("checkPay", 1, 1)
                                }
                            } else {
                                message.error('Mua hàng không thành công!!!!');
                            }
                            // updateOrderStatus();
                            dispatch(clearCart());
                            //
                            clearInterval(interval);
                            // console.log(1);

                        } else {
                            setPaidLoad(0);
                        }
                    }
                });
            }

            checkPay();
        }, 1000 * 5);

        return () => clearInterval(interval);
    }, [totalMoney, txt]);

    return (
        <input type="hidden" id="paidLoad" value={paidLoad} />
    );
};

export default CheckPayment;


