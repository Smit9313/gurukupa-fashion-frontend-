import React from 'react';
import Navbar from "../components/navbar/Navbar";
import Footer from './Footer';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <>
      <Navbar />
      <div className="extra-space-login"></div>
      <div className="container1">
        <div className="title">Reset Password</div>
        <div className="content">
          <form>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Email:</span>
                <input type="text" placeholder="Email address" />
              </div>
            </div>

            <button type="submit">Send mail</button>

            {/* <div className="footer-f">
              <h4>
                Don't have an account ?{" "}
                <Link className="" to="./register">
                  Register Now
                </Link>
              </h4>
            </div> */}
          </form>
        </div>
      </div>

      <div className="extra-space-login"></div>

      <Footer />
    </>
  );
}

export default ForgotPassword