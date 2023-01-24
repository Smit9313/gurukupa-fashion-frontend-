import React from 'react'

function AddAddress() {
  return (
    <div className="profile-sub-2">
      <h2>Add Address</h2>
      <hr />
      <div className="down-pf"></div>
      <div className="profile-sub-3">
        <h4>House No:</h4>
        <input type="text" placeholder="Enter House No..." />
      </div>
      <div className="profile-sub-3">
        <h4>Area Street:</h4>
        <input type="text" placeholder="Enter House No..." />
      </div>
      <div className="profile-sub-3">
        <h4>State:</h4>
        <input type="text" placeholder="Enter House No..." />{" "}
      </div>
      <div className="profile-sub-3">
        <h4>City:</h4>
        <input type="text" placeholder="Enter House No..." />{" "}
      </div>
      <div className="profile-sub-3">
        <h4>Pincode:</h4>
        <input type="text" placeholder="Enter House No..." />{" "}
      </div>
      <div className="profile-sub-3">
        {/* <h4>Pincode:</h4>
        <input type="text" placeholder="Enter House No..." />{" "} */}
        <button>Add</button>
      </div>
    </div>
  );
}

export default AddAddress