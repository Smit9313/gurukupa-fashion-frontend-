import React,{useEffect} from 'react';
import Footer from './Footer.js';
import '../Style/home.css';
// import FeaturedProduct from '../components/FeaturedProduct.js';
// import Start from '../components/Start.js';
// import ProductData from '../data/ProductData.js';
import Banner from '../components/Banner.js';
import Banner1 from '../components/Banner1.js';
import Navbar from "../components/navbar/Navbar";
import Slider from "react-slick";
import axios from 'axios';

function Home() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows:false,
  };

    useEffect(() => {
      axios
        .get("http://127.0.0.1:8000/myview")
        .then((response) => console.log(response.data))
        // .then(data => setData(data))
        .catch((error) => console.log(error));
    }, []);

  return (
    <>
      <Navbar />
      <div className="extra-space-home"></div>

      <div>
        {/* <h2> Single Item</h2> */}
        <Slider {...settings}>
          <div className="set-image">
            <img
              src="https://cdn.shopify.com/s/files/1/1982/7331/files/shacket_2_1_1520x.progressive.png.jpg?v=1671282384"
              alt=""
            />
          </div>
          <div className="set-image">
            <img
              src="https://cdn.shopify.com/s/files/1/1982/7331/files/7_1_1_1520x.progressive.png.jpg?v=1668423528"
              alt=""
            />
          </div>
          <div className="set-image">
            <img
              src="https://cdn.shopify.com/s/files/1/1982/7331/files/imgpsh_fullsize_anim_11_1_1520x.progressive.png.jpg?v=1667217451"
              alt=""
            />
          </div>
          <div className="set-image">
            <img
              src="https://cdn.shopify.com/s/files/1/1982/7331/files/Marvel_Merch_1_1366x.progressive_4_11zon_d718d0f3-25a6-4833-b9ce-99ecfc9f90c2_1520x.progressive.jpg?v=1666333939"
              alt=""
            />
          </div>
        </Slider>
      </div>

      {/* <Start cName = 'hero' 
          title = "Let's Create Your Own Style"
          text= 'Use body measurment tool to get perfect fitting.'
          buttonText = 'Shop Now'
          btnClass = 'show'
            /> */}
      <Banner />
      {/* <FeaturedProduct items={ProductData} title="Featured Products" des="Summer Collection New morden Design"/> */}
      <Banner1 />

      <Footer />
    </>
  );
}

export default Home