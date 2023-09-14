import "./Navbar.scss";
import "./hamburgerStyle.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Cart from "@/components/Cart/Cart";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "@/components/Search/Search";
import LoginMenu from "@/components/loginMenu/LoginMenu";
import Button from "@mui/material/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const products = useSelector((state) => state.cart.products);

  // const category = searchItems?.data?.find((cat) => cat.id === catId);
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <Link className="link" to="/products/1">
              Women
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/2">
              Men
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/3">
              Children
            </Link>
          </div>
        </div>

        <div className="center">
          <Link className="link" to="/">
            KADIROV
          </Link>
          <span>Bringing Ecorce to Life with Kadirov</span>
        </div>

        <div className="right">
          <div className="item">
            <Link className="link" to="/">
              About
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              Contact
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              Stores
            </Link>
          </div>

          <div className="icons">
            <Search />

            <FavoriteBorderOutlinedIcon />
            <LoginMenu />

            <div className="cartIcon" onClick={() => setIsOpen(!isOpen)}>
              <ShoppingCartOutlinedIcon />
              <span>{products.length}</span>
            </div>
          </div>
          <label className="hamburger">
            <input
              type="checkbox"
              id="check"
              checked={mobileMenuOpen}
              onChange={toggleMenu}
            />
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
      </div>
      <div className={`mobileMenu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="item">
          <Link className="link" to="/products/1">
            Women
          </Link>
        </div>
        <div className="item">
          <Link className="link" to="/products/2">
            Men
          </Link>
        </div>
        <div className="item">
          <Link className="link" to="/products/3">
            Children
          </Link>
        </div>

        <div className="item">
          <Link className="link" to="/">
            About
          </Link>
        </div>
        <div className="item">
          <Link className="link" to="/">
            Contact
          </Link>
        </div>
        <div className="item">
          <Link className="link" to="/">
            Stores
          </Link>
        </div>
      </div>
      {isOpen && <Cart />}
    </div>
  );
};

export default Navbar;
