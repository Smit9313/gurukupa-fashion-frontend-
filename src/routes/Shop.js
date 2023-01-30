import React,{useState} from 'react';
// import { Outlet } from 'react-router-dom';
// import Start from '../components/Start';
import Footer from "../routes/Footer";
import FeaturedProduct from '../components/FeaturedProduct';
import '../Style/shop.css';
import ProductData from '../data/ProductData';
import Navbar from "../components/navbar/Navbar";

function Shop() {
  const [items,setItem] = useState(ProductData);
  const [priceDisplay, setPrice] = useState(4000);
  const [searchTerm, setsearchTerm] = useState("");

  // let pricewise  = items.map((data)=>data.price);
  // console.log(pricewise);

   let maxPrice = Math.max(...items.map((data) => data.price));

  const filterItem = (catItem) =>{
      const updatedItem = ProductData.filter((curEle)=>{
          return curEle.category === catItem;
      })
      setItem(updatedItem);
      setPrice(Math.max(...updatedItem.map((data)=>data.price)));
      // console.log(price);
  }

  const allItemHandler = () =>{
      setItem(ProductData);
      setPrice(Math.max(...ProductData.map((data) => data.price)));
      // console.log(price);
  }

  const searchProductHandler = (e) =>{
      setsearchTerm(e.target.value);
  }

  return (
    <>
      <Navbar />
      {/* <Start
        cName="hero-shop"
        // title="Contact Us"
        // text='We will be happy to assist you with any question ragarding purchases.'
        // buttonText='Shop Now'
        // btnClass='hide'
      /> */}
      <div className="extra-space-home"></div>

      <div className="shop-filter">
        <button onClick={allItemHandler}>All</button>
        <button onClick={() => filterItem("man")}>Man</button>
        <button onClick={() => filterItem("woman")}>Woman</button>
        <button onClick={() => filterItem("kids")}>Kids</button>
      </div>

      <div className="filters">
        <div className="filter-product">
          <h3>Price</h3>
          <div className="price-range">
            <p>0</p>
            <p>{maxPrice}</p>
          </div>
          <input
            type="range"
            min="0"
            name="price"
            max={maxPrice}
            value={priceDisplay}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <p>{priceDisplay}</p>
        </div>

        <div className="search-product">
          <input
            type="text"
            className="search-field"
            placeholder="Search product"
            value={searchTerm}
            onChange={searchProductHandler}
          />
        </div>
      </div>

      <FeaturedProduct
        items={items.filter((val) => {
          return (
            val.price <= priceDisplay &&
            val.des.toLowerCase().includes(searchTerm.toLocaleLowerCase())
          );
        })}
      />
      <Footer />
      {/* <Outlet /> */}
    </>
  );
}

export default Shop;