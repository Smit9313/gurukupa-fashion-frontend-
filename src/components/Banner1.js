import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/banner1.css'

function Banner1() {
  return (
    <div className="banner1-image">
      <Link to="/shop">
        
        <img
          src="https://firebasestorage.googleapis.com/v0/b/clothing-store-2.appspot.com/o/site_images%2Fdiscount-banner.png?alt=media&token=6429c70b-4653-4452-84f9-d327e6bf02d9"
          height="400px"
          width="100%"
        />
      </Link>
    </div>
  );
}

export default Banner1