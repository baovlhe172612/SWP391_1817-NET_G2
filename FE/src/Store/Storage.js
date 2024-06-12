// localStorageMiddleware.js
const localStorageMiddleware = store => next => action => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('cart', JSON.stringify(state.cart)); // Assuming your cart state is nested under 'cart'
    return result;
  };
  export default localStorageMiddleware;
  