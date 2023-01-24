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

    const handleProfile = () =>{
        setAddress(false);
        setChangePassword(false);
        setForgotPassword(false);
        setOrderDetails(false);
        setProfile(true);
    }

    const handleAddress = () => {
        setProfile(false);
        setChangePassword(false);
        setForgotPassword(false);
        setOrderDetails(false);
        setAddress(true);
    };

    const handleChangepassword = () => {
        setProfile(false);
        setAddress(false);
        setForgotPassword(false);
        setOrderDetails(false);
        setChangePassword(true);
    };

    const handleForgotpassword = () => {
        setProfile(false);
        setAddress(false);
        setChangePassword(false);
        setOrderDetails(false);
        setForgotPassword(true);
    };

    const handleOrderdetails = () => {
        setProfile(false);
        setAddress(false);
        setChangePassword(false);
        setForgotPassword(false);
        setOrderDetails(true);
    }

  return (
    <>
      <Navbar />
      <div className="profile-container">
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
      <Footer />
    </>
  );
}

export default Profile