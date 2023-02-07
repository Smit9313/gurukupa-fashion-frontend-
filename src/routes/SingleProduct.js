import React,{useState, useEffect} from 'react';
import '../Style/singleproduct.css';
import { useParams } from 'react-router-dom';
// import Start from "../components/Start";
import Footer from "./Footer";
import Navbar from '../components/navbar/Navbar'
import axios from 'axios';
// import img from '../assets/cloths/1.jpg';



function SingleProduct() {

  // const [val,setVal] = useState(1);
  const [url,setUrl] = useState('cloths/1.jpg'); 
  let { product_id } = useParams();

  const [data, setData] = useState("");

  // console.log(product_id)

  useEffect(() => {
    try {
      axios
        .get(`http://127.0.0.1:8000/customer-product/${product_id}`)
        .then((response) => {
          // console.log(response.data.data.prod_image[0])
          setData(response.data.data)    
          setUrl(response.data.data.prod_image[0]);      
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}


  }, [product_id])
  




  return (
    <>
      <Navbar />
      {/* <Start cName="hero-singleproduct"/> */}
      {data !== "" && (
        <section id="prodetails" className="section-p1">
          <div className="single-pro-image">
            <img src={url} width="100%" id="MainImg" alt="" />

            <div className="small-img-group">
              <div className="small-img-col">
                <img
                  src={data.prod_image[0]}
                  width="100%"
                  className="small-img"
                  alt=""
                  onClick={() => setUrl(data.prod_image[0])}
                />
              </div>

              <div className="small-img-col">
                <img
                  src={data.prod_image[1]}
                  className="small-img"
                  alt=""
                  onClick={() => setUrl(data.prod_image[1])}
                />
              </div>

              <div className="small-img-col">
                <img
                  src={data.prod_image[2]}
                  width="100%"
                  className="small-img"
                  alt=""
                  onClick={() => setUrl(data.prod_image[2])}
                />
              </div>

              {/* <div className='small-img-col'>
              <img src='cloths/4.jpg' width='100%' className='small-img' alt='' onClick={() => setUrl("cloths/4.jpg")} />
            </div> */}
            </div>
          </div>

          <div className="single-pro-details">
            {/* <h4>Home / T-Shirt</h4> */}
            <h3>{data.prod_name}</h3>
            <h2>{data.prod_price} ₹</h2>
            <select>
              <option>Select size</option>
              <option>XL</option>
              <option>XXL</option>
              <option>Small</option>
              <option>Large</option>
            </select>
            <input type="number" defaultValue="1" min="1" max="10" />
            <button
              type="submit"
              className="normal"
              onClick={() => {
                console.log("Hello");
              }}>
              Add to cart
            </button>
            <h4>Product details</h4>
            <span>{data.prod_desc}</span>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}

export default SingleProduct