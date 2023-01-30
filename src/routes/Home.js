import React,{useState} from 'react';
import Footer from './Footer.js';
import '../Style/home.css';
// import FeaturedProduct from '../components/FeaturedProduct.js';
// import Start from '../components/Start.js';
// import ProductData from '../data/ProductData.js';
import Banner from '../components/Banner.js';
import Banner1 from '../components/Banner1.js';
import Navbar from "../components/navbar/Navbar";
import Slider from "react-slick";
import HomeImages from "../data/HomeImages";
import Category from '../components/Category';

function Home() {

  const [user ,setUser] = useState(sessionStorage.getItem("token"));

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

  // console.log(user);


  return (
    <>
      <Navbar />
      {/* <div className="extra-space-home"></div> */}
      {/* <Category/> */}
      <div className='slider'>
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
          
          {HomeImages.map((item,index)=>{
              return <div key={index} className="set-image">
                <img src={item.url} alt="img-home"/>
              </div>
          })}

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