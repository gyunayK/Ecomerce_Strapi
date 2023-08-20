import React from "react";
import {
  BsInstagram,
  BsFacebook,
  BsTwitter,
  BsPinterest,
  BsYoutube,
} from "react-icons/bs";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="group">
          <h1>Categories</h1>
          <div className="items">
            <span>Men</span>
            <span>Women</span>
            <span>Children</span>
            <span>Accessories</span>
            <span>Shoes</span>
            <span>New Arrivals</span>
            <span>Best Sellers</span>
            <span>Release Dates</span>
            <span>Outlet</span>
            <span>kadirov Exclusives</span>
          </div>
        </div>
        <div className="group">
          <h1>SPORTS</h1>
          <div className="items">
            <span>Soccer</span>
            <span>Running</span>
            <span>Basketball</span>
            <span>Training</span>
            <span>Golf</span>
            <span>Hockey</span>
            <span>Outdoor</span>
            <span>Tennis</span>
            <span>Snowboarding</span>
            <span>Volleyball</span>
          </div>
        </div>
        <div className="group">
          <h1>SUPPORT</h1>
          <div className="items">
            <span>Help & Customer Service</span>
            <span>Contact Us</span>
            <span>Returns & Exchanges</span>
            <span>Shipping</span>
            <span>Order Tracker</span>
            <span>Gift Cards</span>
            <span>Store Locator</span>
            <span>How to Clean</span>
            <span>Bra Fit Guide</span>
            <span>Affiliate Program</span>
          </div>
        </div>
        <div className="group">
          <h1>COMPANY INFO </h1>
          <div className="items">
            <span>About Us</span>
            <span>Careers</span>
            <span>kadirov News</span>
            <span>kaClub</span>
            <span>Sustainability</span>
            <span>Mobile Apps</span>
            <span>kadirov Stories</span>
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="bottomGroup">
          <div>
            <h1>Payment Methods</h1>
            <img src="/img/payment.png" alt="payment" />
          </div>
          <div >
            <h1>Follow Us</h1>
            <div className="icons">
              <BsInstagram />
              <BsFacebook />
              <BsTwitter />
              <BsPinterest />
              <BsYoutube />
            </div>
          </div>
        </div>
        <div className="trademark">
          <span>© 2023 kadirov, Inc. All Rights Reserved</span>
        </div>
      </div>
    </div>
  );
};


export default Footer;
