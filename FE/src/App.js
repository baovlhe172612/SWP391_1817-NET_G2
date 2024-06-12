// App.js
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import AllRoute from './components/Client/AllRoutes/AllRoute';
import store from './reducers/CartRoot';
import './App.css';
import './assets/css/animate.min.css'
import './assets/css/bootstrap.min.css'
import './assets/css/font-awesome.min.css'
import './assets/css/magnific-popup.min.css'
import './assets/css/nice-select.css'
import './assets/css/Pe-icon-7-stroke.css'
import './assets/css/swiper-bundle.min.css'
function App() {
  return (
      
         <AllRoute />      
    
  );
}

export default App;
