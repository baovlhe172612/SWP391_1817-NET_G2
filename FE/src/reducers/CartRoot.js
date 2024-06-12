
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import localStorageMiddleware from '../Store/Storage';

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware)
});

export default store;
