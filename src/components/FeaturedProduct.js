import React,{ useState } from 'react';
import '../Style/featuredproduct.css';
// import ProductData from '../data/ProductData';
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import ScrollToTop from './ScrollToTop';
// import AOS from "aos";

function FeaturedProduct({items,title,des}) {

    // const [searchTerm, setsearchTerm] = useState("");
    // const [productItems, setProductItems] = useState(items);
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;

    const displayUsers = items
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((item,index) => {
        return (
          
            // <div className="pro-container">
            <div className="pro" key={index}>
              <Link to="/single-product">
                <img src={item.url} alt="" />
              </Link>
              {/* <img src='../assets/products/rock-staar-2XcbGfYShfk-unsplash.jpg' alt='jksjk'/> */}
              {/* </div> */}
              <div className="des">
                <span>{item.title}</span>
                <h5>{item.des}</h5>
                <div className="star">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <h4>{item.price}</h4>
              </div>
              <Link to="/cart-products">
                <img className="cart" src="logo/shopping-cart.png" alt="" />
              </Link>
            </div>
            // </div>
         
        );
    });

    const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
    }
    
      const pageCount = Math.ceil(items.length / usersPerPage);

      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };


  return (
    <>
      {/* <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        onClick={scrollToTop}
      /> */}
      <section id="product1" className="section-p1">
        <h2>{title}</h2>
        <p>{des}</p>
        <div className="pro-container">{displayUsers}</div>
      </section>
      <ScrollToTop />

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        onClick={scrollToTop}
      />

      {/* <div>
        <section id="product1" className="section-p1" >
          <h2>{title}</h2>
          <p>{des}</p>
          <div className="pro-container">
            {items
              // .filter((val) => {
              //   return val.des
              //     .toLowerCase()
              //     .includes(searchTerm.toLocaleLowerCase());
              // })
              .map((item, index) => {
                return (
                  
                  <div className="pro" key={index}>
                    <Link to="/single-product">
                      <img src={item.url} alt="" />
                    </Link>
                    {/* <img src='../assets/products/rock-staar-2XcbGfYShfk-unsplash.jpg' alt='jksjk'/> */}
      {/* </div> 
                    <div className="des">
                      <span>{item.title}</span>
                      <h5>{item.des}</h5>
                      <div className="star">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                      <h4>{item.price}</h4>
                    </div>
                    <Link to="/cart-products">
                      <img
                        className="cart"
                        src="logo/shopping-cart.png"
                        alt=""
                      />
                    </Link>
                  </div>
                );
              })}
          </div>
        </section>
      </div> */}
    </>
  );
}

export default FeaturedProduct