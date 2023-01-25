import React,{useState} from 'react';
import MenuItems from './ManuData';
import {NavLink,Link, useHistory} from 'react-router-dom';
import './NavbarStyle.css';
// import Category from '../Category';


function Navbar() {
    const [icon, setIcon] = useState(false);
    const [arrow, setArrow] = useState(true);
    const [arrowMan, setArrowMan] = useState(true);    
    const [arrowWoman, setArrowWoman] = useState(true);
    const [arrowKid, setArrowKid] = useState(true);

    const [isHovering, setIsHovering] = useState(false);
    const [token, setToken] = useState(sessionStorage.getItem("token"));

    const history = useHistory();

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

     const handleArrowMan = () => {
      setArrowMan(!arrowMan);
     }

     const handleArrowWoman = () => {
       setArrowWoman(!arrowWoman);
     };

      const handleArrowKid = () => {
        setArrowKid(!arrowKid);
      };

     const handleClickLogout = () => {
      sessionStorage.removeItem("token");
      setToken(null);
     }

    //  console.log(token);

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
                  <div className="cat-man">
                    <h4>Man</h4>
                    <i
                      className={
                        arrowMan ? "fas fa-angle-right" : "fas fa-angle-down"
                      }
                      onClick={handleArrowMan}></i>
                  </div>
                  <hr />
                  {!arrowMan && (
                    <div className="man-cat-items">
                      <NavLink to="">T-Shirt</NavLink>
                      {/* <br /> */}
                      <NavLink to="">Jeans</NavLink>
                      {/* <br /> */}
                      <NavLink to="">Casual Shirt </NavLink>
                      {/* <br /> */}
                      <NavLink to="">Formal Shirt</NavLink>
                      {/* <br /> */}
                      <NavLink to="">Shorts</NavLink>
                      {/* <br /> */}
                      <NavLink to="">Casual Trouser</NavLink>
                      {/* <br /> */}
                      <NavLink to="">Kurta</NavLink>
                    </div>
                  )}
                </div>

                <div className="">
                  <div className="mb-category-2">
                    <div className="cat-woman">
                      <h4>Woman</h4>
                      <i
                        className={
                          arrowWoman
                            ? "fas fa-angle-right"
                            : "fas fa-angle-down"
                        }
                        onClick={handleArrowWoman}></i>
                    </div>
                    <hr />
                    {!arrowWoman && (
                      <div className="man-cat-items">
                        <NavLink to="">Dress</NavLink>
                        {/* <br /> */}
                        <NavLink to="">Tops</NavLink>
                        {/* <br /> */}
                        <NavLink to="">T-Shirts</NavLink>
                        {/* <br /> */}
                        <NavLink to="">Jeans</NavLink>
                        {/* <br /> */}
                        <NavLink to="">Kurtas & Suits</NavLink>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="set-kid">
                    <div className="cat-kid">
                      <center>
                        <h4>Kids</h4>
                      </center>
                      <i
                        className={
                          arrowKid ? "fas fa-angle-right" : "fas fa-angle-down"
                        }
                        onClick={handleArrowKid}></i>
                      {/* <hr /> */}
                    </div>
                    <hr />
                  </div>
                  {!arrowKid && (
                    <div className="">
                      <div className="mb-category-3">
                        <h5>Boy</h5>
                        <hr />
                        <NavLink to="">T-Shirts</NavLink>
                        {/* <br /> */}
                        <NavLink to="">Shirts</NavLink>
                        {/* <br /> */}
                        <NavLink to="">Shorts</NavLink>
                        {/* <br /> */}
                        <NavLink to="">Jeans</NavLink>
                        {/* <br /> */}
                        <NavLink to="">Trousers</NavLink>
                        <hr />
                      </div>
                      <div className="mb-category-3">
                        <h5>Girl</h5>
                        <hr />
                        <NavLink to="">Dresses</NavLink>
                        {/* <br /> */}
                        <NavLink to="">Tops</NavLink>
                        {/* <br /> */}
                        <NavLink to="">T-Shirt</NavLink>
                        {/* <br/> */}
                        <NavLink to="">Jeans & Trousers</NavLink>
                        {/* <br /> */}
                      </div>
                    </div>
                  )}
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

          {token === null && (
            <>
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
            </>
          )}

          {token !== null && (
            <>
              <li>
                <NavLink
                  to="/Profile"
                  className="nav-links"
                  activeClassName="active-link"
                  onClick={handleClick}>
                  PROFILE
                </NavLink>
              </li>

              <li>
                <a
                  // to="/register"
                  className="nav-links"
                  // activeClassName="active-link"
                  onClick={handleClickLogout}>
                  LOG-OUT
                </a>
              </li>
            </>
          )}
          {/* <li>
            <NavLink
              to="/profile"
              className="nav-links"
              activeClassName="active-link"
              onClick={handleClick}>
              PROFILE
            </NavLink>
          </li> */}
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