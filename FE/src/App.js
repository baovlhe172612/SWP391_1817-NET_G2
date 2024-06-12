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
import { Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Client/Home/Home';
import ListBlog from './pages/Client/Blog/ListBlog';
import BlogDetail from './pages/Client/Blog/BlogDetail';


function App() {

  return (
    // <Provider store={store}>       
    //      <AllRoute />     
    // </Provider>

    <AllRoute />     

  );

  // const AllRoute = () => {
  //   return (
  //     <Router>
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/blog" element={<ListBlog />} />
  //         <Route path="/blog/:id" element={<BlogDetail />} />
  //         {/* Add other routes as needed */}
  //       </Routes>
  //     </Router>
  //   );
  // };
}

export default App;
