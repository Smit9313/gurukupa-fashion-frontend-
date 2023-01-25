import React from 'react';
import {Link} from 'react-router-dom';
import '../Style/error.css';
import Navbar from '../components/navbar/Navbar';

function Error() {
  return (
    <>
      <Navbar />
      <div className="error">
        <h1>
          <center>404 not found...</center>
          <center>            
              <Link to="/"><h6>Back to home</h6></Link>
          </center>
        </h1>
      </div>
    </>
  );
}

export default Error