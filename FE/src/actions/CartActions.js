export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = (itemId) => ({
  type: REMOVE_ITEM,
  payload: itemId,
});

export const updateItemQuantity = (itemId, newQuantity) => ({
  type: UPDATE_ITEM_QUANTITY,
  payload: { itemId, newQuantity },
});