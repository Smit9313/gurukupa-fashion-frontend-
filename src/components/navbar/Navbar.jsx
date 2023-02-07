import React,{useState,useEffect} from 'react';
// import MenuItems from './ManuData';
import {NavLink,Link, useHistory} from 'react-router-dom';
import './NavbarStyle.css';
import jwtDecode from "jwt-decode";
// import Category from '../Category';


function Navbar() {
    const [icon, setIcon] = useState(false);
    const [arrow, setArrow] = useState(true);
    const [arrowMan, setArrowMan] = useState(true);    
    const [arrowWoman, setArrowWoman] = useState(true);
    const [arrowKid, setArrowKid] = useState(true);

    const [isHovering, setIsHovering] = useState(false);
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [role, setRole] = useState("");

    const history = useHistory();

    const handleClick = () =>{
        setIcon(!icon);
    }

    const handleProfileClick= () =>{
      setIcon(!icon);
      setToken(sessionStorage.getItem("token"));
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
      history.push("/home");
      setToken(null);
     }

    //  console.log(token);

     useEffect(() => {
       if (sessionStorage.getItem("token") !== null) {
         const decoded = jwtDecode(token);
         setRole(decoded["id"]["role"]);
       }
     }, [role, token]);

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
              to="/shop/all"
              className="nav-links sun-nav"
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
                    <NavLink to="/shop/Men" onClick={handleClick}>
                      <h4>Men</h4>
                    </NavLink>
                    <i
                      className={
                        arrowMan ? "fas fa-angle-right" : "fas fa-angle-down"
                      }
                      onClick={handleArrowMan}></i>
                  </div>
                  <hr />
                  {!arrowMan && (
                    <div className="man-cat-items">
                      <NavLink to="/shop/Men/T-Shirts" onClick={handleClick}>
                        T-Shirt
                      </NavLink>
                      <NavLink to="/shop/Men/Jeans" onClick={handleClick}>
                        Jeans
                      </NavLink>
                      <NavLink
                        to="/shop/Men/CasualShirts"
                        onClick={handleClick}>
                        Casual Shirt{" "}
                      </NavLink>
                      <NavLink
                        to="/shop/Men/FormalShirts"
                        onClick={handleClick}>
                        Formal Shirt
                      </NavLink>
                      <NavLink
                        to="/shop/Men/CasualTrousers"
                        onClick={handleClick}>
                        Casual Trouser
                      </NavLink>
                      <NavLink to="/shop/Men/Kurta" onClick={handleClick}>
                        Kurta
                      </NavLink>
                    </div>
                  )}
                </div>

                <div className="">
                  <div className="mb-category-2">
                    <div className="cat-woman">
                      <NavLink to="/shop/Women" onClick={handleClick}>
                        <h4>Women</h4>
                      </NavLink>

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
                        <NavLink to="/shop/Women/Tops" onClick={handleClick}>
                          Tops
                        </NavLink>
                        <NavLink
                          to="/shop/Women/T-Shirts"
                          onClick={handleClick}>
                          T-shirts
                        </NavLink>
                        <NavLink
                          to="/shop/Women/LehengaCholi"
                          onClick={handleClick}>
                          Lehenga & Choli
                        </NavLink>
                        <NavLink
                          to="/shop/Women/Kurtas&Suits"
                          onClick={handleClick}>
                          Kurtas & Suits
                        </NavLink>
                        <NavLink to="/shop/Women/Jeans" onClick={handleClick}>
                          Jeans
                        </NavLink>
                        <NavLink to="/shop/Women/Dresses" onClick={handleClick}>
                          Dresses
                        </NavLink>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="set-kid mb-category-2">
                    <div className="cat-kid">
                      <center>
                        <NavLink to="/shop/Kids" onClick={handleClick}>
                          <h4>Kids</h4>
                        </NavLink>
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
                        <NavLink to="/shop/Kids/Boy" onClick={handleClick}>
                          <h5>Boy</h5>
                        </NavLink>
                        <NavLink
                          to="/shop/Kids/Boy/Trousers"
                          onClick={handleClick}>
                          Trousers
                        </NavLink>
                        <NavLink
                          to="/shop/Kids/Boy/T-Shirts"
                          onClick={handleClick}>
                          T-Shirts
                        </NavLink>
                        <NavLink
                          to="/shop/Kids/Boy/Shorts"
                          onClick={handleClick}>
                          Shorts
                        </NavLink>
                        <NavLink
                          to="/shop/Kids/Boy/Jeans"
                          onClick={handleClick}>
                          Jeans
                        </NavLink>
                        <NavLink
                          to="/shop/Kids/Boy/Shirts"
                          onClick={handleClick}>
                          Shirts
                        </NavLink>
                      </div>
                      <div className="mb-category-3">
                        <NavLink to="/shop/Kids/Girl">
                          <h5>Girl</h5>
                        </NavLink>
                        <NavLink
                          to="/shop/Kids/Girl/Dresses"
                          onClick={handleClick}>
                          Dresses
                        </NavLink>
                        <NavLink
                          to="/shop/Kids/Girl/T-shirt"
                          onClick={handleClick}>
                          T-shirt
                        </NavLink>
                        <NavLink
                          to="/shop/Kids/Girl/Jeans-Trousers-Capris"
                          onClick={handleClick}>
                          Jeans-Trousers-Capris
                        </NavLink>
                        <NavLink
                          to="/shop/Kids/Girl/Kurta-Sets"
                          onClick={handleClick}>
                          Kurta-Sets
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* <li>
            <NavLink
              to="/about"
              className="nav-links"
              activeClassName="active-link"
              onClick={handleClick}>
              ABOUT
            </NavLink>
          </li> */}
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

          {token !== null && role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/profile"
                  className="nav-links"
                  activeClassName="active-link"
                  onClick={handleProfileClick}>
                  PROFILE
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/admin"
                  className="nav-links"
                  activeClassName="active-link">
                  DASHBOARD
                </NavLink>
              </li>

              <li>
                <a
                  // to="/register"
                  href="/"
                  className="nav-links"
                  // activeClassName="active-link"
                  onClick={handleClickLogout}>
                  LOG-OUT
                </a>
              </li>
            </>
          )}

          {token !== null && role === "customer" && (
            <>
              <li>
                <NavLink
                  to="/profile"
                  className="nav-links"
                  activeClassName="active-link"
                  onClick={handleProfileClick}>
                  PROFILE
                </NavLink>
              </li>

              <li>
                <a
                  // to="/register"
                  href="/"
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
              <NavLink to="/shop/Men">
                <h3>Men</h3>
              </NavLink>
              <hr />
              <NavLink to="/shop/Men/T-Shirts">T-Shirt</NavLink>
              <br />
              <NavLink to="/shop/Men/Jeans">Jeans</NavLink>
              <br />
              <NavLink to="/shop/Men/CasualShirts">Casual Shirt </NavLink>
              <br />
              <NavLink to="/shop/Men/FormalShirts">Formal Shirt</NavLink>
              <br />
              <NavLink to="/shop/Men/CasualTrousers">Casual-Trouser</NavLink>
              <br />
              <NavLink to="/shop/Men/Kurta">Kurta</NavLink>
            </div>

            <div className="category-1">
              <div>
                <NavLink to="/shop/Women">
                  <h3>Women</h3>
                </NavLink>
                <hr />
                <NavLink to="/shop/Women/Tops">Tops</NavLink>
                <br />
                <NavLink to="/shop/Women/T-Shirts">T-shirts</NavLink>
                <br />
                <NavLink to="/shop/Women/LehengaCholi">
                  Lehenga & Choli
                </NavLink>{" "}
                <br />
                <NavLink to="/shop/Women/Kurtas&Suits">
                  Kurtas & Suits
                </NavLink>{" "}
                <br />
                <NavLink to="/shop/Women/Jeans">Jeans</NavLink>
                <br />
                <NavLink to="/shop/Women/Dresses">Dresses</NavLink>
              </div>
            </div>

            <div>
              <div className="category-1">
                <center>
                  <NavLink to="/shop/Kids">
                    <h3>Kid</h3>
                  </NavLink>
                </center>
                <hr />
              </div>
              <div className="sub-category-container">
                <div className="category-1">
                  <NavLink to="/shop/Kids/Boy">
                    <h4>Boy</h4>
                  </NavLink>
                  <hr />
                  <NavLink to="/shop/Kids/Boy/Trousers">Trousers</NavLink>
                  <br />
                  <NavLink to="/shop/Kids/Boy/T-Shirts">T-Shirts</NavLink>
                  <br />
                  <NavLink to="/shop/Kids/Boy/Shorts">Shorts</NavLink>
                  <br />
                  <NavLink to="/shop/Kids/Boy/Jeans">Jeans</NavLink>
                  <br />
                  <NavLink to="/shop/Kids/Boy/Shirts">Shirts</NavLink>
                  <br />
                </div>
                <div className="category-1">
                  <NavLink to="/shop/Kids/Girl">
                    <h4>Girl</h4>
                  </NavLink>
                  <hr />
                  <NavLink to="/shop/Kids/Girl/Dresses">Dresses</NavLink>
                  <br />
                  <NavLink to="/shop/Kids/Girl/T-shirt">T-shirt</NavLink>
                  <br />
                  <NavLink to="/shop/Kids/Girl/Jeans-Trousers-Capris">
                    Jeans, Trousers & Capris
                  </NavLink>
                  <br />
                  <NavLink to="/shop/Kids/Girl/Kurta-Sets">Kurta Sets</NavLink>
                  <NavLink to="/shop/Kids/Girl/Tops">Tops</NavLink>
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