// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "../../FE/src/redux/slice/store.js" // Import Redux store
import AllRoute from './components/Client/AllRoutes/AllRoute';
import './App.css';
import './assets/css/animate.min.css';
import './assets/css/bootstrap.min.css';
import './assets/css/font-awesome.min.css';
import './assets/css/magnific-popup.min.css';
import './assets/css/nice-select.css';
import './assets/css/Pe-icon-7-stroke.css';
import './assets/css/swiper-bundle.min.css';

function App() {
  return (
    <Provider store={store}>
       <AllRoute />
    </Provider>
  );
}

export default App;
