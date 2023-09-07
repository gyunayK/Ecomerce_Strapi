import "./Navbar.scss";

import { useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import Cart from "@/Components/Cart/Cart";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "@/Components/Search/Search";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const products = useSelector((state) => state.cart.products);

  // const category = searchItems?.data?.find((cat) => cat.id === catId);

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

            <PersonOutlineOutlinedIcon />
            <FavoriteBorderOutlinedIcon />

            <div className="cartIcon" onClick={() => setIsOpen(!isOpen)}>
              <ShoppingCartOutlinedIcon />
              <span>{products.length}</span>
            </div>
          </div>
          <div
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon />
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
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
      )}
      {isOpen && <Cart />}
    </div>
  );
};

export default Navbar;
