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
import { makeRequest } from "@/hooks/makeRequest";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const cartRef = useRef(null);
  const products = useSelector((state) => state.cart.products);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleGoToCatPage = (category) => {
    setMobileMenuOpen(false);
    setIsOpen(false);

    const categoryItem = categories.data.find(
      (item) => item.attributes.title === category
    );

    if (!categoryItem) return;

    window.location.href = `/products/${categoryItem.attributes.title}`;
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
    const fetchCategories = async () => {
      try {
        const response = await makeRequest.get(`/categories?populate=*`);
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
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
          <div className="mobileLeftCart">
            <div className="cartIcon" onClick={() => setIsOpen(!isOpen)}>
              <ShoppingCartOutlinedIcon />
              <span>{products.length}</span>
            </div>
          </div>
          <div className="mobileRightMenu">
            <UserMenu idSuffix="1" />
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
                style={{ outline: "none" }}
              />
            </Link>

            <UserMenu idSuffix="2" />

            <div className="cartIcon" onClick={() => setIsOpen(!isOpen)}>
              <ShoppingCartOutlinedIcon />
              <span>{products.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`mobileMenu ${mobileMenuOpen ? "open" : ""}`}>
        {categories?.data?.map((category) => {
          return (
            <div className="item" key={category.id}>
              <button
                className="navBtn"
                onClick={() => handleGoToCatPage(category.attributes.title)}
              >
                {category.attributes.title.toUpperCase()}
              </button>
            </div>
          );
        })}
        <div className="item">
          <Link
            className="navBtn"
            to={"/favorites"}
            onClick={handleGoToCatPage}
          >
            FAVORITES
          </Link>
        </div>
      </div>
      {isOpen && <Cart ref={cartRef} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Navbar;
