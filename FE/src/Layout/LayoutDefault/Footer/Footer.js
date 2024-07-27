

import React from "react";
import { Link } from "react-router-dom";
import About from "../../../pages/Client/About/About";
import "./Footer.css";

function Footer() {
  return (
    <>
      <div className="footer-area">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-12">
                <div className="footer-widget-item">
                  <div className="footer-widget-logo">
                    <img style={{ paddingRight: '10px' }} src="assets/images/logo/dark.png" alt="Header Logo" />
                  </div>
                  <p className="footer-widget-desc">
                    Our mission is to quench your thirst and nourish your body
                    with meticulously purified water.
                    <br />
                    Perfect for athletes and health-conscious individuals.
                  </p>
                  <div className="social-link">
                    <div style={{ paddingRight: "10px" }}>Follow:</div>
                    <ul>
                      <li><a href="#" className="facebook"><i className="fa fa-facebook"></i></a></li>
                      <li><a href="#" className="twitter"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#" className="pinterest"><i className="fa fa-pinterest"></i></a></li>
                      <li><a href="#" className="dribbble"><i className="fa fa-dribbble"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-6">
                <div className="footer-widget-item">
                  <h3 className="footer-widget-title">Useful Links</h3>
                  <ul className="footer-widget-list-item">
                    <li><Link to={About}>About Pronia</Link></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Contact us</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2 col-md-6">
                <div className="footer-widget-item">
                  <h3 className="footer-widget-title">My Table</h3>
                  <ul className="footer-widget-list-item">
                    <li><a href="#">View Cart</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2 col-md-6">
                <div className="footer-widget-item">
                  <h3 className="footer-widget-title">Customer Service</h3>
                  <ul className="footer-widget-list-item">
                    <li><a href="#">Order Tracking</a></li>
                    <li><a href="#">Wish List</a></li>
                    <li><a href="#">Returns</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2 col-md-6">
                <div className="footer-widget-item">
                  <h3 className="footer-widget-title">Customer Service</h3>
                  <ul className="footer-widget-list-item">
                    <li><a href="#">Order Tracking</a></li>
                    <li><a href="#">Wish List</a></li>
                    <li><a href="#">Returns</a></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-2 col-md-6">
                <div className="footer-widget-item">
                  <h3 className="footer-widget-title">Address: </h3>
                  <ul className="footer-widget-list-item">
                    <li><a href="#">Hoa Lac High Tech Park</a></li>
                    <li><a href="#">Hanoi, Vietnam</a></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="copyright">
                  <span className="copyright-text">
                    © 2024 SWP391 by SE1817_Net_Group2
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;

