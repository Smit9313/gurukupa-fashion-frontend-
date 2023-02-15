import React,{useState} from 'react';
import Navbar from '../components/navbar/Navbar';
import '../Style/profile.css';
import Footer from './Footer';

function Profile() {

  return (
    <>
      <Navbar />
      <div className="exp"></div>
      <div className="profile-container">
        <div className="profile-user-details">
          <h4>User Details:</h4>
          <div className="profile-user-details-sub">
            <p>Name:</p>
            <br />
            <p>Email:</p>
            <br />
            <p>Mobile no:</p>
            <br />
          </div>
        </div>

        <div className="profile-user-address">
          <div className="profile-user-details-sub">
            <p>Name:</p>
            <br />
            <p>Email:</p>
            <br />
            <p>Mobile no:</p>
            <br />
          </div>
        </div>

        <div className="profile-user-order"></div>
        <div className="profile-user-forgotpassword"></div>
      </div>
      <Footer />
    </>
  );
}

export default Profile