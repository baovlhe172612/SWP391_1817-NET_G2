import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { thunk } from "redux-thunk";
import allReducers from "../reducers";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // Only persist the cart state
};
const persistedReducer = persistReducer(persistConfig, allReducers);
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);