// store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // sử dụng local storage
import allReducers from '../reducers';

// Cấu hình persist
const persistConfig = {
  key: 'root',
  storage,
};

// Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, allReducers);

// Tạo store với persisted reducer
const store = createStore(persistedReducer);

// Tạo persisted store
const persistor = persistStore(store);

export { store, persistor };
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store, persistor } from './store';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
