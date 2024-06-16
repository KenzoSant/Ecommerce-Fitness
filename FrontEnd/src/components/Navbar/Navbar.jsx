import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showLogout, setShowLogout] = useState(false);
  const { isLoggedIn, logoutUser, getTotalCartAmount, getTotalCartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logoutUser();
    setShowLogout(false);
  };

  const handleProfileClick = () => {
    setShowLogout(false);
    navigate('/user');
  };

  return (
    <div className="navbar" id="home">
      <Link to="/">
        <img src={assets.fit_food} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={`navbar__link ${menu === "home" ? "active" : ""}`}
          >
            HOME
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={`navbar__link ${menu === "menu" ? "active" : ""}`}
          >
            MENU
          </a>
        </li>
        <li>
          <a
            href="#footer"
            onClick={() => setMenu("footer")}
            className={`navbar__link ${menu === "footer" ? "active" : ""}`}
          >
            CONTATO
          </a>
        </li>
      </ul>
      <div className="navbar-right">
        <img className="search_img" src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img className="basket_img" src={assets.basket_icon} alt="" />
          </Link>
          {getTotalCartAmount() > 0 && <div className="dot">{getTotalCartItems()}</div>}
        </div>
        {isLoggedIn ? (
          <div className="user-menu">
            <img className="user-icon" src={assets.profile_icon} alt="User Icon" onClick={() => setShowLogout(!showLogout)} />
            {showLogout && (
              <div className="logout-menu">
                <button onClick={handleProfileClick}>Perfil</button>
                <button onClick={handleLogoutClick}>Sair</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
