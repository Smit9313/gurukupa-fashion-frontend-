import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import '../Style/sidebar.css'

function Sidebar({url}) {
  
  const [sidebar, setSidebar] = useState(false);
  const [supplier ,setSupplier] = useState(true);
  const [purchase, setPurchase] = useState(true);
  const [category, setCategory] = useState(true);
  const [product, setProduct] = useState(true);
  const [order, setOrder] = useState(true);
  const [discount, setDiscount] = useState(true);
  // const [urlPath, setUrlPath] =useState(url);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  function removeTrailingSlash(str) {
    return str.replace(/\/+$/, "");
  }

    const handleSuplier = () =>{
      setPurchase(true);
      setCategory(true);
      setProduct(true);
      setOrder(true);
      setDiscount(true);
      setSupplier(!supplier);
    }

    const handlePurchase = () => {
      setSupplier(true);
      setCategory(true);
      setProduct(true);
      setOrder(true);
      setDiscount(true);
      setPurchase(!purchase);
    };

    const handleCategory = () => {
      setPurchase(true);
      setSupplier(true);
      setProduct(true);
      setOrder(true);
      setDiscount(true);
      setCategory(!category);
    };

    const handleProduct = () => {
      setPurchase(true);
      setSupplier(true);
      setCategory(true);
      setOrder(true);
      setDiscount(true);
      setProduct(!product);
    };

    const handleOrder = () => {
      setPurchase(true);
      setSupplier(true);
      setCategory(true);
      setProduct(true);
      setDiscount(true);
      setOrder(!order);
    };

    const handleDiscount = () => {
      setPurchase(true);
      setSupplier(true);
      setCategory(true);
      setProduct(true);
      setOrder(true);
      setDiscount(!discount);
    };


  return (
    <>
      <nav className={sidebar ? "sidebar close" : "sidebar open"}>
        <header>
          <div className="image-text">
            <span className="image">
              {/* <!--<img src="logo.png" alt="">--> */}
            </span>

            <div className="text logo-text">
              {/* <span className="name">Codinglab</span>
                    <span className="profession">Web developer</span> */}
              {/* <img src="logo/gurukrupa.png" alt='sf' height="40px" width="100px" /> */}
              <img
                src="/logo/gurukrupa.png"
                alt=""
                height="40px"
                width="130px"
              />
            </div>
          </div>

          <i className="bx bx-chevron-right toggle" onClick={handleSidebar}></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            {/* <li className="search-box">
              <i className="bx bx-search icon"></i>
              <input type="text" placeholder="Search..." />
            </li> */}
            {/* {console.log(url)} */}
            <ul className="menu-links">
              <li className="nav-link">
                <NavLink
                  to={`${removeTrailingSlash(url)}/dashboard`}
                  activeClassName="sidebar-active">
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">Dashboard</span>
                </NavLink>
              </li>

              <li className="nav-link" onClick={handleSuplier}>
                <section>
                  <i className="bx bx-bar-chart-alt-2 icon"></i>
                  <span className="text nav-text">Supplier</span>
                </section>
                <i
                  className={
                    supplier
                      ? "bx bx-right-arrow-alt icon"
                      : "bx bx-down-arrow-alt icon"
                  }></i>
              </li>
              {!supplier && (
                <>
                  <hr />
                  <li className="nav-link-sub">
                    <NavLink
                      to={`/admin/manageSupplier`}
                      activeClassName="sidebar-active">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text-sub">
                        {"->"}Manage Suplier
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li className="nav-link-sub">
                    <NavLink
                      to={`/admin/addSupplier`}
                      activeClassName="sidebar-active">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text">{"->"}Add Suplier</span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                </>
              )}

              <li className="nav-link" onClick={handlePurchase}>
                <section>
                  <i className="bx bx-bell icon"></i>
                  <span className="text nav-text">Purchase</span>
                </section>
                <i
                  className={
                    purchase
                      ? "bx bx-right-arrow-alt icon"
                      : "bx bx-down-arrow-alt icon"
                  }></i>
              </li>

              {!purchase && (
                <>
                  <li className="nav-link-sub">
                    <NavLink to={`/admin/managePurchase`}>
                      <span className="text nav-text-sub">
                        {"->"}Manage Purchase
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li className="nav-link-sub">
                    <NavLink to={`/admin/addPurchase`}>
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text">{"->"}Add Purchase</span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                </>
              )}

              <li className="nav-link" onClick={handleCategory}>
                <section>
                  <i className="bx bx-pie-chart-alt icon"></i>
                  <span className="text nav-text">Category</span>
                </section>
                <i
                  className={
                    category
                      ? "bx bx-right-arrow-alt icon"
                      : "bx bx-down-arrow-alt icon"
                  }></i>
              </li>

              {!category && (
                <>
                  <li className="nav-link-sub">
                    <NavLink to={`/admin/manageCategory`}>
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text-sub">
                        {"->"}Manage Category
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li className="nav-link-sub">
                    <NavLink to={`/admin/addCategory`}>
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text-sub">
                        {"->"}Add Categoty
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                </>
              )}

              <li className="nav-link" onClick={handleProduct}>
                <section>
                  <i className="bx bx-heart icon"></i>
                  <span className="text nav-text">Product</span>
                </section>
                <i
                  className={
                    product
                      ? "bx bx-right-arrow-alt icon"
                      : "bx bx-down-arrow-alt icon"
                  }></i>
              </li>

              {!product && (
                <>
                  <li className="nav-link-sub">
                    <NavLink to={`/admin/manageProduct`}>
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text-sub">
                        {"->"}Manage Product
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li className="nav-link-sub">
                    <NavLink to={`/admin/addProduct`}>
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text-sub">
                        {"->"}Add Product
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                </>
              )}

              <li className="nav-link" onClick={handleOrder}>
                <section>
                  <i className="bx bx-wallet icon"></i>
                  <span className="text nav-text">Order</span>
                </section>
                <i
                  className={
                    order
                      ? "bx bx-right-arrow-alt icon"
                      : "bx bx-down-arrow-alt icon"
                  }></i>
              </li>

              {!order && (
                <>
                  <li className="nav-link-sub">
                    <NavLink to="/">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text-sub">{"->"}All Order</span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li className="nav-link-sub">
                    <NavLink to="/">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text-sub">
                        {"->"}Pending Order
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li className="nav-link-sub">
                    <NavLink to="/">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text-sub">
                        {"->"}Delivered Product
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li className="nav-link-sub">
                    <NavLink to="/">
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text-sub">
                        {"->"}Returned Product
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                </>
              )}

              <li className="nav-link" onClick={handleDiscount}>
                <section>
                  <i className="bx bx-bar-chart-alt-2 icon"></i>
                  <span className="text nav-text">Discount</span>
                </section>
                <i
                  className={
                    discount
                      ? "bx bx-right-arrow-alt icon"
                      : "bx bx-down-arrow-alt icon"
                  }></i>
              </li>

              {!discount && (
                <>
                  <li className="nav-link-sub">
                    <NavLink to={`/admin/manageDiscount`}>
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text-sub">
                        {"->"}Manage Discount
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                  <li className="nav-link-sub">
                    <NavLink to={`/admin/addDiscount`}>
                      {/* <i className="bx bx-bell icon"></i> */}
                      <span className="text nav-text-sub">
                        {"->"} Add Discount
                      </span>
                      {/* <hr /> */}
                    </NavLink>
                  </li>
                  <hr />
                </>
              )}
            </ul>
          </div>

          <div className="bottom-content">
            <li className="">
              <NavLink to="/">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </NavLink>
            </li>

            {/* <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">Dark mode</span>

              <div className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li> */}
          </div>
        </div>
      </nav>

      {/* <section className="home">
        <div className="text">Dashboard Sidebar</div>
      </section> */}
    </>
  );
}

export default Sidebar