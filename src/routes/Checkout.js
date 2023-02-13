import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import "../Style/checkout.css";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Error from "./Error";
import { isEmpty } from "lodash";
import { Button, Drawer, Radio, Space, ConfigProvider } from "antd";
import { Select } from "antd";
import qs from "qs";
import { Toaster, toast } from "react-hot-toast";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";

function Checkout() {

   const Razorpay = useRazorpay();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState(false);
  const [products, setProducts] = useState(undefined);
  const token = sessionStorage.getItem("token");

  const [userData, setUserData] = useState();
  const [addData, setAddData] = useState();

  const [open, setOpen] = useState(false);
  const [dwidth, setDwidth] = useState("30%");
  const [defaultAddress, setDefaultAddress] = useState();

  const [houseno, setHouseNo] = useState("");
  const [area, setArea] = useState("");
  const [addtype, setAddtype] = useState("Home");

  const [houseno1, setHouseNo1] = useState("");
  const [area1, setArea1] = useState("");
  const [addtype1, setAddtype1] = useState("Home");
  const [pincode1, setPincode1] = useState("");
  const [state1, setState1] = useState("");
  const [city1, setCity1] = useState("");

  const [updateDrop, setUpdateDrop] = useState(false);
  const [discountData, setDiscountData] = useState("");

  const [coupenCode, setCoupenCode] = useState("");

  const showDrawer = (e) => {
    e.preventDefault();
    setDwidth("30%");
    setOpen(true);
  };

  const showDrawer1 = (e) => {
    e.preventDefault();
    setDwidth("100%");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      if (pincode.length === 6) {
        if (
          result.data[0].Message !== "No records found" &&
          result.data[0].Message !== "The requested resource is not found"
        ) {
          setCity(result.data[0].PostOffice[0].District);
          setState(result.data[0].PostOffice[0].State);
          setPincodeError(false);
        }
      } else {
        setPincodeError(true);
        setState("");
        setCity("");
      }

      if (pincode.length === 0) {
        setPincodeError(false);
      }
    };

    fetchData();
  }, [pincode]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get("http://127.0.0.1:8000/checkout-user-info/", { headers })
        .then((response) => {
          console.log(response.data.data["Ship-add"]);
          setUserData(response.data.data);
          if (response.data.data["Ship-add"].length === 0) {
            setDefaultAddress("");
            setHouseNo1("");
            setArea1("");
            setAddtype1("");
            setPincode1("");
            setState1("");
            setCity1("");
          } else {
            setDefaultAddress(response.data.data["Ship-add"][0]._id);
            setAddData(response.data.data["Ship-add"][0]);
            setHouseNo1(response.data.data["Ship-add"][0].house_no);
            setArea1(response.data.data["Ship-add"][0].area_street);
            setAddtype1(response.data.data["Ship-add"][0].add_type);
            setPincode1(response.data.data["Ship-add"][0].pincode);
            setState1(response.data.data["Ship-add"][0].state);
            setCity1(response.data.data["Ship-add"][0].city);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, [updateDrop]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get("http://127.0.0.1:8000/cart/", { headers })
        .then((response) => {
          if (response.data.message === "Success!") {
            setProducts(response.data.data);
            console.log(response.data);
          } else if (
            response.data.message === "Token corrupted." ||
            response.data.message === "Cart is empty." ||
            response.data.message === "Cart is empty."
          ) {
            setProducts(undefined);
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, []);

  let total = 0;

  const handleNewAddress = (e) => {
    e.preventDefault();

    // console.log(houseno,area,addtype,pincode,state,city)
    if (
      houseno !== "" &&
      area !== "" &&
      addtype !== "" &&
      pincode !== "" &&
      state !== "" &&
      city !== ""
    ) {
      const token = sessionStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      try {
        axios
          .post(
            "http://127.0.0.1:8000/customer-address/",
            qs.stringify({
              house_no: houseno,
              area_street: area,
              add_type: addtype,
              pincode: pincode,
              state: state,
              city: city,
            }),
            { headers }
          )
          .then((response) => {
            console.log(response.data.message);

            if (response.data.message === "Success!") {
              setHouseNo("");
              setArea("");
              setAddtype("");
              setPincode("");
              setState("");
              setCity("");
              setUpdateDrop(true);

              toast.success("Address added!", {
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

              setOpen(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log("Error");
      }
    }
  };

  const handleDiscount = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      axios
        .post(
          "http://127.0.0.1:8000/check-discount-code/",
          qs.stringify({
            coupon_code: coupenCode,
            total_amount: total,
          }),
          {
            headers,
          }
        )
        .then((response) => {
          // console.log(response.data.data);
          setDiscountData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("Error");
    }
  };


  const handlePayment = useCallback((e) => {
    e.preventDefault();

    var options = {
      key: "rzp_test_Cl1G7wgRpRqdBD",
      currency: "INR",
      name: "Gurukrupa Fashion",
      description: "Test Transaction",
      image: "",
      order_id: "order_LG3VFEZ9jTlJ9F",
      amount: "1000000",
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9313635069",
      },
      theme: {
        color: "#000",
      },
    };
    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);


  return (
    <>
      <Navbar />

      {!isEmpty(token) && !isEmpty(userData) ? (
        <>
          <div style={{ margin: "65px" }}></div>
          <div className="row-checkout">
            <div className="col-75">
              <form>
                <div className="checkout-form">
                  <div className="add-suplier-sub1">
                    <h2>Checkout</h2>
                    <div className="box">
                      <p>Enter Name:</p>
                      <TextField
                        label="name"
                        size="small"
                        value={userData.name}
                        disabled={true}
                        fullWidth={true}
                        inputProps={{ readOnly: true }}
                      />
                      {/* {flag1 && <p className="error-color">{nameError}</p>} */}
                    </div>

                    <div className="box">
                      <p>Enter Mobile No:</p>
                      <TextField
                        label="mobile no"
                        type="number"
                        size="small"
                        // value={mobile}
                        // onChange={(e) => setMobile(e.target.value)}
                        fullWidth={true}
                        // inputProps={{ readOnly: true }}
                      />
                      {/* {flag2 && <p className="error-color">{mobileError}</p>} */}
                    </div>

                    <div className="box">
                      <p>Enter Email:</p>
                      <TextField
                        label="email"
                        size="small"
                        value={userData.email}
                        disabled={true}
                        fullWidth={true}
                        inputProps={{ readOnly: true }}
                      />
                      {/* {flag3 && <p className="error-color">{emailError}</p>} */}
                    </div>

                    <div className="box">
                      <div className="box-sub-btn">
                        <p>Select address</p>
                        <div>
                          <ConfigProvider
                            theme={{
                              components: {
                                Button: {
                                  colorPrimary: "#000",
                                  colorPrimaryHover: "#fff",
                                  width: "200px",
                                },
                              },
                            }}>
                            <button className="button-131" onClick={showDrawer}>
                              + Add new address
                            </button>
                            <button
                              className="button-111"
                              onClick={showDrawer1}>
                              + Add new address
                            </button>
                          </ConfigProvider>
                        </div>
                      </div>

                      <div className="box">
                        <Select
                          showSearch
                          style={{ width: 200 }}
                          defaultValue={defaultAddress}
                          onChange={(value) =>
                            userData["Ship-add"].map((val, index) => {
                              if (val._id === value) {
                                setAddData(val);

                                setHouseNo1(val.house_no);
                                setArea1(val.area_street);
                                setAddtype1(val.add_type);
                                setPincode1(val.pincode);
                                setState1(val.state);
                                setCity1(val.city);
                              }
                            })
                          }
                          placeholder="Select address"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={userData["Ship-add"].map((val, index) => ({
                            label: "[" + index.toString() + "]" + " Address",
                            value: val._id,
                          }))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="add-suplier-sub1">
                    <h4>Address:</h4>
                    <div className="box">
                      <p>House no:</p>
                      <TextField
                        label="house no"
                        size="small"
                        disabled={true}
                        value={houseno1}
                        fullWidth={true}
                        inputProps={{ readOnly: true }}
                      />
                    </div>

                    <div className="box">
                      <p>Area Street:</p>
                      <TextField
                        label="area street"
                        size="small"
                        disabled={true}
                        value={area1}
                        fullWidth={true}
                        inputProps={{ readOnly: true }}
                      />
                    </div>

                    <div className="box">
                      <p>Address type</p>
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
                          defaultValue={addtype1}
                          buttonStyle="solid"
                          // value={addtype1}
                          disabled={true}>
                          <Radio.Button value="home">Home</Radio.Button>
                          <Radio.Button value="office">Office</Radio.Button>
                        </Radio.Group>
                      </ConfigProvider>
                    </div>

                    <div className="box">
                      <p>Pincode:</p>
                      <TextField
                        label="pincode"
                        type="number"
                        disabled={true}
                        value={pincode1}
                        size="small"
                        fullWidth={true}
                        inputProps={{ readOnly: true }}
                        // onChange={(e) => setPincode(e.target.value)}
                      />
                      {pincodeError && (
                        <p className="error-color">Enter valid pincode.</p>
                      )}
                    </div>

                    <div className="box">
                      <p>State:</p>
                      <TextField
                        label="state"
                        size="small"
                        disabled={true}
                        value={state1}
                        fullWidth={true}
                        inputProps={{ readOnly: true }}
                      />
                    </div>

                    <div className="box">
                      <p>City:</p>
                      <TextField
                        label="city"
                        size="small"
                        value={city1}
                        disabled={true}
                        fullWidth={true}
                        inputProps={{ readOnly: true }}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-75">
              <div className="add-suplier-sub1 cart-products-details">
                <table>
                  <thead>
                    <tr>
                      <th>Items</th>
                      <th>Size</th>
                      <th>price</th>
                      <th>Qty</th>
                      <th>Sub-total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isEmpty(products) &&
                      products.map((val, key) => {
                        total = total + val.prod_price * val.qty;
                        return (
                          <tr key={key}>
                            <td>{val.prod_name}</td>
                            <td>{val.size}</td>
                            <td>{val.prod_price} *</td>
                            <td>{val.qty}</td>
                            <td>{val.qty * val.prod_price}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Total</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>{total}</th>
                    </tr>
                    {!isEmpty(discountData) && (
                      <>
                        <tr>
                          <th>- Discount</th>
                          <th></th>
                          <th></th>
                          <th>{discountData.disc_percent}%</th>
                          <th>{discountData.applied_disc}</th>
                        </tr>

                        <tr>
                          <th>Total</th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th>{total - parseInt(discountData.applied_disc)}</th>
                        </tr>
                      </>
                    )}
                  </tfoot>
                </table>

                <div className="promotion">
                  <label htmlFor="promo-code">Have A Promo Code?</label>
                  <input
                    type="text"
                    onChange={(e) => setCoupenCode(e.target.value)}
                  />
                  <button type="button" onClick={handleDiscount} />
                </div>
                <form>
                  <div className="continue-btn">
                    <button className="checkout-btn" onClick={handlePayment}>Continue</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div style={{ margin: "100px" }}></div>
        </>
      ) : (
        <>
          <Error />
        </>
      )}

      <Footer />

      <Drawer
        title="Add new address"
        // placement={placement}
        className="drawer"
        width={dwidth}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: "#000",
                    colorPrimaryHover: "#fff",
                    width: "200px",
                  },
                },
              }}>
              <button className="button-1311" onClick={onClose}>
                Cancel
              </button>

              <button className="button-1311" onClick={handleNewAddress}>
                Add
              </button>
            </ConfigProvider>
          </Space>
        }>
        <div className="add-suplier-sub11">
          <div className="box">
            <p>House no:</p>
            <TextField
              label="house no"
              size="small"
              value={houseno}
              fullWidth={true}
              onChange={(e) => setHouseNo(e.target.value)}
            />
          </div>

          <div className="box">
            <p>Area Street:</p>
            <TextField
              label="area street"
              size="small"
              value={area}
              fullWidth={true}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>

          <div className="box">
            <p>Select address type</p>
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
                defaultValue="Home"
                buttonStyle="solid"
                value={addtype}
                onChange={(value) => {
                  setAddtype(value.target.value);
                }}>
                <Radio.Button value="Home">Home</Radio.Button>
                <Radio.Button value="Office">Office</Radio.Button>
              </Radio.Group>
            </ConfigProvider>
          </div>

          <div className="box">
            <p>Pincode:</p>
            <TextField
              label="pincode"
              type="number"
              value={pincode}
              size="small"
              fullWidth={true}
              onChange={(e) => setPincode(e.target.value)}
            />
            {pincodeError && (
              <p className="error-color">Enter valid pincode.</p>
            )}
          </div>

          <div className="box">
            <p>State:</p>
            <TextField
              label="state"
              size="small"
              value={state}
              disabled={true}
              fullWidth={true}
              inputProps={{ readOnly: true }}
            />
          </div>

          <div className="box">
            <p>City:</p>
            <TextField
              label="city"
              size="small"
              value={city}
              disabled={true}
              fullWidth={true}
              inputProps={{ readOnly: true }}
            />
          </div>
        </div>
      </Drawer>

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

export default Checkout;
