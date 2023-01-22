import React,{useState} from 'react';
import '../Style/singleproduct.css';
import Start from "../components/Start";
import Footer from "./Footer";
import Navbar from '../components/navbar/Navbar'
// import img from '../assets/cloths/1.jpg';



function SingleProduct() {

  // const [val,setVal] = useState(1);
  const [url,setUrl] = useState('cloths/1.jpg'); 


  return (
    <>
    <Navbar/>
      {/* <Start cName="hero-singleproduct"/> */}

      <section id='prodetails' className='section-p1'>
        <div className='single-pro-image'>
          <img src={url} width='100%' id='MainImg' alt=''/>

          <div className='small-img-group'>
            <div className='small-img-col'>
              <img src='cloths/1.jpg' width='100%' className='small-img' alt='' onClick={() => setUrl("cloths/1.jpg")} />
            </div>

            <div className='small-img-col'>
              <img src='cloths/2.jpg' className='small-img' alt='' onClick={() => setUrl("cloths/2.jpg")} />
            </div>

            <div className='small-img-col'>
              <img src='cloths/3.jpg' width='100%' className='small-img' alt='' onClick={() => setUrl("cloths/3.jpg")} />
            </div>

            <div className='small-img-col'>
              <img src='cloths/4.jpg' width='100%' className='small-img' alt='' onClick={() => setUrl("cloths/4.jpg")} />
            </div>
          </div>

        </div>

        <div className='single-pro-details'>
          <h4>Home / T-Shirt</h4>
          <h3>Men's Fashion T-Shirt</h3>
          <h2>999</h2>
          <select>
            <option>Select size</option>
            <option>XL</option>
            <option>XXL</option>
            <option>Small</option>
            <option>Large</option>
          </select>
          <input type="number" defaultValue='1' min='1' max='50' />
          <button className='normal'>Add to cart</button>
          <h4>Product details</h4>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore 
                et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut 
                aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse 
                cillum dolore eu fugiat nulla pariatur. Excepteur 
                sint occaecat cupidatat non proident, sunt in culpa 
                qui officia deserunt mollit anim id est laborum.
          </span>
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default SingleProduct