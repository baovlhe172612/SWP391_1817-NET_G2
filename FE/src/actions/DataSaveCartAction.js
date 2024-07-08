// DataSaveCartActions.js

export const ADD_TO_SAVED_CART = 'ADD_TO_SAVED_CART';
export const CLEAR_SAVED_CART = 'CLEAR_SAVED_CART';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const addToSavedCart = (payload) => ({
    type: ADD_TO_SAVED_CART,
    payload: payload
});

export const clearSavedCart = () => ({
    type: CLEAR_SAVED_CART
});
export const updateStatus = (productSizeId, datetime, newStatus) => ({
    type: UPDATE_STATUS,
    payload: { productSizeId, datetime, newStatus }
});