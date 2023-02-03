import React from 'react';
import Footer from './Footer';
import Navbar from '../components/navbar/Navbar';

function ChangePassword() {
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
                <span className="details">Password:</span>
                <input type="text" placeholder="password" />
              </div>
              <div className="input-box">
                <span className="details">Confirm password:</span>
                <input type="text" placeholder="confirm password" />
              </div>
            </div>

            <button type="submit">Change password</button>

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

export default ChangePassword