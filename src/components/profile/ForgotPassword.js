import React from 'react'

function ForgotPassword() {
  return (
    <div className="profile-sub-2">
      <h2>Forgot PassWord</h2>
      <hr />
      <div className="down-pf"></div>
      <div className="profile-sub-4">
        <h4>Enter Email:</h4>
        <input type="text" placeholder="Enter Old PassWord..." />{" "}
      </div>
      {/* <div className="profile-sub-4">
        <h4>New PassWord:</h4>
        <input type="text" placeholder="Enter New Password..." />{" "}
      </div>
      <div className="profile-sub-4">
        <h4>Confirm Password:</h4>
        <input type="text" placeholder="Enter Again..." />{" "}
      </div> */}
      <div className="profile-sub-4">
        <button>Send password</button>
      </div>
    </div>
  );
}

export default ForgotPassword