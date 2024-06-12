// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Function to get initial state from localStorage
const getInitialState = () => {
    const savedState = localStorage.getItem('cart');
    return savedState ? JSON.parse(savedState) : { list: [], total: 0 };
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: getInitialState(),
    reducers: {
        addToCart(state, action) {
            const check = state.list.findIndex(product => product.productSizeID === action.payload.productSizeID);
            if (check !== -1) {
                state.list[check].quantity += action.payload.quantity;
            } else {
                state.list.push(action.payload);
            }
            state.total = state.list.reduce((sum, product) => sum + product.price * product.quantity, 0);
        },
        updateQuantity(state, action) {
            const check = state.list.findIndex(product => product.productSizeID === action.payload.productSizeID);
            if (check !== -1) {
                state.list[check].quantity = action.payload.quantity;
            }
            state.total = state.list.reduce((sum, product) => sum + product.price * product.quantity, 0);
        },
        removeItem(state, action) {
            state.list = state.list.filter(product => product.productSizeID !== action.payload.productSizeID);
            state.total = state.list.reduce((sum, product) => sum + product.price * product.quantity, 0);
        },
        clearCart(state) {
            state.list = [];
            state.total = 0;
        }
    }
});

const { actions, reducer } = cartSlice;

export const { addToCart, updateQuantity, removeItem, clearCart  } = actions;

export default reducer;
