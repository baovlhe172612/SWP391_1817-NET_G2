import { ADD_TO_SAVED_CART, CLEAR_SAVED_CART, UPDATE_STATUS } from "../actions/DataSaveCartAction";

const getInitialSavedCartState = () => {
    try {
        const savedState = localStorage.getItem('savedCart');
        return savedState ? JSON.parse(savedState) : [];
      } catch (e) {
        console.error('Failed to load saved cart from localStorage', e);
        return [];
      }
};
const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
const dataSaveCartReducer = (state = getInitialSavedCartState(), action) => {
    switch (action.type) {
        case ADD_TO_SAVED_CART: {
            const updatedSavedCart = [...state, ...action.payload];
            try {
              localStorage.setItem('savedCart', JSON.stringify(updatedSavedCart));
            } catch (e) {
              console.error('Failed to save cart to localStorage', e);
            }
            return updatedSavedCart;
          }
          case CLEAR_SAVED_CART: {
            try {
              localStorage.removeItem('savedCart');
            } catch (e) {
              console.error('Failed to clear saved cart from localStorage', e);
            }
            return [];
          }
          case UPDATE_STATUS: {
            const { productSizeId, datetime, newStatus } = action.payload;
            const updatedCart = state.map(item => {
                // Convert datetime to a comparable format (e.g., ISO 8601)
                const itemDatetime = formatDateTime(item.datetime);
                const actionDatetime = formatDateTime(datetime);
                console.log(itemDatetime)
                console.log(actionDatetime)
                // Compare datetime values with millisecond precision
                if (item.productSizeID == productSizeId && itemDatetime == actionDatetime) {
                  console.log('update1');
                    return { ...item, status: newStatus };   
                }
                return item;
            });
        
            try {
                localStorage.setItem('savedCart', JSON.stringify(updatedCart));
                console.log('Updated cart status in localStorage');
            } catch (e) {
                console.error('Failed to update cart status in localStorage', e);
            }
            
            return updatedCart;
        }
        
          default:
            return state;
        }
};

export default dataSaveCartReducer;