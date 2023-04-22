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
import { message, Popconfirm } from "antd";
import { Modal } from "antd";
import { Input } from "antd";
import { Rate } from "antd";
import { createTheme, ThemeProvider } from "@mui/material/styles";


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
  const [oldPassError, setOldPassError] = useState("");
  const [oldPassFlag, setOldPassFlag] = useState(false);

  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const [passError, setPassError] = useState("");
  const [passFlag, setPassFlag] = useState(false);

  const [passConError, setPassConError] = useState("");
  const [passConFlag, setPassConFlag] = useState(false);

  const [updateDrop, setUpdateDrop] = useState(false);
  const [updateButton, setUpdateButton] = useState(false);

  const [addressId, setAddressId] = useState();
  const [updateAddress, setUpdateAddress] = useState(false);

  const [rateData, setrateData] = useState([]);
  const [test, setTest] = useState();

  const [modalsVisible, setModalsVisible] = useState();

  let newfield = { prod_id: "", rating: 0 };

  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat",
    },

    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#09142d",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Raleway'), local('Raleway-Regular'), url('public\fonts\futura\futura light bt.ttf') format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
      },
    },
  });
  

  const showModal = (index, oid) => {
    // setIsModalOpen(true);
    console.log(index, oid);
    const newModalsVisible = [...modalsVisible];
    newModalsVisible[index] = true;
    setModalsVisible(newModalsVisible);

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/customer-rating/${oid}/`, { headers })
        .then((response) => {
          console.log(response);
          if (
            response.data.message === "Rating not found." ||
            response.data.message === "Success!"
          ) {
            setrateData(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  };

  const handleCancel = () => {
    setModalsVisible(test);
  };

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  const confirm = (addid) => {
    // console.log(e);
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      axios
        .delete(`${process.env.REACT_APP_API_HOST}/customer-address/${addid}`, { headers })
        .then((response) => {
          // console.log(response);
          if (response.data.message === "Success!") {
            setUpdateDrop(!updateDrop);
            message.success("deleted successfully!");
          } else {
            toast.error("something wrong!", {
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
  };
  const cancel = (e) => {
    // console.log(e);
    // message.error("Click on No");
  };

  const showDrawer = (e) => {
    e.preventDefault();
    setDwidth("30%");
    setOpen(true);
    setUpdateButton(false);
  };
  const showDrawer1 = (e) => {
    e.preventDefault();
    setDwidth("100%");
    setOpen(true);
    setUpdateButton(false);
  };

  const onClose = () => {
    setOpen(false);
    setHouseNo("");
    setArea("");
    // setAddtype("");
    setPincode("");
    setState("");
    setCity("");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    // userDetails
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/user-profile/`, { headers })
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
        .get(`${process.env.REACT_APP_API_HOST}/customer-address/`, { headers })
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
        .get(`${process.env.REACT_APP_API_HOST}/customer-order/`, { headers })
        .then((response) => {
          console.log(response.data.data);
          if (response.data.message === "Success!") {
            setOrderData(response.data.data);
            setTest(Array(response.data.data.length).fill(false));
            setModalsVisible(Array(response.data.data.length).fill(false));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, [updateDrop, updateAddress]);

  const handleChangePassword = (e) => {
    e.preventDefault();

    console.log(oldpassword, password, conPassword);

    /****** Old password *******/

    if (oldpassword === "") {
      setOldPassFlag(true);
      setOldPassError("Old password Should not blank!");
    }

    if (oldpassword !== "") {
      setOldPassError("");
      setOldPassFlag(false);
    }

    if (oldpassword !== password) {
      setPassFlag(false);
      setPassError("");
    }

    /****** Password *******/

    if (password === "") {
      setPassFlag(true);
      setPassError("Password Should not blank.");
    }

    // if (
    //   password !== "" &&
    //   password.trim().length > 10 &&
    //   password.trim().length < 7
    // ) {
    //   setPassFlag(false);
    //   setPassError("password length must be 8 to 10");
    // }

    if (password !== "") {
      setPassFlag(false);
      setPassError("");
    }
    if (oldpassword === password) {
      setPassFlag(true);
      setPassError("Old password and new password must be different!");
    }

    /****** Password *******/

    if (conPassword === "") {
      setPassConFlag(true);
      setPassConError("Password Should not blank.");
    }

    // if (
    //   conPassword !== "" &&
    //   conPassword.trim().length > 10 &&
    //   conPassword.trim().length < 7
    // ) {
    //   setPassConFlag(false);
    //   setPassConError("password length must be 8 to 10");
    // }

    if (conPassword !== "") {
      setPassConFlag(false);
      setPassConError("");
    }

    if (password !== conPassword) {
      setPassConFlag(true);
      setPassConError("password and confirm password must be same.");
    }

    if (
      password !== "" &&
      password.length < 10 &&
      password.length > 7 &&
      conPassword !== "" &&
      conPassword.length < 10 &&
      conPassword.length > 7 &&
      password === conPassword &&
      oldpassword !== password
    ) {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        axios
          .post(
            `${process.env.REACT_APP_API_HOST}/change-password/`,
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
              setOldPassFlag(false);
              setPassFlag(false);
              setPassConFlag(false);
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

      if (!isEmpty(pincode)) {
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
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      setUpdateDrop(!updateDrop);

      try {
        axios
          .post(
            `${process.env.REACT_APP_API_HOST}/customer-address/`,
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

              toast.success("Address added!");

              setOpen(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log("Error");
      }
    }else{
      toast.error("Fill all details!", {
        duration: 3000,
      });
    }
  };

  const handleDelete = (addid) => {
    // e.preventDefault();
  };

  const handleEditAddress = (
    addid,
    house_no2,
    area_street2,
    add_type2,
    pincode2,
    state2,
    city2
  ) => {
    setDwidth("30%");
    setOpen(true);
    setUpdateButton(true);
    setAddressId(addid);
    setHouseNo(house_no2);
    setArea(area_street2);
    setAddtype(add_type2);
    setPincode(pincode2);
    setState(state2);
    setCity(city2);
  };

  const handleEditAddress1 = (
    addid,
    house_no1,
    area_street1,
    add_type1,
    pincode1,
    state1,
    city1
  ) => {
    setDwidth("100%");
    setOpen(true);
    setAddressId(addid);
    setUpdateButton(true);
    setHouseNo(house_no1);
    setArea(area_street1);
    setAddtype(add_type1);
    setPincode(pincode1);
    setState(state1);
    setCity(city1);
  };

  const handleAddressUpdate = () => {
    console.log(houseno, area, addtype, pincode, state, city);

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    if (
      houseno !== "" &&
      area !== "" &&
      addtype !== "" &&
      pincode !== "" &&
      state !== "" &&
      city !== ""
    ) {

    try {
      axios
        .patch(
          `${process.env.REACT_APP_API_HOST}/customer-address/${addressId}/`,
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
          console.log(response);

          if (response.data.message === "Success!") {
            setOpen(false);
            setHouseNo("");
            setArea("");
            // setAddtype("");
            setPincode("");
            setState("");
            setCity("");

            toast.success("Address updated!");
            setUpdateAddress(!updateAddress);
          } else {
            toast.error("Something wrong!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("Error");
    }
  }else{
    toast.error("Fill all details!", {
      duration: 3000,
    });
  }
  };

  const updateRate = (value, rate) => {
    const newState = rateData.map((obj) => {
      // 👇️ if id equals 2, update country property
      if (obj.prod_id === rate.prod_id) {
        return { ...obj, rating: value, date: new Date() };
      }

      // 👇️ otherwise return the object as is
      return obj;
    });
    setrateData(newState);
  };

  const handleOk = (index, oid) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    };
    console.log(oid);
    try {
      axios
        .post(`${process.env.REACT_APP_API_HOST}/customer-rating/${oid}/`, rateData, {
          headers,
        })
        .then((response) => {
          if (response.data.message === "Success!") {
            // setModalsVisible(false);
            const newModalsVisible = [...modalsVisible];
            newModalsVisible[index] = false;
            setModalsVisible(newModalsVisible);
            toast.success("Rating added!", {
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
  };

  return (
    <>
      <Navbar />

      <div className="exp"></div>

      {!isEmpty(userData) && (
        <>
          <ThemeProvider theme={theme}>
            <div className="profile-container">
              <div className="profile-user-details">
                <center>
                  <h3>User Details:</h3>
                </center>
                <div className="profile-user-details-sub">
                  <div className="sub-address-data">
                    <p>Name</p>
                    <h5>: {userData.name}</h5>
                  </div>

                  <div className="sub-address-data">
                    <p>Email</p>
                    <h5>: {userData.email}</h5>
                  </div>

                  <div className="sub-address-data">
                    <p>Mobile no</p>
                    <h5>: {userData.mobile_no}</h5>
                  </div>
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
                                <div className="sub-address-data">
                                  <p>House no</p>
                                  <h5>: {value.house_no}</h5>
                                </div>

                                <div className="sub-address-data">
                                  <p>Area street</p>
                                  <h5>: {value.area_street}</h5>
                                </div>

                                <div className="sub-address-data">
                                  <p>Add type</p>
                                  <h5>: {value.add_type}</h5>
                                </div>

                                <div className="sub-address-data">
                                  <p>Pincode</p>
                                  <h5>: {value.pincode}</h5>
                                </div>

                                <div className="sub-address-data">
                                  <p>State</p>
                                  <h5>: {value.state}</h5>
                                </div>

                                <div className="sub-address-data">
                                  <p>City</p>
                                  <h5>: {value.city}</h5>
                                </div>

                                <button
                                  className="button-444"
                                  onClick={() =>
                                    handleEditAddress(
                                      value._id,
                                      value.house_no,
                                      value.area_street,
                                      value.add_type,
                                      value.pincode,
                                      value.state,
                                      value.city
                                    )
                                  }>
                                  Edit
                                </button>

                                <button
                                  className="button-4444"
                                  onClick={() =>
                                    handleEditAddress1(
                                      value._id,
                                      value.house_no,
                                      value.area_street,
                                      value.add_type,
                                      value.pincode,
                                      value.state,
                                      value.city
                                    )
                                  }>
                                  Edit
                                </button>

                                <ConfigProvider
                                  theme={{
                                    components: {
                                      Button: {
                                        colorPrimary: "#000",
                                        colorPrimaryHover: "#000",
                                        colorPrimaryClick: "#000",
                                      },
                                    },
                                  }}>
                                  <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this address?"
                                    onConfirm={() => confirm(value._id)}
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No">
                                    {/* <a href="#">Delete</a> */}
                                    <button
                                      className="button-4445"
                                      // onClick={() => handleDelete(value._id)}
                                    >
                                      Delete
                                    </button>
                                  </Popconfirm>
                                </ConfigProvider>
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
                        <div key={value._id} className="order-data">
                          <p>Order - {index + 1}</p>
                          <div className="order-address-data">
                            <div>
                              <div className="sub-address-data">
                                <p>House no</p>
                                <h5>: {value.house_no}</h5>
                              </div>

                              <div className="sub-address-data">
                                <p>Area-street:</p>
                                <h5>: {value.area_street}</h5>
                              </div>

                              <div className="sub-address-data">
                                <p>Add type</p>
                                <h5>: {value.add_type}</h5>
                              </div>

                              <div className="sub-address-data">
                                <p>Pincode</p>
                                <h5>: {value.pincode}</h5>
                              </div>
                              <div className="sub-address-data">
                                <p>State</p>
                                <h5>: {value.state}</h5>
                              </div>

                              <div className="sub-address-data">
                                <p>City</p>
                                <h5>: {value.city}</h5>
                              </div>
                            </div>

                            <div className="order-location">
                              <div className="sub-address-data">
                                <p>Order date</p>
                                <h5>: {value.order_date.substring(0, 10)}</h5>
                              </div>

                              <div className="sub-address-data">
                                <p>Total amount</p>
                                <h5>: {value.total_amount}</h5>
                              </div>

                              {value.order_status === "Failed" && (
                                <div className="sub-address-data">
                                  <p>Order status</p>
                                  <h5 className="failed">: Failed</h5>
                                </div>
                              )}
                              {value.order_status === "Pending" && (
                                <div className="sub-address-data">
                                  <p>Order status</p>
                                  <h5 className="pending">: Pending</h5>
                                </div>
                              )}
                              {value.order_status === "Delivered" && (
                                <div className="sub-address-data">
                                  <p>Order status</p>
                                  <h5 className="pending">: Delivered</h5>
                                </div>
                              )}
                            </div>
                          </div>

                          {value.Order_details.map((prod, index1) => {
                            return (
                              <>
                                <div key={index1} className="product-data">
                                  <div className="order-product-image">
                                    <Link to={`single-product/${prod.prod_id}`}>
                                      <img
                                        src={prod.prod_image}
                                        height="100px"
                                        alt=""
                                      />
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

                          {value.order_status !== "Failed" && (
                            <Link to={`/invoice/${value._id}`}>
                              <button className="button-4445">
                                Get invoice
                              </button>
                            </Link>
                          )}
                          {value.order_status === "Delivered" && (
                            <>
                              {" "}
                              <button
                                className="button-4445"
                                onClick={() => showModal(index, value._id)}>
                                Give rating
                              </button>
                              <ConfigProvider
                                theme={{
                                  components: {
                                    Button: {
                                      colorPrimary: "#000",
                                      colorPrimaryHover: "#000",
                                      colorPrimaryClick: "#000",
                                      colorPrimaryActive: "#000",
                                    },
                                  },
                                }}>
                                {!isEmpty(rateData) && (
                                  <>
                                    <Modal
                                      // mask={false}
                                      maskStyle={{
                                        backgroundColor: "#ffffff34",
                                        opacity: 0.45,
                                      }}
                                      title="Give rating"
                                      open={modalsVisible[index]}
                                      onOk={() => handleOk(index, value._id)}
                                      onCancel={handleCancel}>
                                      {/* {console.log(rateValue)} */}
                                      {rateData.map((rate) => {
                                        return (
                                          <div className="rate-div">
                                            <div className="rate-div-sub1">
                                              <img
                                                src={rate.prod_image}
                                                height="100px"
                                                width="80px"
                                              />
                                              <p>{rate.prod_name}</p>
                                            </div>
                                            {/* {console.log(rate)} */}

                                            {isEmpty(rate.date) && (
                                              <div className="rate-div-sub2">
                                                <Rate
                                                  value={rate.rating}
                                                  onChange={(value) => {
                                                    updateRate(value, rate);
                                                  }}
                                                  defaultValue={rate.rating}
                                                />
                                              </div>
                                            )}

                                            {!isEmpty(rate.date) && (
                                              <div className="rate-div-sub2">
                                                <Rate
                                                  disabled
                                                  value={rate.rating}
                                                  defaultValue={rate.rating}
                                                />
                                                <p>
                                                  {rate.date.substring(0, 10)}
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </Modal>
                                  </>
                                )}
                              </ConfigProvider>
                            </>
                          )}
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
                      <div>
                        <Input.Password
                          type="password"
                          id="font-style"
                          style={{
                            height: "45px",
                            width: "200px",
                            marginLeft: "50px",
                            borderBottomWidth: "2px",
                            borderColor: "#000000",
                            fontFamily:"Montserrat",  
                            marginBottom: "0px",
                          }}
                          onChange={(e) => setOldPassword(e.target.value)}
                          placeholder="Enter old password"
                        />
                        {oldPassFlag && (
                          <p className="error-color">{oldPassError}</p>
                        )}
                      </div>
                    </div>
                    <br />

                    <div className="input-line">
                      <h6>New password:</h6>
                      <div>
                        <Input.Password
                          type="password"
                          id="font-style"
                          style={{
                            height: "45px",
                            width: "200px",
                            marginLeft: "50px",
                            borderBottomWidth: "2px",
                            borderColor: "#000000",
                            marginBottom: "0px",
                          }}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                        {passFlag && <p className="error-color">{passError}</p>}
                      </div>
                    </div>

                    <br />
                    <div className="input-line">
                      <h6>Confirm password:</h6>
                      <div>
                        <Input.Password
                          type="password"
                          id="font-style"
                          style={{
                            height: "45px",
                            width: "200px",
                            marginLeft: "50px",
                            borderBottomWidth: "2px",
                            borderColor: "#000000",
                            marginBottom: "0px",
                          }}
                          onChange={(e) => setConPassword(e.target.value)}
                          placeholder="Enter confirm password"
                        />
                        {passConFlag && (
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
          </ThemeProvider>
        </>
      )}
      <div className="exp"></div>
      <Footer />
      <ThemeProvider theme={theme}>
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

                {!updateButton && (
                  <button className="button-1311" onClick={handleNewAddress}>
                    Add
                  </button>
                )}

                {updateButton && (
                  <button className="button-1311" onClick={handleAddressUpdate}>
                    Update
                  </button>
                )}
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
      </ThemeProvider>
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
