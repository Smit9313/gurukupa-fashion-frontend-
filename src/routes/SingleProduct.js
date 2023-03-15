import React, { useState, useEffect } from "react";
import "../Style/singleproduct.css";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import { FrownOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { Button } from "antd";
import { ConfigProvider, Radio } from "antd";
import { Toaster, toast } from "react-hot-toast";
import { isEmpty } from "lodash";
import { Rate } from "antd";
import jwtDecode from "jwt-decode";
import RelatedProduct from "../components/RelatedProduct";
import { ShopOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

function SingleProduct() {
  // const [val,setVal] = useState(1);
  const [url, setUrl] = useState("cloths/1.jpg");
  let { product_id } = useParams();
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [data, setData] = useState("");
  const [prod_qty, setProd_qty] = useState(1);
  const [prod_size, setProd_size] = useState();
  const [isUser, setisUser] = useState("");
  const [selectSize, setSelectSize] = useState(false);
  const [navrender, setNavRender] = useState(true);
  const [relatedProduct, setrelatedProduct] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/customer-product/${product_id}`)
        .then((response) => {
          console.log(response);
          if (response.data.message === "Success!") {
            setData(response.data.data);
            setUrl(response.data.data.prod_image[0]);
            console.log(response.data.data.cat_id);

            try {
              axios
                .get(
                  `${process.env.REACT_APP_API_HOST}/suggested-product/${response.data.data.cat_id}`
                )
                .then((response) => {
                  console.log(response);
                  if (response.data.message === "Success!") {
                    setrelatedProduct(response.data.data);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            } catch (err) {}
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, [product_id]);

    
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const decoded = jwtDecode(token);
      setRole(decoded["id"]["role"]);
    }
  }, [role, token]);

  const handleQty = (event) => {
    const value = event.target.value;
    const valueInt = parseInt(value);

    if (value !== "" && valueInt > 0 && valueInt < 100) {
      setProd_qty(valueInt);
    }
  };

  const handleAddToCart = () => {
    console.log(prod_size);
    if (product_id !== "" && prod_qty !== "" && prod_size !== undefined) {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        axios
          .post(
            `${process.env.REACT_APP_API_HOST}/cart/`,
            {
              prod_id: product_id,
              prod_qty: {
                [prod_size]: prod_qty,
              },
            },
            { headers }
          )
          .then((response) => {
            console.log(response.data.message);

            if (response.data.message === "Success!") {
              toast.success("Product added!", {
                duration: 3000,
              });
              setNavRender(!navrender);
            } else if (response.data.message === "Token corrupted.") {
              toast.error("Please login first to use cart!", {
                duration: 3000,
              });
            } else {
              toast.error(response.data.message, {
                duration: 3000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {}
    } else {
      setSelectSize(true);
    }
  };

  const handleMegicClick = () => {
    const token = localStorage.getItem("token");
    history.push("/megic");
  };

  return (
    <>
      <Navbar navrender={navrender} />
      {/* <Start cName="hero-singleproduct"/> */}
      {!isEmpty(data) ? (
        <>
          <section id="prodetails" className="section-p1">
            <div className="single-pro-image">
              <img
                src={url}
                width="100%"
                id="MainImg"
                alt=""
                className="animate__animated animate__zoomIn"
              />

              <div className="small-img-group">
                <div className="small-img-col">
                  <img
                    src={data.prod_image[0]}
                    width="100%"
                    className="small-img animate__animated animate__zoomIn"
                    alt=""
                    onClick={() => setUrl(data.prod_image[0])}
                  />
                </div>

                <div className="small-img-col">
                  <img
                    src={data.prod_image[1]}
                    className="small-img animate__animated animate__zoomIn"
                    alt=""
                    onClick={() => setUrl(data.prod_image[1])}
                  />
                </div>

                <div className="small-img-col">
                  <img
                    src={data.prod_image[2]}
                    width="100%"
                    className="small-img animate__animated animate__zoomIn"
                    alt=""
                    onClick={() => setUrl(data.prod_image[2])}
                  />
                </div>
              </div>
            </div>

            <div className="single-pro-details">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to={`/shop`}>
                    <ShopOutlined /> Shop
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`/shop/${data.cat_type}`}>{data.cat_type}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`/shop/${data.cat_type}/${data.cat_title}`}>
                    {data.cat_title}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{data.prod_name}</Breadcrumb.Item>
              </Breadcrumb>
              <br />
              <h1>{data.prod_name}</h1>
              <Rate disabled defaultValue={data.rating} />
              <p>({data.user_count})</p>
              <h2>{data.prod_price} ₹</h2>
              <div className="size-container">
                <ConfigProvider
                  theme={{
                    components: {
                      Radio: {
                        colorPrimary: "#000",
                        colorPrimaryHover: "#000",
                      },
                    },
                  }}>
                  <Radio.Group
                    buttonStyle="solid"
                    onChange={(value) => {
                      setProd_size(value.target.value);
                      if (value.target.value === "") {
                        setSelectSize(true);
                      } else {
                        setSelectSize(false);
                      }
                    }}>
                    {!isEmpty(data.prod_qty) &&
                      Object.keys(data.prod_qty).map((qty, index) => {
                        return (
                          <>
                            <Radio.Button key={index} value={qty}>
                              {qty}
                            </Radio.Button>
                          </>
                        );
                      })}
                  </Radio.Group>
                </ConfigProvider>
                {isEmpty(data.prod_qty) &&
                  Object.keys(data.prod_qty).length === 0 &&
                  data.prod_qty.constructor === Object && (
                    <p className="out-stock">
                      This item is currently out of stock
                    </p>
                  )}
                {selectSize && !isEmpty(data.prod_qty) && (
                  <p className="out-stock">Please select a size</p>
                )}
              </div>
              <input
                type="number"
                className="quantity"
                min={1}
                max={10}
                step="1"
                value={prod_qty}
                onChange={(event) => handleQty(event)}
              />
              <button
                type="submit"
                className="normal"
                onClick={handleMegicClick}>
                Magic
              </button>
              <button
                type="submit"
                className="normal"
                onClick={handleAddToCart}>
                Add to cart
              </button>
              <h4>Product details</h4>
              <span>{data.prod_desc}</span>
              <br />
              <br />
              <br />
              <span style={{ fontSize: "12px" }}>
                No Return, No Refund Policy *
              </span>
            </div>
          </section>

          {!isEmpty(relatedProduct) && (
            <div id="prodetails-suggestion">
              <center>
                <h2>YOU MAY ALSO LIKE</h2>
              </center>
              <RelatedProduct items={relatedProduct} />
            </div>
          )}
        </>
      ) : (
        <>
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
        </>
      )}

      <Footer />

      <Toaster
        position="top-center"
        containerStyle={{
          top: 65,
        }}
        reverseOrder={true}
      />
    </>
  );
}

export default SingleProduct;
