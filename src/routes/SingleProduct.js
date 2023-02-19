import React, { useState, useEffect } from "react";
import "../Style/singleproduct.css";
import { useParams } from "react-router-dom";
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
import RelatedProduct from "../components/RelatedProduct";

function SingleProduct() {
  // const [val,setVal] = useState(1);
  const [url, setUrl] = useState("cloths/1.jpg");
  let { product_id } = useParams();

  const [data, setData] = useState("");
  const [prod_qty, setProd_qty] = useState(1);
  const [prod_size, setProd_size] = useState();
  const [isUser, setisUser] = useState("");
  const [selectSize, setSelectSize] = useState(false);
  const [navrender, setNavRender] = useState(true);
  const [relatedProduct, setrelatedProduct] = useState("");

  useEffect(() => {
    try {
      axios
        .get(`http://127.0.0.1:8000/customer-product/${product_id}`)
        .then((response) => {
          console.log(response);
          if (response.data.message === "Success!") {
            setData(response.data.data);
            setUrl(response.data.data.prod_image[0]);
            console.log(response.data.data.cat_id)

            try {
              axios
                .get(
                  `http://127.0.0.1:8000/suggested-product/${response.data.data.cat_id}`
                )
                .then((response) => {
                  console.log(response)
                  setrelatedProduct(response.data.data);
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
      const token = sessionStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        axios
          .post(
            "http://127.0.0.1:8000/cart/",
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
              toast.success("Added to cart!", {
                style: {
                  border: "1px solid #000",
                  padding: "8px",
                  color: "#000",
                },
                position: "top-center  ",
                duration: 1500,
                iconTheme: {
                  primary: "#000",
                  secondary: "#FFFAEE",
                },
              });
              setNavRender(!navrender);
            } else if (response.data.message === "Token corrupted.") {
              toast.error("Please login first to use cart!", {
                style: {
                  border: "1px solid DA2424",
                  padding: "9px",
                  color: "black",
                },
                iconTheme: {
                  primary: "#DA2424",
                  secondary: "#FFFAEE",
                },
              });
            } else if (response.data.message === "User not customer.") {
              setisUser("Login first to use cart.");
            } else {
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

  return (
    <>
      <Navbar navrender={navrender} />
      {/* <Start cName="hero-singleproduct"/> */}
      {!isEmpty(data) && !isEmpty(relatedProduct) ? (
        <>
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
                {!isEmpty(data.prod_qty) &&
                  Object.keys(data.prod_qty).length === 0 &&
                  data.prod_qty.constructor === Object && (
                    <p className="out-stock">
                      This item is currently out of stock
                    </p>
                  )}
                {selectSize && (
                  <p className="out-stock">Please select a size</p>
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

          <div className="" id="prodetails-suggestion">
            <center>
              <h2>SIMILAR PRODUCTS</h2>
            </center>
            <RelatedProduct items={relatedProduct} />
          </div>
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
