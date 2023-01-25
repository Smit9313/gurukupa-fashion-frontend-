import React from 'react';
import './header.css';

function Header({ itemCount }) {
  return (
    <>
    {/* <br/>
          <br />
          <br/>
          <br /> */}
          {/* <div style={{height:"65px"}}>

          </div> */}
      <header className="containerh">
          <h1>Shopping Cart</h1>

          <ul className="breadcrumb">
              <li>Home</li>
              <li>Shopping Cart</li>
          </ul>

          <span className="count">{itemCount} items in the bag</span>
      </header>
      </>
  )
}

export default Header