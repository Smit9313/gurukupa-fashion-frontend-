import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-details">
        {/* <i className="bx bxl-c-plus-plus"></i> */}
        <img src="logo/g-logo1.svg" alt='' height="70px" width='50px'/>
        <span className="logo_name">GuruKrupa</span>
      </div>
      <ul className="nav-links-sidebar">
        <li>
          <NavLink to="/home">
            <i className="bx bx-grid-alt"></i>
            <span className="links_name">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/a">
            <i className="bx bx-box"></i>
            <span className="links_name">Product</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/b">
            <i className="bx bx-list-ul"></i>
            <span className="links_name">Order list</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/c">
            <i className="bx bx-pie-chart-alt-2"></i>
            <span className="links_name">Analytics</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/d">
            <i className="bx bx-coin-stack"></i>
            <span className="links_name">Stock</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/e">
            <i className="bx bx-book-alt"></i>
            <span className="links_name">Total order</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/f">
            <i className="bx bx-user"></i>
            <span className="links_name">Team</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/g">
            <i className="bx bx-message"></i>
            <span className="links_name">Messages</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/h">
            <i className="bx bx-heart"></i>
            <span className="links_name">Favrorites</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/i">
            <i className="bx bx-cog"></i>
            <span className="links_name">Setting</span>
          </NavLink>
        </li>
        <li className="log_out">
          <NavLink to="/j">
            <i className="bx bx-log-out"></i>
            <span className="links_name">Log out</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar