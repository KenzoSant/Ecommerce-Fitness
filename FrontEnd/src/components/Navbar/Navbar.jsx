import React, { useState, useContext  } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';


const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home")

  const { getTotalCartAmount, getTotalCartItems } = useContext(StoreContext);


  return (
    <div className="navbar" id='home'>
      <Link to='/'><img src={assets.fit_food} alt="" className='logo' /></Link>
      <ul className="navbar-menu">
        <li>
          <Link to='/' onClick={() => setMenu("home")} className={`navbar__link ${menu === "home" ? "active" : ""}`}>
            HOME
          </Link>
        </li>
        <li>
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={`navbar__link ${menu === "menu" ? "active" : ""}`}>
            MENU
          </a>
        </li>
        <li>
          <a href='#footer' onClick={() => setMenu("footer")} className={`navbar__link ${menu === "footer" ? "active" : ""}`}>
            CONTACT
          </a>
        </li>
      </ul>
      <div className="navbar-right">
        <img className="search_img" src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img className="basket_img" src={assets.basket_icon} alt="" /></Link>
          {getTotalCartAmount() > 0 && (
            <div className="dot">{getTotalCartItems()}</div>
          )}  
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  )
}

export default Navbar