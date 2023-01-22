import React,{useState} from 'react';
import './nav.css';

function Nav() {
    const [icon,setIcon] = useState(true);

    const handleSidebar = () =>{
        setIcon(!icon);
        // console.log(icon);
    }

  return (
    <>
      <div className={icon ? 'home-section' : ' home-section home-section-mobile'}>
        <nav className='admin-nav'>
          <div className="sidebar-button">
            <i
              className={
                icon
                  ? "bx bx-menu sidebarBtn"
                  : "bx bx-menu-alt-right sidebarBtn"
              }
              onClick={handleSidebar}></i>
            {/* <span className="dashboard">Dashboard</span> */}
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <i className="bx bx-search"></i>
          </div>
          <div className="profile-details">
            <img src="logo/user-profile-icon.svg" alt="" />
            <span className="admin_name">Chintan Thakkar</span>
            {/* <i className="bx bx-chevron-down"></i> */}
          </div>
        </nav>
      </div>
    </>
  );
}

export default Nav