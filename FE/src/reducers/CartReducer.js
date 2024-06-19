// cartReducer.js

import { ADD_TO_CART, CLEAR_CART, REMOVE_ITEM, UPDATE_QUANTITY } from "../actions/CartAction";


const getInitialState = () => {
    const savedState = localStorage.getItem('cart');
    return savedState ? JSON.parse(savedState) : { list: [], total: 0 };
};
console.log("getInitialState", getInitialState)

const cartReducer = (state = getInitialState(), action) => {
    console.log("state", state)
    console.log("action", action)
    const validState = {
        list: Array.isArray(state.list) ? state.list : [],
        total: typeof state.total === 'number' ? state.total : 0,
    };
    switch (action.type) {
        //     case ADD_TO_CART: {
        //         const check = state.list.findIndex(product => product.productSizeID === action.payload.productSizeID);
        //         let updatedList;
        //         if (check !== -1) {
        //             updatedList = state.list.map((product, index) =>
        //                 index === check ? { ...product, quantity: product.quantity + action.payload.quantity } : product
        //             );
        //         } else {
        //             updatedList = [...state.list, action.payload];
        //         }
        //         const total = updatedList.reduce((sum, product) => sum + product.price * product.quantity, 0);
        //         return { ...state, list: updatedList, total };
        //     }
        case ADD_TO_CART: {
            const { productSizeID, quantity } = action.payload;
            if (productSizeID == null || quantity == null) {
                console.error("Invalid payload for ADD_TO_CART:", action.payload);
                return validState;
            }

            const check = validState.list.findIndex(product => product.productSizeID === productSizeID);
            let updatedList;
            if (check !== -1) {
                updatedList = validState.list.map((product, index) =>
                    index === check ? { ...product, quantity: product.quantity + quantity } : product
                );
            } else {
                updatedList = [...validState.list, action.payload];
            }
            const total = updatedList.reduce((sum, product) => sum + product.price * product.quantity, 0);
            return { ...validState, list: updatedList, total };
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
