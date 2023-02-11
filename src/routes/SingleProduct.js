import React,{useState, useEffect} from 'react';
import '../Style/singleproduct.css';
import { useParams } from 'react-router-dom';
// import Start from "../components/Start";
import Footer from "./Footer";
import Navbar from '../components/navbar/Navbar'
import axios from 'axios';
import { Radio } from "antd";
// import img from '../assets/cloths/1.jpg';



function SingleProduct() {

  // const [val,setVal] = useState(1);
  const [url,setUrl] = useState('cloths/1.jpg'); 
  let { product_id } = useParams();


  const [data, setData] = useState("");
  const [prod_qty,setProd_qty] = useState(1);
  const [prod_size,setProd_size] = useState("S");

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
  
  // console.log(data);

  const handleQty = (event)=>{
    const value = event.target.value;
    const valueInt = parseInt(value);

    if (value !== "" && valueInt > 0 && valueInt < 100) {
      setProd_qty(valueInt);
    } 
  }



  const handleAddToCart = ()=>{
 
    if(product_id !== "" && prod_qty !== "" && prod_size !== ""){


      const abc = prod_size.toString()

      const token = sessionStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        axios
          .post("http://127.0.0.1:8000/cart/", 
          {
             "prod_id":product_id,
             "prod_qty":{
              [ prod_size]:prod_qty,
             }
          },{ headers })
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {}


    }

  }


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
            </div>
          </div>

          <div className="single-pro-details">
            <h1>{data.prod_name}</h1>
            <h2>{data.prod_price} ₹</h2>
            <div className="size-container">
              <Radio.Group
                defaultValue="S"
                buttonStyle="solid"
                // value={prod_size}
                onChange={(value)=> setProd_size(value.target.value)}
                >
                {Object.keys(data.prod_qty).map((qty, index) => {
                  return (
                    <>
                      <Radio.Button key={index} value={qty}>
                        {qty}
                      </Radio.Button>
                    </>
                  );
                })}
              </Radio.Group>
              {Object.keys(data.prod_qty).length === 0 &&
                data.prod_qty.constructor === Object && (
                  <p className="out-stock">
                    This item is currently out of stock
                  </p>
                )}
            </div>
            <input
              type="text"
              className="quantity"
              step="1"
              value={prod_qty}
              onChange={(event) => handleQty(event)}
            />
            <button
              type="submit"
              className="normal"
              onClick={handleAddToCart}>
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