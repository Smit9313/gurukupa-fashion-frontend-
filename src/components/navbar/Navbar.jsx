import React,{useState} from 'react';
import MenuItems from './ManuData';
import {NavLink,Link} from 'react-router-dom';
import './NavbarStyle.css';
import Category from '../Category';


function Navbar() {
    const [icon, setIcon] = useState(false);
    const [arrow, setArrow] = useState(true);
    const [isHovering, setIsHovering] = useState(false);

    const handleClick = () =>{
        setIcon(!icon);
    }

     const handleMouseOver = () => {
       setIsHovering(true);
     };

     const handleMouseOut = () => {
       setIsHovering(false);
     };

     const handleArrow = () => {
      setArrow(!arrow);
     }



  return (
    <>
      <nav className="NavBarItems">
        <img src="/logo/gurukrupa.png" alt="" height="40px" width="130px" />

        <ul className={icon ? "nav-menu active-mb" : "nav-menu"}>
          <li>
            <NavLink
              to="/home"
              className="nav-links"
              activeClassName="active-link"
              onClick={handleClick}>
              HOME
            </NavLink>
          </li>
          <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <NavLink
              to="/shop"
              className="nav-links"
              activeClassName="active-link"
              onClick={handleClick}>
              SHOP
            </NavLink>
            <i
              className={arrow ? "fas fa-angle-right" : "fas fa-angle-down"}
              onClick={handleArrow}></i>
          </li>
          {!arrow && (
            <div
              className="mb-category"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}>
              <div className="mb-category-1">
                <div className="mb-category-2">
                  <h3>Man</h3>
                  <hr />
                  <NavLink to="">T-Shirt</NavLink>
                  <br />
                  <NavLink to="">Jeans</NavLink>
                  <br />
                  <NavLink to="">Casual Shirt </NavLink>
                  <br />
                  <NavLink to="">Formal Shirt</NavLink>
                  <br />
                  <NavLink to="">Shorts</NavLink>
                  <br />
                  <NavLink to="">Casual Trouser</NavLink>
                  <br />
                  <NavLink to="">Kurta</NavLink>
                </div>

                <div className="">
                  <div className="mb-category-2">
                    <h3>Woman</h3>
                    <hr />
                    <NavLink to="">Dress</NavLink>
                    <br />
                    <NavLink to="">Tops</NavLink> <br />
                    <NavLink to="">T-Shirts</NavLink> <br />
                    <NavLink to="">Jeans</NavLink> <br />
                    <NavLink to="">Kurtas & Suits</NavLink>
                  </div>
                </div>

                <div>
                  <div className="">
                    <center>
                      <h3>Kid</h3>
                    </center>
                    <hr />
                  </div>
                  <div className="">
                    <div className="mb-category-3">
                      <h4>Boy</h4>
                      <hr />
                      <NavLink to="">T-Shirts</NavLink>
                      <br />
                      <NavLink to="">Shirts</NavLink>
                      <br />
                      <NavLink to="">Shorts</NavLink>
                      <br />
                      <NavLink to="">Jeans</NavLink>
                      <br />
                      <NavLink to="">Trousers</NavLink>
                      <hr/>
                     
                    </div>
                    <div className="mb-category-3">
                      <h4>Girl</h4>
                      <hr />
                      <NavLink to="">Dresses</NavLink>
                      <br />
                      <NavLink to="">Tops</NavLink>
                      <br />
                      <NavLink to="">
                        Jeans &<br />
                        Trousers
                      </NavLink>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <li>
            <NavLink
              to="/about"
              className="nav-links"
              activeClassName="active-link"
              onClick={handleClick}>
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="nav-links"
              activeClassName="active-link"
              onClick={handleClick}>
              CONTACT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className="nav-links"
              activeClassName="active-link"
              onClick={handleClick}>
              SIGN-UP
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className="nav-links"
              activeClassName="active-link"
              onClick={handleClick}>
              LOGIN
            </NavLink>
          </li>
        </ul>
        <Link to="/cart-products">
          <img
            src="/logo/shopping-cart.png"
            alt=""
            className="cart-img"
            height="35px"
            width="35px"
          />
        </Link>
        <div className="menu-icons">
          <Link to="/cart-products">
            <img
              src="/logo/shopping-cart.png"
              alt=""
              className="cart-mb"
              height="45px"
              width="45px"
            />
          </Link>
          <i
            className={icon ? "fas fa-times" : "fas fa-bars"}
            onClick={handleClick}></i>
        </div>
      </nav>
      {isHovering && (
        <div
          className="category-container"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}>
          <div className="sub-category-container">
            <div className="category-1">
              <h3>Man</h3>
              <hr />
              <NavLink to="">T-Shirt</NavLink>
              <br />
              <NavLink to="">Jeans</NavLink>
              <br />
              <NavLink to="">Casual Shirt </NavLink>
              <br />
              <NavLink to="">Formal Shirt</NavLink>
              <br />
              <NavLink to="">Shorts</NavLink>
              <br />
              <NavLink to="">Casual Trouser</NavLink>
              <br />
              <NavLink to="">Kurta</NavLink>
            </div>

            <div className="category-1">
              <div>
                <h3>Woman</h3>
                <hr />
                <NavLink to="">Dress</NavLink>
                <br />
                <NavLink to="">Tops</NavLink> <br />
                <NavLink to="">T-Shirts</NavLink> <br />
                <NavLink to="">Jeans</NavLink> <br />
                <NavLink to="">Kurtas & Suits</NavLink>
              </div>
            </div>

            <div>
              <div className="category-1">
                <center>
                  <h3>Kid</h3>
                </center>
                <hr />
              </div>
              <div className="sub-category-container">
                <div className="category-1">
                  <h4>Boy</h4>
                  <hr />
                  <NavLink to="">T-Shirts</NavLink>
                  <br />
                  <NavLink to="">Shirts</NavLink>
                  <br />
                  <NavLink to="">Shorts</NavLink>
                  <br />
                  <NavLink to="">Jeans</NavLink>
                  <br />
                  <NavLink to="">Trousers</NavLink>
                  <br />
                </div>
                <div className="category-1">
                  <h4>Girl</h4>
                  <hr />
                  <NavLink to="">Dresses</NavLink>
                  <br />
                  <NavLink to="">Tops</NavLink>
                  <br />
                  <NavLink to="">
                    Jeans &<br />
                    Trousers
                  </NavLink>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar