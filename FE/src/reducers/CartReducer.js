// cartReducer.js

import { ADD_TO_CART, CLEAR_CART, REMOVE_ITEM, UPDATE_QUANTITY } from "../actions/CartAction";


const getInitialState = () => {
    const savedState = localStorage.getItem('cart');
    return savedState ? JSON.parse(savedState) : { list: [], total: 0 };
};

const cartReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const check = state.list.findIndex(product => product.productSizeID === action.payload.productSizeID);
            let updatedList;
            if (check !== -1) {
                updatedList = state.list.map((product, index) =>
                    index === check ? { ...product, quantity: product.quantity + action.payload.quantity } : product
                );
            } else {
                updatedList = [...state.list, action.payload];
            }
            const total = updatedList.reduce((sum, product) => sum + product.price * product.quantity, 0);
            return { ...state, list: updatedList, total };
        }
        case UPDATE_QUANTITY: {
            const updatedList = state.list.map(product =>
                product.productSizeID === action.payload.productSizeID ? { ...product, quantity: action.payload.quantity } : product
            );
            const total = updatedList.reduce((sum, product) => sum + product.price * product.quantity, 0);
            return { ...state, list: updatedList, total };
        }
        case REMOVE_ITEM: {
            const updatedList = state.list.filter(product => product.productSizeID !== action.payload.productSizeID);
            const total = updatedList.reduce((sum, product) => sum + product.price * product.quantity, 0);
            return { ...state, list: updatedList, total };
        }
        case CLEAR_CART: {
            return { list: [], total: 0 };
        }
        default:
            return state;
    }
};

export default cartReducer;
