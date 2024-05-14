import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className="navbar">
      <img className='logo' src={assets.FitFood} alt="" />
      <img className='profile' src={assets.michelano} alt="" />
    </div>
  )
}

export default Navbar