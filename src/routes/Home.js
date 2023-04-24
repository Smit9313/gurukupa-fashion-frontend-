import React, { useState, useEffect } from "react";
import Footer from "./Footer.js";
import { Link } from "react-router-dom";
import "../Style/home.css";
// import FeaturedProduct from '../components/FeaturedProduct.js';
// import Start from '../components/Start.js';
// import ProductData from '../data/ProductData.js';
import Banner from "../components/Banner.js";
import Banner1 from "../components/Banner1.js";
import Navbar from "../components/navbar/Navbar";
import Slider from "react-slick";
import HomeImages from "../data/HomeImages";
import axios from "axios";
import RelatedProduct from "../components/RelatedProduct.js";
import { isEmpty } from "lodash";

function Home() {
  const [user, setUser] = useState(localStorage.getItem("token"));
  const [productData, setProductData] = useState();
  const [navClose, setNavClose] = useState(false);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/homepage-product/`)
        .then((response) => {
          console.log(response);
          setProductData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  // console.log(user);

  return (
    <>
      <Navbar closeNav={navClose} />
      {/* <div className="extra-space-home"></div> */}
      {/* <Category/> */}
      <div onClick={() => setNavClose(!navClose)}>
        <div className="slider">
          {/* <h2> Single Item</h2> */}
          <Slider {...settings}>
            {/* <div className="set-image">
            <img src={HomeImages.url} alt="" />
          </div>
          <div className="set-image">
            <img src="home/home2.jpg" alt="" />
          </div>
          <div className="set-image">
            <img src="home/home3.jpg" alt="" />
          </div> */}

            {HomeImages.map((item, index) => {
              return (
                <div key={index} className="set-image">
                  <img src={item.url} alt="img-home" />
                </div>
              );
            })}
          </Slider>
        </div>

        {/* <Start cName = 'hero' 
          title = "Let's Create Your Own Style"
          text= 'Use body measurment tool to get perfect fitting.'
          buttonText = 'Shop Now'
          btnClass = 'show'
            /> */}
        {/* <Banner /> */}

        {!isEmpty(productData) &&
          productData.map((element, index) => {
            console.log(element);
            return (
              <>
                <div
                  id="prodetails-suggestion"
                  style={{ marginBottom: "20px!impotant" }}
                  key={index}>
                  <center>
                    <h2>{element.cat_type}</h2>
                  </center>

                  <RelatedProduct items={element.Product} />
                  <Link
                    to={`/shop/${element.cat_type}`}
                    style={{
                      textDecoration: "none",
                      fontSize: "15px",
                      color: "black",
                      // marginLeft:"1200px"
                    }}>
                    {/* view more.. */}
                    <center>
                      <button className="normal">view more..</button>
                    </center>
                  </Link>
                </div>
                <br/>
                <hr />
              </>
            );
          })}

        <Banner1 />

        <Footer />
      </div>
    </>
  );
}

export default Home;
