import React from 'react';
import '../Style/error.css';
import Navbar from '../components/navbar/Navbar';

function Error() {
  return (
    <>
      <Navbar />
      <div className="error">
        <h1>
          <center>404 not found...</center>
        </h1>
      </div>
    </>
  );
}

export default Error