import React,{useState} from 'react';
import MenuItems from './ManuData';
import {NavLink,Link} from 'react-router-dom';
import './NavbarStyle.css';


function Navbar() {
    const [icon, setIcon] = useState(false);

    const handleClick = () =>{
        setIcon(!icon);
    }


  return (
    <>
        <nav className='NavBarItems'>
            <img src="/logo/gurukrupa.png" alt='' height='40px' width='130px'/>
            

            <ul className={icon ? "nav-menu active-mb" : "nav-menu"}>
                {MenuItems.map((item,index)=>{
                    return(
                    <li key={index}>
                        <NavLink to={item.url} className={item.cName} activeClassName="active-link" onClick={handleClick}>
                            {/* <i> */}
                                {item.title}
                            {/* </i> */}
                        </NavLink>
                    </li>
                    );
                })}
            </ul>
              <Link to="/cart-products"><img src="/logo/shopping-cart.png" alt='' className='cart-img' height="35px" width="35px" /></Link>
              <div className='menu-icons'>
                  <Link to="/cart-products"><img src="/logo/shopping-cart.png" alt='' className='cart-mb' height="45px" width="45px" /></Link>
                  <i className={icon ? "fas fa-times" : "fas fa-bars"} onClick={handleClick}></i>
              </div>
        </nav>
    </>
  )
}

export default Navbar