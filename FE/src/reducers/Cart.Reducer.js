import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM_QUANTITY } from "../actions/CartActions";


const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
         ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
             ? {...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
         ...state,
          items: [...state.items, {...action.payload, quantity: 1 }],
        };
      }
    case REMOVE_ITEM:
      return {
       ...state,
        items: state.items.filter((item) => item.id!== action.payload),
      };
    case UPDATE_ITEM_QUANTITY:
      return {
       ...state,
        items: state.items.map((item) =>
          item.id === action.payload.itemId
           ? {...item, quantity: action.payload.newQuantity }
            : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;