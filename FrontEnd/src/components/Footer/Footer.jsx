import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.fit_food} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet beatae velit rem sed atque cum eveniet quidem, consectetur adipisci porro odit autem.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#explore-menu">Menu</a></li>
                    <li><a href="footer">Contact</a></li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>CONTACT</h2>
                <ul>
                    <li>+55-1995364-7323</li>
                    <li>fit-food@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 FitFood.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer