import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home")

  return (
    <div className="navbar" id='home'>
      <img src={assets.fit_food} alt="" className='logo' />
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
          <a href='#contact' onClick={() => setMenu("contact")} className={`navbar__link ${menu === "contact" ? "active" : ""}`}>
            CONTACT
          </a>
        </li>
      </ul>
      <div className="navbar-right">
        <img className="search_img" src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img className="basket_img" src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  )
}

export default Navbar