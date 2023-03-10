import React, { useState } from "react";
import "../Style/featuredproduct.css";
import { FrownOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { Button } from "antd";
// import ProductData from '../data/ProductData';
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ScrollToTop from "./ScrollToTop";
import { Rate, ConfigProvider } from "antd";
import "./custom.less";
import { isEmpty } from "lodash";

function RelatedProduct({ items}) {

  console.log(items);

  const displayUsers = items
    .map((item, index) => {
      return (
        <div className="pro" key={index}>
          <Link to={`/single-product/${item._id}`}>
            <img src={item.prod_image} alt="" />
          </Link>
          <div className="des">
            <h5>{item.prod_name}</h5>
            <span className="des-text">{item.prod_desc}</span>
            <div className="star">
              <Rate disabled defaultValue={item.rating} />
              <p>({item.user_count})</p>
            </div>
            <h4>{item.prod_price} ₹</h4>
          </div>
        </div>
      );
    });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
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
      {console.log(items)}
      {isEmpty(items) ? (
        <div className="not-found">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: "#000",
                  colorPrimaryHover: "#000",
                  colorPrimaryClick: "#000",
                  colorPrimaryActive: "#000",
                },
                Icon: {
                  colorPrimary: "#000",
                },
              },
            }}>
            <Result
              icon={<FrownOutlined style={{ color: "#000" }} />}
              title="No products found!"
              extra={
                <Button
                  type="primary"
                  onClick={() => window.location.reload(true)}>
                  Refresh
                </Button>
              }
            />
          </ConfigProvider>
        </div>
      ) : (
        <section id="product1" className="section-p1">
          {/* <h2>{title}</h2>
          <p>{des}</p> */}
          <div className="pro-container">{displayUsers}</div>
        </section>
      )}

      <ScrollToTop />



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

export default RelatedProduct;
