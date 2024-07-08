// cartActions.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product
});

export const updateQuantity = (productSizeID, quantity) => ({
    type: UPDATE_QUANTITY,
    payload: { productSizeID, quantity }
});

export const removeItem = (productSizeID) => ({
    type: REMOVE_ITEM,
    payload: { productSizeID }
});

export const clearCart = () => ({
    type: CLEAR_CART
});

