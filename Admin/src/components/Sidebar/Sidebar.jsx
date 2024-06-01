import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import { AdmContext } from '../../context/AdmContext';

const Sidebar = () => {
  const { logout } = useContext(AdmContext);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    logout();
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-emp">
        <img src={assets.michelano} alt="" />
        <p>FitFood.</p>
      </div>
      <div className="sidebar-options">
        <NavLink to='/add-employees' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Employees</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <img src={assets.list_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/list-employees' className="sidebar-option">
          <img src={assets.list_icon} alt="" />
          <p>List Employees</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
      <div className="sidebar-logoff" onClick={handleLogout}>
        <img src={assets.logout_icon} alt="" />
      </div>

      {showLogoutConfirmation && (
        <div className="logout-confirmation">
          <p>Deseja realmente se deslogar?</p>
          <button onClick={confirmLogout}>Yes</button>
          <button onClick={cancelLogout}>No</button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
