import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import "../Style/profile.css";
import Footer from "./Footer";
import axios from "axios";
import { isEmpty } from "lodash";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Drawer, Radio, Space, ConfigProvider } from "antd";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import qs from "qs";
import { Toaster, toast } from "react-hot-toast";

function Profile() {
  const [userData, setUserData] = useState();
  const [addressData, setAddressData] = useState();
  const [orderData, setOrderData] = useState();
  const [expanded, setExpanded] = useState(false);

  const [houseno, setHouseNo] = useState("");
  const [area, setArea] = useState("");
  const [addtype, setAddtype] = useState("Home");

  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState(false);

  const [open, setOpen] = useState(false);
  const [dwidth, setDwidth] = useState("30%");

  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [oldpassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const [passError, setPassError] = useState("");
  const [passFlag, setPassFlag] = useState(false);

  const [passConError, setPassConError] = useState("");
  const [passConFlag, setPassConFlag] = useState(false);

  const [updateDrop, setUpdateDrop] = useState(false);

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

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
    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    // userDetails
    try {
      axios
        .get("http://127.0.0.1:8000/user-profile/", { headers })
        .then((response) => {
          // console.log(response)
          if (response.data.message === "Success!") {
            setUserData(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}

    // address Details
    try {
      axios
        .get("http://127.0.0.1:8000/customer-address/", { headers })
        .then((response) => {
          // console.log(response);
          if (response.data.message === "Success!") {
            setAddressData(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}

    // Order details
    try {
      axios
        .get("http://127.0.0.1:8000/customer-order/", { headers })
        .then((response) => {
          console.log(response.data.data);
          if (response.data.message === "Success!") {
            setOrderData(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, [updateDrop]);

  const handleChangePassword = (e) => {
    e.preventDefault();

    console.log(oldpassword, password, conPassword);

    /****** Password *******/

    if (password === "") {
      setPassFlag(false);
      setPassError("Password Should not blank.");
    }

    if (
      password !== "" &&
      password.trim().length > 10 &&
      password.trim().length < 7
    ) {
      setPassFlag(false);
      setPassError("password length must be 8 to 10");
    }

    /****** Password *******/

    if (conPassword === "") {
      setPassConFlag(false);
      setPassConError("Password Should not blank.");
    }

    if (
      conPassword !== "" &&
      conPassword.trim().length > 10 &&
      conPassword.trim().length < 7
    ) {
      setPassConFlag(false);
      setPassConError("password length must be 8 to 10");
    }

    if (password !== conPassword) {
      setPassConFlag(false);
      setPassConError("password and confirm password must be same.");
    }

    if (
      password !== "" &&
      password.length < 10 &&
      password.length > 7 &&
      conPassword !== "" &&
      conPassword.length < 10 &&
      conPassword.length > 7 &&
      password === conPassword
    ) {
      setPassConFlag(true);
      setPassFlag(true);

      const token = sessionStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        axios
          .post(
            "http://127.0.0.1:8000/change-password/",
            qs.stringify({
              currentPassword: oldpassword,
              newPassword: conPassword,
            }),
            {
              headers,
            }
          )
          .then((response) => {
            console.log(response.data.message);
            if (response.data.message === "Success!") {
              toast.success("password changed successfully!", {
                duration: 3000,
              });
              setOldPassword("");
              setPassword("");
              setConPassword("");
            } else {
              toast.error("Wrong old password", {
                duration: 3000,
              });
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
      setUpdateDrop(!updateDrop);

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

  const handleDelete = (addid)=>{
    // e.preventDefault();

    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      axios
        .delete(
          `http://127.0.0.1:8000/customer-address/${addid}`,
          { headers }
        )
        .then((response) => {
          console.log(response)
          setUpdateDrop(!updateDrop);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("Error");
    }

  }

  return (
    <>
      <Navbar />
      <div className="exp"></div>
      {!isEmpty(userData) && (
        <>
          <div className="profile-container">
            <div className="profile-user-details">
              <center>
                <h3>User Details:</h3>
              </center>
              <div className="profile-user-details-sub">
                <p>Name: {userData.name}</p>
                <br />
                <p>Email: {userData.email}</p>
                <br />
                <p>Mobile no: {userData.mobile_no}</p>
                <br />
              </div>
            </div>

            <div className="profile-user-address">
              <center>
                <h3>Address details:</h3>
              </center>
              <button className="button-4" onClick={showDrawer}>
                + Add new address
              </button>
              <button className="button-44" onClick={showDrawer1}>
                + Add new address
              </button>
              {!isEmpty(addressData) &&
                addressData.map((value, index) => {
                  return (
                    <div key={index} className="profile-user-details-sub">
                      <Accordion
                        expanded={expanded === index}
                        onChange={handleChange(index)}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header">
                          <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            <h4> Address {index + 1}</h4>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <div className="address-div">
                              <p>House no: {value.house_no}</p>
                              <br />
                              <p>Area street: {value.area_street}</p>
                              <br />
                              <p>Add type: {value.add_type}</p>
                              <br />
                              <p>Pincode: {value.pincode}</p>
                              <br />
                              <p>State: {value.state}</p>
                              <br />
                              <p>City: {value.city}</p>
                              <br />
                              <button className="button-444">Edit</button>
                              <button className="button-444" onClick={()=>handleDelete(value._id)}>Delete</button>
                            </div>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  );
                })}
            </div>

            {!isEmpty(orderData) && (
              <div className="profile-user-order">
                <center>
                  <h4>Order details:</h4>
                </center>
                {orderData.map((value, index) => {
                  return (
                    <>
                      <div key={index} className="order-data">
                        <p>Order - {index + 1}</p>
                        <div className="order-address-data">
                          <div>
                            <p>
                              <b>House no: </b>
                              {value.house_no}
                            </p>
                            <p>
                              <b>Area-street: </b>
                              {value.area_street}
                            </p>
                            <p>
                              <b>Add type: </b>
                              {value.add_type}
                            </p>
                          </div>
                          <div className="order-location">
                            <p>
                              <b>Pincode: </b>
                              {value.pincode}
                            </p>
                            <p>
                              <b>State: </b>
                              {value.state}
                            </p>
                            <p>
                              <b>City: </b>
                              {value.city}
                            </p>
                          </div>
                        </div>

                        {value.Order_details.map((prod, index1) => {
                          return (
                            <>
                              <div key={index1} className="product-data">
                                <div className="order-product-image">
                                  <Link to={`single-product/${prod.prod_id}`}>
                                    <img src={prod.prod_image} height="100px" alt="" />
                                  </Link>
                                </div>
                                <div className="order-product-data">
                                  <Link to={`single-product/${prod.prod_id}`}>
                                    {prod.prod_name}
                                  </Link>
                                  <p>Price: {prod.prod_price}</p>
                                  <p>Size: {prod.size}</p>
                                  <p>Qty: {prod.qty}</p>
                                </div>
                              </div>
                            </>
                          );
                        })}

                        {value.order_status === "Failed" && (
                          <div className="order-status">
                            <b>Order status: </b>
                            <p className="failed">Failed</p>
                          </div>
                        )}
                        {value.order_status === "Pending" && (
                          <div className="order-status">
                            <b>Order status:</b>
                            <p className="pending">Pending</p>
                          </div>
                        )}

                        <p>
                          <b>Total amount: </b>
                          {value.total_amount}
                        </p>
                      </div>
                    </>
                  );
                })}
                <div className="space-order-product"></div>
              </div>
            )}

            <div className="profile-user-changePassword">
              <center>
                <h4>Change password:</h4>
              </center>
              <div className="change-password">
                <form>
                  <div className="input-line">
                    <h6>Old password:</h6>
                    <input
                      type="password"
                      placeholder="Old password"
                      value={oldpassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <br />

                  <div className="input-line">
                    <h6>New password:</h6>
                    <div>
                      <input
                        type="password"
                        placeholder="New password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {!passFlag && <p className="error-color">{passError}</p>}
                    </div>
                  </div>

                  <br />
                  <div className="input-line">
                    <h6>Confirm password:</h6>
                    <div>
                      <input
                        type="password"
                        placeholder="Confirm password"
                        value={conPassword}
                        onChange={(e) => setConPassword(e.target.value)}
                      />{" "}
                      {!passConFlag && (
                        <p className="error-color">{passConError}</p>
                      )}
                    </div>
                  </div>
                  <div className="input-line">
                    <button
                      className="button-31"
                      onClick={handleChangePassword}>
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="exp"></div>
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

export default Profile;
