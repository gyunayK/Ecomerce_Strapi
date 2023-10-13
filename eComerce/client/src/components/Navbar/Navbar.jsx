import "./Navbar.scss";
import "./hamburgerStyle.scss";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Cart from "@/components/Cart/Cart";
import Search from "@/components/Search/Search";
import UserMenu from "@/components/userMenu/UserMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartRef = useRef(null);

  const products = useSelector((state) => state.cart.products);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [mobileMenuOpen]);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
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
          <div className="mobileRightMenu">
            <UserMenu />
          </div>
          <div className="mobileRightSearch">
            <Search />
          </div>
          <div className="item">
            <Link className="link" to="/products/women">
              Women
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/men">
              Men
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/kids">
              Kids
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
          <div className="icons">
            <Search />

            <Link id="fav" to={"/favorites"} aria-label="Navigate to favorites">
              <FavoriteBorderOutlinedIcon
                tabIndex="0"
                aria-hidden="true"
                alt="Favorites"
              />
            </Link>

            <UserMenu />

            <div className="cartIcon" onClick={() => setIsOpen(!isOpen)}>
              <ShoppingCartOutlinedIcon />
              <span>{products.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`mobileMenu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="item">
          <Link className="link" to="/products/women">
            Women
          </Link>
        </div>
        <div className="item">
          <Link className="link" to="/products/men">
            Men
          </Link>
        </div>
        <div className="item">
          <Link className="link" to="/products/kids">
            Kids
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
      </div>
      {isOpen && <Cart ref={cartRef} />}
    </div>
  );
};

export default Navbar;
