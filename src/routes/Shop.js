import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import Footer from "../routes/Footer";
import FeaturedProduct from "../components/FeaturedProduct";
import "../Style/shop.css";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import { ShopOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import ClipLoader from "react-spinners/ClipLoader";

function Shop() {
  // const [items,setItem] = useState(ProductData);

  let { id } = useParams();
  let { cat, subcat } = useParams();
  let { kid, kidcat, kidsubcat } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [priceDisplay, setPrice] = useState(4000);
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();
  const [searchTerm, setsearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [product_data, setProductData] = useState(data);

  const [mentoggle, setMentoggle] = useState(false);
  const [womentoggle, setWomentoggle] = useState(false);
  const [kidtoggle, setKidtoggle] = useState(false);

  // let pricewise  = items.map((data)=>data.price);
  // console.log(pricewise);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get("http://127.0.0.1:8000/customer-product/", { headers })
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          setData(response.data.data);
          // console.log(response.data.data);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, []);

  useEffect(() => {
    // All
    if (id === "all") {
      setProductData(data);
      setMinPrice(Math.min(...data.map((data) => data.prod_price)));
      setMaxPrice(Math.max(...data.map((data) => data.prod_price)));
      setPrice(maxPrice);
    }

    try {
      axios
        .get("http://127.0.0.1:8000/navbar-shop-category/")
        .then((response) => {
          response.data.data.forEach((element) => {
            if (id === element.cat_type) {
              const updatedItem = data.filter((curEle) => {
                //  console.log(curEle.cat_type === catItem);
                return curEle.cat_type === element.cat_type;
              });
              //  console.log(updatedItem);
              setProductData(updatedItem);
              setMinPrice(
                Math.min(...updatedItem.map((data) => data.prod_price))
              );
              setMaxPrice(
                Math.max(...updatedItem.map((data) => data.prod_price))
              );
              setPrice(maxPrice);
            }

            element.Category.forEach((element1) => {
              // console.log(element1)
              if (cat === element.cat_type && subcat === element1.cat_title) {
                const updatedItem = data.filter((curEle) => {
                  //  console.log(curEle.cat_type === catItem);
                  return (
                    curEle.cat_type === element.cat_type &&
                    curEle.cat_title === element1.cat_title
                  );
                });
                //  console.log(updatedItem);
                setProductData(updatedItem);
                setMinPrice(
                  Math.min(...updatedItem.map((data) => data.prod_price))
                );
                setMaxPrice(
                  Math.max(...updatedItem.map((data) => data.prod_price))
                );
                setPrice(maxPrice);
              }
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("Error");
    }

    // Men
    // if (id === "Men") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Men";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // // Women
    // if (id === "Women") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Women";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // // Kids girls
    // if (id === "Kids(Boy)") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return (
    //       curEle.cat_type === "Kids(Boy)"
    //     );
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // // Kids girls
    // if (id === "Kids(Girls)") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return (
    //       curEle.cat_type === "Kids(Girls)"
    //     );
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // // Men/sub
    // if (cat === "Men" && subcat === "T-Shirts") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Men" && curEle.cat_title === "T-shirts";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // // Men/sub
    // if (cat === "Men" && subcat === "Jeans") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Men" && curEle.cat_title === "Jeans";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // // Men/sub
    // if (cat === "Men" && subcat === "CasualShirts") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return (
    //       curEle.cat_type === "Men" && curEle.cat_title === "Casual Shirts"
    //     );
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // // Men/sub
    // if (cat === "Men" && subcat === "FormalShirts") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return (
    //       curEle.cat_type === "Men" && curEle.cat_title === "Formal Shirts"
    //     );
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // // Men/sub
    // if (cat === "Men" && subcat === "Shorts") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Men" && curEle.cat_title === "Short";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // // Men/sub
    // if (cat === "Men" && subcat === "CasualTrousers") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return (
    //       curEle.cat_type === "Men" && curEle.cat_title === "Casual Trousers"
    //     );
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // // Men/sub
    // if (cat === "Men" && subcat === "Kurta") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return (
    //       curEle.cat_type === "Men" &&
    //       curEle.cat_title === "Kurtas & Kurtas Sets"
    //     );
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // // Women/sub
    // if (cat === "Women" && subcat === "Dresses") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Women" && curEle.cat_title === "Dresses";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // if (cat === "Women" && subcat === "Tops") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Women" && curEle.cat_title === "Top";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // if (cat === "Women" && subcat === "T-Shirts") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Women" && curEle.cat_title === "T-shirts";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // if (cat === "Women" && subcat === "Jeans") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Women" && curEle.cat_title === "Jeans";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // if (cat === "Women" && subcat === "Kurtas&Suits") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return (
    //       curEle.cat_type === "Women" && curEle.cat_title === "Kurtas & Suits"
    //     );
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // if (cat === "Women" && subcat === "LehengaCholi") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return (
    //       curEle.cat_type === "Women" && curEle.cat_title === "Lehenga Choli"
    //     );
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // // Kids/Boy
    // if (cat === "Kids" && subcat === "Boy") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Kids(Boy)";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // // Kids/Girl
    // if (cat === "Kids" && subcat === "Girl") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Kids(Girls)";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // if (kid === "Kids" && kidcat === "Boy" && kidsubcat === "Trousers") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return (
    //       curEle.cat_type === "Kids(Boy)" && curEle.cat_title === "Trousers"
    //     );
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // if (kid === "Kids" && kidcat === "Boy" && kidsubcat === "T-Shirts") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return (
    //       curEle.cat_type === "Kids(Boy)" && curEle.cat_title === "T-shirts"
    //     );
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // if (kid === "Kids" && kidcat === "Boy" && kidsubcat === "Shorts") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Kids(Boy)" && curEle.cat_title === "Shorts";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // if (kid === "Kids" && kidcat === "Boy" && kidsubcat === "Jeans") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Kids(Boy)" && curEle.cat_title === "Jeans";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // if (kid === "Kids" && kidcat === "Boy" && kidsubcat === "Shirts") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Kids(Boy)" && curEle.cat_title === "Shirts";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // // Kids/Girl
    // if (kid === "Kids" && kidcat === "Girl" && kidsubcat === "Dresses") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return (
    //       curEle.cat_type === "Kids(Girls)" && curEle.cat_title === "Dresses"
    //     );
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // if (kid === "Kids" && kidcat === "Girl" && kidsubcat === "T-shirt") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return (
    //       curEle.cat_type === "Kids(Girls)" && curEle.cat_title === "T-shirts"
    //     );
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // if (
    //   kid === "Kids" &&
    //   kidcat === "Girl" &&
    //   kidsubcat === "Jeans-Trousers-Capris"
    // ) {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return (
    //       curEle.cat_type === "Kids(Girls)" &&
    //       curEle.cat_title === "Jeans, Trousers & Capris"
    //     );
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // if (kid === "Kids" && kidcat === "Girl" && kidsubcat === "Kurta-Sets") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return (
    //       curEle.cat_type === "Kids(Girls)" && curEle.cat_title === "Kurta Sets"
    //     );
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }

    // if (kid === "Kids" && kidcat === "Girl" && kidsubcat === "Tops") {
    //   const updatedItem = data.filter((curEle) => {
    //     //  console.log(curEle.cat_type === catItem);
    //     return curEle.cat_type === "Kids(Girls)" && curEle.cat_title === "Tops";
    //   });
    //   //  console.log(updatedItem);
    //   setProductData(updatedItem);
    //   setMinPrice(Math.min(...updatedItem.map((data) => data.prod_price)));
    //   setMaxPrice(Math.max(...updatedItem.map((data) => data.prod_price)));
    //   setPrice(maxPrice);
    // }
  }, [data, id, cat, subcat, maxPrice, kid, kidcat, kidsubcat]);

  const filterItem = (catItem) => {
    if (catItem === "Men") {
      setMentoggle(!mentoggle);
      setWomentoggle(false);
      setKidtoggle(false);
    } else if (catItem === "Women") {
      setWomentoggle(!womentoggle);
      setMentoggle(false);
      setKidtoggle(false);
    } else {
    }

    if (catItem === "Men") {
      history.push("/shop/Men");
    }
    if (catItem === "Women") {
      history.push("/shop/Women");
    }
  };

  const filterKidsItem = (ele) => {
    if (ele === "Kids") {
      setKidtoggle(!kidtoggle);
      setWomentoggle(false);
      setMentoggle(false);
    }
    if (ele === "Kids") {
      history.push("/shop/Kids");
    }
  };

  const allItemHandler = () => {
    history.push("/shop/all");
  };

  const searchProductHandler = (e) => {
    setsearchTerm(e.target.value);
  };

  let string_with_slashes = location.pathname.substring(1);
  let array_of_elements = string_with_slashes.split("/");
  console.log(array_of_elements);

  return (
    <>
      <Navbar />
      <div className="extra-space-home"></div>
      {/* <div className="shop-filter">
        <div>
          <button onClick={allItemHandler}>All</button>
        </div>
        <div className="">
          <button onClick={() => filterItem("Men")}>Man</button>
          {mentoggle && (
            <div className="sub1-category-container">
              <Link>
                <p>T-Shirt</p>
              </Link>
              <Link>
                <p>Jeans</p>
              </Link>
              <Link>
                <p>Casual Shirt</p>
              </Link>
              <Link>
                <p>Formal Shirt</p>
              </Link>
              <Link>
                <p>Shorts Casual Trouser</p>
              </Link>
              <Link>
                <p>Kurta</p>
              </Link>
            </div>
          )}
        </div>
        <div className="">
          <button onClick={() => filterItem("Women")}>Woman</button>
          {womentoggle && (
            <div className="sub1-category-container">
              <Link>Dress </Link>
              <Link>Tops</Link>
              <Link>T-Shirts</Link>
              <Link>Jeans</Link>
              <Link>Kurtas & Suits</Link>
            </div>
          )}
        </div>
        <div className="">
          <button onClick={() => filterKidsItem("Kids")}>Kids</button>
          {kidtoggle && (
            <div className="kids-sub-category">
              <div className="sub1-category-container">
                <Link to="/shop/Kids/Boy">
                  <b>Boy</b>
                </Link>
                <Link>T-Shirt</Link>
                <Link>Jeans</Link>
                <Link>Casual Shirt</Link>
                <Link>Formal Shirt</Link>
                <Link>Shorts Casual Trouser</Link>
                <Link>Kurta</Link>
              </div>
              <hr />
              <div className="sub1-category-container">
                <Link>
                  <b>Girl</b>
                </Link>
                <Link>T-Shirt</Link>
                <Link>Jeans</Link>
                <Link>Casual Shirt</Link>
                <Link>Formal Shirt</Link>
                <Link>Shorts Casual Trouser</Link>
                <Link>Kurta</Link>
              </div>
            </div>
          )}
        </div>
      </div> */}
      {loading ? (
        <>
          <div className="filters">
            <div className="filter-product">
              <h3>Price</h3>
              <div className="price-range">
                <p>{minPrice}</p>
                <p>{maxPrice}</p>
              </div>
              <input
                type="range"
                min={minPrice}
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

          {
            <div className="url-path">
              {/* <p>{location.pathname.substring(1)}</p> */}
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to={`/${array_of_elements[0]}`}>
                    <ShopOutlined /> Shop
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`/${array_of_elements[0]}/${array_of_elements[1]}`}>
                    {array_of_elements[1]}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{array_of_elements[2]}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          }

          <FeaturedProduct
            items={product_data.filter((val) => {
              return (
                val.prod_price <= priceDisplay &&
                (val.prod_name
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase()) ||
                  val.prod_desc
                    .toLowerCase()
                    .includes(searchTerm.toLocaleLowerCase()))
              );
            })}
          />
        </>
      ) : (
        <div className="loader-spin">
          <ClipLoader color="#000" />
        </div>
      )}

      <Footer />
      {/* <Outlet /> */}
    </>
  );
}

export default Shop;
