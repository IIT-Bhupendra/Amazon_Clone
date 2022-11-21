import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { getAuth } from "firebase/auth";

function Header() {
  const [{ cart, user }, dispatch] = useStateValue();

  const auth = getAuth();
  const handleSignInSignOut = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/" className="header__links">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
          className="header__logo"
        />
      </Link>
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={!user && "/login"} className="header__links">
          <div onClick={handleSignInSignOut} className="header__option">
            {user && <span className="header__optionLineOne">Hello, {user.email}</span>}
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        {user && 
          <>
            <Link to="/orders">
              <div className="header__option">
                <span className="header__optionLineOne">Returns</span>
                <span className="header__optionLineTwo">& Orders</span>
              </div>
            </Link>
            <div className="header__option">
              <span className="header__optionLineOne">Your</span>
              <span className="header__optionLineTwo">Prime</span>
            </div>
            <Link to="/checkout" className="header__links">
              <div className="header__optionBasket">
                <ShoppingBasketIcon />
                <span className="header__optionLineTwo header__optionBasketCount">
                  {cart?.length}
                </span>
              </div>
            </Link>
          </>
        }
      </div>
    </div>
  );
}

export default Header;
