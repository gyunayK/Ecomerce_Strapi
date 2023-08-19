import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Catagories</h1>
          <span>Women</span>
          <span>Men</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
       
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">Kadirov</span>
          <span className="copyright">© 2023 All rights reserved</span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="payment" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
