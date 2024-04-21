import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {

  const[menu,setMenu] = useState("home")

  return (
    <div className="navbar">
        <img src={assets.fit_food} alt="" className='logo'/>
        <ul className="navbar-menu">
            <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}><a href="" class="navbar__link">HOME</a></li>
            <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}><a href="" class="navbar__link">MENU</a></li>
            <li onClick={()=>setMenu("contact")} className={menu==="contact"?"active":""}><a href="" class="navbar__link">CONTACT</a></li>
        </ul>
        <div className="navbar-right">
            <img className="search_img" src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <img className="basket_img"  src={assets.basket_icon} alt="" />
                <div className="dot"></div>
            </div>
            <button>Sign In</button>
        </div>
    </div>
  )
}

export default Navbar