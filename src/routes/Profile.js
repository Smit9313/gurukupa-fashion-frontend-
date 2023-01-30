import React,{useState} from 'react';
import Navbar from '../components/navbar/Navbar';
import '../Style/profile.css';
import Footer from './Footer';
import ProfileDetails from '../components/profile/ProfileDetails';
import AddAddress from '../components/profile/AddAddress';
import ChangePassword from '../components/profile/ChangePassword';
import ForgotPassword from '../components/profile/ForgotPassword';
import OrderDetails from '../components/profile/OrderDetails';

function Profile() {

    const [profile,setProfile] = useState(true);
    const [address, setAddress] = useState(false);
    const [changepassword, setChangePassword] = useState(false);
    const [forgotpassword, setForgotPassword] = useState(false);
    const [orderdetails,setOrderDetails] = useState(false);
    const [arrow, setArrow] = useState(true);

    const [user, setUser] = useState(sessionStorage.getItem("token"));
    

    const handleProfile = () =>{
        setAddress(false);
        setChangePassword(false);
        setForgotPassword(false);
        setOrderDetails(false);
        setArrow(!arrow);
        setProfile(true);
    }

    const handleAddress = () => {
        setProfile(false);
        setChangePassword(false);
        setForgotPassword(false);
        setOrderDetails(false);
        setArrow(!arrow);
        setAddress(true);
    };

    const handleChangepassword = () => {
        setProfile(false);
        setAddress(false);
        setForgotPassword(false);
        setOrderDetails(false);
        setArrow(!arrow);
        setChangePassword(true);
    };

    const handleForgotpassword = () => {
        setProfile(false);
        setAddress(false);
        setChangePassword(false);
        setOrderDetails(false);
        setArrow(!arrow);
        setForgotPassword(true);
    };

    const handleOrderdetails = () => {
        setProfile(false);
        setAddress(false);
        setChangePassword(false);
        setForgotPassword(false);
        setArrow(!arrow);
        setOrderDetails(true);
    }

    const handleArrow = () => {
      setArrow(!arrow);
    };


  return (
    <>
      <Navbar />
      {user !== null && (
        <div className="profile-container">
          <div className="profile-mb-1">
            <div className="profile-cat-main-mb" onClick={handleProfile}>
              <center>Profile Overview</center>
              <i
                className={arrow ? "fas fa-angle-right" : "fas fa-angle-down"}
                onClick={handleArrow}></i>
            </div>
            {!arrow && (
              <>
                <div className="profile-cat-mb" onClick={handleProfile}>
                  <center>Profile</center>
                </div>
                <div className="profile-cat-mb" onClick={handleAddress}>
                  <center>Addresses</center>
                </div>
                <div className="profile-cat-mb" onClick={handleChangepassword}>
                  <center>Change PassWord</center>
                </div>
                <div className="profile-cat-mb" onClick={handleForgotpassword}>
                  <center>Forgot Password</center>
                </div>
                <div className="profile-cat-mb" onClick={handleOrderdetails}>
                  <center>Order Details</center>
                </div>
              </>
            )}
          </div>

          <div className="profile-sub-1">
            <div className="profile-cat" onClick={handleProfile}>
              <center>Profile</center>
            </div>
            <div className="profile-cat" onClick={handleAddress}>
              <center>Addresses</center>
            </div>
            <div className="profile-cat" onClick={handleChangepassword}>
              <center>Change PassWord</center>
            </div>
            <div className="profile-cat" onClick={handleForgotpassword}>
              <center>Forgot Password</center>
            </div>
            <div className="profile-cat" onClick={handleOrderdetails}>
              <center>Order Details</center>
            </div>
          </div>

          {/* Profile */}

          {profile && <ProfileDetails />}
          {address && <AddAddress />}
          {changepassword && <ChangePassword />}
          {forgotpassword && <ForgotPassword />}
          {orderdetails && <OrderDetails />}
        </div>
      )}

      {user == null && (
        <div className='error-profile'>
          <h1>404 not found...</h1>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Profile