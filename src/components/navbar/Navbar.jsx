import React, { useState, useEffect, createContext } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import "./NavbarStyle.css";
import jwtDecode from "jwt-decode";
import { ConfigProvider, Badge } from "antd";
import axios from "axios";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Tooltip } from "antd";
import { isEmpty } from "lodash";

const UserContext = createContext();

function Navbar({ navrender }) {
  const history = useHistory();
  const [icon, setIcon] = useState(false);
  const [arrow, setArrow] = useState(true);
  const [arrowMan, setArrowMan] = useState(true);
  const [arrowWoman, setArrowWoman] = useState(true);
  const [arrowKid, setArrowKid] = useState(true);

  const [isHovering, setIsHovering] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState("");
  const [countCart, setCountCart] = useState(0);
  const [userData, setUserData] = useState();

  const [navData, setNavData] = useState();

  const items = [
    {
      label: "Profile",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "logout",
      key: "2",
      icon: <LogoutOutlined />,
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      history.push("/profile");
    }
    if (e.key === "2") {
      localStorage.removeItem("token");
      history.push("/home");
      window.location.reload(true);
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/navbar-shop-category/`)
        .then((response) => {
          console.log(response);
          setNavData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("Error");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/user-profile/`, { headers })
        .then((response) => {
          console.log(response);
          //  setNavData(response.data.data);
          setUserData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("Error");
    }
  }, []);

  const handleClick = () => {
    setIcon(!icon);
  };

  const handleProfileClick = () => {
    setIcon(!icon);
    setToken(localStorage.getItem("token"));
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleArrow = () => {
    setArrow(!arrow);
  };

  const handleArrowMan = () => {
    setArrowMan(!arrowMan);
  };

  const handleArrowWoman = () => {
    setArrowWoman(!arrowWoman);
  };

  const handleArrowKid = () => {
    setArrowKid(!arrowKid);
  };

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    history.push("/home");
    setToken(null);
  };

  //  console.log(token);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const decoded = jwtDecode(token);
      setRole(decoded["id"]["role"]);
    }
  }, [role, token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/cart-count/`, { headers })
        .then((response) => {
          if (response.data.message === "Success!") {
            setCountCart(response.data.data["cart_count"]);
          } else {
            setCountCart(0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, [navrender]);

  return (
    <>
      <UserContext.Provider value={countCart}>
        <nav className="NavBarItems">
          <Link to="/home">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/clothing-store-2.appspot.com/o/site_images%2Fgurukrupa.png?alt=media&token=f6246337-bbac-46a9-b2bf-1abaac2de541"
              alt=""
              height="40px"
              width="130px"
            />
          </Link>
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
                  {navData.map((val, index) => {
                    return (
                      <div className="mb-category-2" key={index}>
                        <div className="cat-man">
                          <NavLink
                            to={`/shop/${val.cat_type}`}
                            onClick={handleClick}>
                            <h4>{val.cat_type}</h4>
                          </NavLink>
                        </div>
                        <hr />

                        {val.Category.map((val1, index1) => {
                          return (
                            <div className="man-cat-items" key={index1}>
                              <NavLink
                                to={`/shop/${val.cat_type}/${val1.cat_title}`}
                                onClick={handleClick}>
                                {val1.cat_title}
                              </NavLink>
                            </div>
                          );
                        })}

                        {/* <div className="man-cat-items">
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
                      </div> */}
                      </div>
                    );
                  })}

                  {/* <div className="">
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
                          <NavLink
                            to="/shop/Women/Dresses"
                            onClick={handleClick}>
                            Dresses
                          </NavLink>
                        </div>
                      )}
                    </div>
                  </div> */}

                  {/* <div>
                    <div className="set-kid mb-category-2">
                      <div className="cat-kid">
                        <center>
                          <NavLink to="/shop/Kids" onClick={handleClick}>
                            <h4>Kids</h4>
                          </NavLink>
                        </center>
                        <i
                          className={
                            arrowKid
                              ? "fas fa-angle-right"
                              : "fas fa-angle-down"
                          }
                          onClick={handleArrowKid}></i>
                        
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
                    )} */}
                  {/* </div> */}
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
            {role !== "admin" && (
              <li>
                <NavLink
                  to="/contact"
                  className="nav-links"
                  activeClassName="active-link"
                  onClick={handleClick}>
                  CONTACT
                </NavLink>
              </li>
            )}

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
                {/* <li>
                  <NavLink
                    to="/profile"
                    className="nav-links"
                    activeClassName="active-link"
                    onClick={handleProfileClick}>
                    PROFILE
                  </NavLink>
                </li> */}

                <li>
                  <NavLink
                    to="/admin"
                    className="nav-links"
                    activeClassName="active-link">
                    DASHBOARD
                  </NavLink>
                </li>

                {/* <li>
                  <a
                    // to="/register"
                    href="/"
                    className="nav-links"
                    // activeClassName="active-link"
                    onClick={handleClickLogout}>
                    LOG-OUT
                  </a>
                </li> */}
              </>
            )}

            {/* {token !== null && role === "customer" && !isEmpty(userData) && (
              <>
                <li>
                  <NavLink
                    to="/profile"
                    className="nav-links"
                    activeClassName="active-link"
                    onClick={handleProfileClick}>
                    {userData.name}
                  </NavLink>
                </li> */}

            {/* <li>
                  <a
                    // to="/register"
                    href="/"
                    className="nav-links"
                    // activeClassName="active-link"
                    onClick={handleClickLogout}>
                    LOG-OUT
                  </a>
                </li> */}
            {/* </>
            )} */}
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

          <div className="icon-flex">
            {token !== null && !isEmpty(userData) && (
              <>
                <div className="profile-icon-style">
                  <ConfigProvider
                    theme={{
                      components: {
                        UserOutlined: {
                          colorPrimary: "#000",
                          colorPrimaryHover: "#000",
                          colorPrimaryBorder: "#000",
                          colorPrimaryBorderHover: "#000",
                          colorPrimaryText: "#000",
                        },
                      },
                    }}>
                    <Dropdown menu={menuProps}>
                      <Space style={{ cursor: "pointer",fontWeight:"bold" }}>
                        {userData.name}
                        <UserOutlined
                          style={{ fontSize: "25px", color: "black" }}
                        />
                      </Space>
                    </Dropdown>
                  </ConfigProvider>
                </div>
              </>
            )}
            {role !== "admin" && (
              <Link to="/cart-products">
                <div className="cat-icon-style">
                  <ConfigProvider
                    theme={{
                      colorPrimary: "#000",
                      colorPrimaryHover: "#000",
                      colorErrorText: "#000",
                      colorError: "#000",
                    }}>
                    <Badge
                      count={countCart}
                      showZero
                      className="cart-img"
                      style={{
                        backgroundColor: "#000",
                      }}>
                      <img
                        src="/logo/shopping-cart.png"
                        alt=""
                        className="cart-img"
                        height="35px"
                        width="35px"
                      />
                    </Badge>
                  </ConfigProvider>
                </div>
              </Link>
            )}
          </div>

          <div className="menu-icons">
            {token !== null && (
              <>
                <div className="profile-icon-style">
                  <ConfigProvider
                    theme={{
                      components: {
                        UserOutlined: {
                          colorPrimary: "#000",
                          colorPrimaryHover: "#000",
                          colorPrimaryBorder: "#000",
                          colorPrimaryBorderHover: "#000",
                          colorPrimaryText: "#000",
                        },
                      },
                    }}>
                    <Dropdown menu={menuProps}>
                      <Space>
                        <UserOutlined
                          style={{ fontSize: "25px", color: "black" }}
                        />
                      </Space>
                    </Dropdown>
                  </ConfigProvider>
                </div>
              </>
            )}
            {role !== "admin" && (
              <Link to="/cart-products">
                <div className="cart-icon-mobile">
                  <Badge
                    count={countCart}
                    showZero
                    // className="cart-img"
                    style={{
                      backgroundColor: "#000",
                    }}>
                    <img
                      src="/logo/shopping-cart.png"
                      alt=""
                      className="cart-mb"
                      height="40px"
                      width="40px"
                    />
                  </Badge>
                </div>
              </Link>
            )}

            <i
              className={icon ? "fas fa-times" : "fas fa-bars"}
              onClick={handleClick}></i>
          </div>
        </nav>
        {isHovering && !isEmpty(navData) && (
          <div
            className="category-container"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}>
            <div className="sub-category-container">
              {navData.map((val, index) => {
                return (
                  <div className="category-1" key={index}>
                    <center>
                      <NavLink to={`/shop/${val.cat_type}`}>
                        <h3>{val.cat_type}</h3>
                      </NavLink>
                    </center>
                    <hr className="hr-style" />
                    {val.Category.map((val1, index1) => {
                      return (
                        <div key={index1} style={{margin:"5px"}}>
                          <center>
                            <NavLink
                              to={`/shop/${val.cat_type}/${val1.cat_title}`}>
                              {val1.cat_title}
                            </NavLink>

                            <br />
                          </center>
                          <hr />
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {/* <div className="category-1">
                <NavLink to="/shop/Men">
                  <h3>Men</h3>
                </NavLink>
                <hr />
                <NavLink to="/shop/Men/T-Shirts">T-Shirt</NavLink>
                <br />
                <NavLink to="/shop/Men/Jeans">Jeans</NavLink>
                <br />
                <NavLink to="/shop/Men/CasualShirts">Casual Shirt</NavLink>
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
                    <NavLink to="/shop/Kids/Girl/Kurta-Sets">
                      Kurta Sets
                    </NavLink>
                    <NavLink to="/shop/Kids/Girl/Tops">Tops</NavLink>
                    <br />
                  </div> */}
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        )}
      </UserContext.Provider>
    </>
  );
}

export default Navbar;
