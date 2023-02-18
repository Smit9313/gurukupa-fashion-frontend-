import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import Footer from "../../components/Footer";
import { Select } from "antd";
import { ConfigProvider, DatePicker } from "antd";
import axios from "axios";
import "../../Style/addpurchase.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Toaster, toast } from "react-hot-toast";
import { isEmpty } from "lodash";

function AddPurchase() {
  const [suppName, setSuppName] = useState("");

  const [supId, setSupId] = useState("");
  const [supIdFlag, setSupIdFlag] = useState(false);
  const [supIdError, setSupIdError] = useState("");

  const [date, setDate] = useState(dayjs());
  const [cat_data, setCat_Data] = useState();
  const [subcat_data, setSubCat_Data] = useState();
  const [prod_data, setProd_Data] = useState();
  const [product_id, setProductId] = useState();
  const [cattypeid, setCatTypeId] = useState("");
  const [subcatid, setSubCatId] = useState("");
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState("")

  const [productDetails, setProductDetails] = useState([
    {
      prod_id: "",
      purch_qty: [
        {
          size: "",
          qty: "",
        },
      ],
      purch_price: "",
    },
  ]);

  const theme = createTheme({
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
  });

  const width = true;

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(
          "http://127.0.0.1:8000/admin-supplier/",
          //  qs.stringify({ cat_type: cat_type, active: cat_status }),
          { headers }
        )
        .then((response) => {
          //  console.log(response.data.data);
          setSuppName(
            response.data.data.map(({ name, _id }) => ({
              label: name,
              value: _id,
            }))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(
          "http://127.0.0.1:8000/admin-category-type/",
          //  qs.stringify({ cat_type: cat_type, active: cat_status }),
          { headers }
        )
        .then((response) => {
          //  console.log(response.data.data);
          setCat_Data(
            response.data.data.map(({ cat_type, _id }) => ({
              label: cat_type,
              value: _id,
            }))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, []);

  //  const handleFormChange = (event,index)=>{
  //   let data = [...productDetails];
  //   data[index][event.target.name] = event.target.value;
  //   setProductDetails(data);
  //  }

  const handleFormChangeprice = (event, index) => {
    let data = [...productDetails];
    data[index][event.target.name] = parseFloat(event.target.value);
    setProductDetails(data);
  };

  const handleFormChangeSize = (event, index1, index) => {
    let data = [...productDetails];
    // console.log(event.target.name)
    data[index].purch_qty[index1][event.target.name] = event.target.value;
    setProductDetails(data);
  };

  const handleFormChangeSize1 = (event, index1, index) => {
    let data = [...productDetails];
    // console.log(event.target.name)
    data[index].purch_qty[index1][event.target.name] = parseInt(
      event.target.value
    );
    setProductDetails(data);
  };

  const handleProductId = (value, index) => {
    let data = [...productDetails];
    data[index]["prod_id"] = value;
    setProductDetails(data);
  };

  const handleAddProduct = () => {
    let object = {
      prod_id: "",
      purch_qty: [
        {
          size: "",
          qty: "",
        },
      ],
      purch_price: "",
    };
    setProductDetails([...productDetails, object]);
  };

  const handleNewSize = (id) => {
    setProductDetails(
      productDetails.map((object, index) => {
        if (index === id) {
          return {
            ...object,
            purch_qty: [
              ...object.purch_qty,
              {
                size: "",
                qty: "",
              },
            ],
          };
        }
        return object;
      })
    );
  };

  const handleRemove = (index1, index) => {
    let data = [...productDetails];
    data[index]["purch_qty"].splice(index1, 1);
    setProductDetails(data);
  };

  const handleRemoveProduct = (index) => {
    let data = [...productDetails];
    data.splice(index, 1);
    setProductDetails(data);
  };

  const handleAddClick = () => {
    // console.log(date)
    // console.log(supId);
    // console.log(date);
    // console.log(productDetails)

    // Supplier Id
    if (supId === "") {
      setSupIdError("Select sup_id!");
      setSupIdFlag(true);
    } else {
      setSupIdError("");
      setSupIdFlag(false);
    }

    productDetails.map((prod, index) => {
      prod.purch_qty.map((pqty) => {
        if (
          pqty.size !== "" &&
          pqty.qty !== "" &&
          prod.prod_id !== "" &&
          prod.purch_price !== ""
        ) {
          setFlag(false)
        }
      });
    });

    productDetails.map((prod, index) => {
       if (!isEmpty(prod.purch_qty)) {
         prod.purch_qty.map((pqty) => {
           if (
             pqty.size !== "" &&
             pqty.qty !== "" &&
             prod.prod_id !== "" &&
             prod.purch_price !== "" &&
             supId !== "" &&
             date !== ""
           ) {
             const token = sessionStorage.getItem("token");
             console.log(token);
             const headers = {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/jsonn",
             };
             console.log(headers);
             try {
               axios
                 .post(
                   "http://127.0.0.1:8000/admin-purchase/",
                   {
                     supp_id: supId,
                     date: date,
                     "Purchase-details": productDetails,
                   },
                   { headers }
                 )
                 .then((response) => {
                   console.log(response.data);
                   if (response.data.message === "Success!") {
                     setSupId("");
                     setSupIdFlag(false);
                     setProductDetails([
                       {
                         prod_id: "",
                         purch_qty: [
                           {
                             size: "",
                             qty: "",
                           },
                         ],
                         purch_price: "",
                       },
                     ]);
                     setFlag(false);
                     toast.success("Purchase added!", {
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
             toast.error("Fill all product details!", {
               duration: 3000,
             });
             setFlag(true);
             setError("Fill all product details!");
           }
         });
       } else {
         toast.error("Minimum 1 size and qty required!", {
           duration: 20,
         });
         setFlag(true);
         setError("Fill all product details!");
       }
      
    });

    

    // if (supId !== "" && date !== "") {
    //   productDetails.map((prod, index) => {
    //     if (
    //       prod.prod_id !== "" &&
    //       prod.purch_price !== "" &&
    //       prod.prod_qty !== []
    //     ) {
    //       const token = sessionStorage.getItem("token");
    //       console.log(token);
    //       const headers = {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/jsonn",
    //       };
    //       console.log(headers);
    //       try {
    //         axios
    //           .post(
    //             "http://127.0.0.1:8000/admin-purchase/",
    //             {
    //               supp_id: supId,
    //               date: date,
    //               "Purchase-details": productDetails,
    //             },
    //             { headers }
    //           )
    //           .then((response) => {
    //             //  console.log(response.data.data);
    //             console.log(response);
    //           })
    //           .catch((error) => {
    //             console.log(error);
    //           });
    //       } catch (err) {}
    //     }
    //   });
    // }

    // const token = sessionStorage.getItem("token");
    // console.log(token)
    // const headers = { Authorization: `Bearer ${token}` , 'Content-Type': 'application/jsonn'};
    // console.log(headers)
    //  try {
    //    axios
    //      .post(
    //        "http://127.0.0.1:8000/admin-purchase/",
    //        {
    //          'supp_id': supId,
    //          'date': date,
    //          'Purchase-details': productDetails,
    //        },
    //        { headers }
    //      )
    //      .then((response) => {
    //        //  console.log(response.data.data);
    //        console.log(response);
    //      })
    //      .catch((error) => {
    //        console.log(error);
    //      });
    //  } catch (err) {}
  };

  return (
    <>
      <Header name="Add Purchase" path="admin / addPurchase" />
      {/* <form> */}
      <ThemeProvider theme={theme}>
        <div className="add-suplier">
          <div className="add-suplier-sub1">
            <div className="box">
              <p>Select Suplier Name:</p>

              <Select
                showSearch
                style={{ width: 332 }}
                placeholder="Select supplier"
                value={supId}
                onChange={(value) => {
                  setSupId(value);
                }}
                size="mediam"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={suppName}
              />
              {supIdFlag && <p className="error-color">{supIdError}</p>}
            </div>

            <div className="box">
              <p>Select Purchase Date:</p>
              <ConfigProvider
                theme={{
                  components: {
                    DatePicker: {
                      colorPrimary: "#000",
                      colorPrimaryHover: "#000",
                      colorPrimaryBorder: "#000",
                      colorPrimaryBorderHover: "#000",
                      colorPrimaryText: "#000",
                    },
                  },
                }}>
                <DatePicker
                  defaultValue={dayjs()}
                  value={date}
                  onChange={(value) => {
                    setDate(value);
                  }}
                />
              </ConfigProvider>
            </div>

            {/* <div className="box">
              <p>Enter Total Amount:</p>
              <TextField
                label="amount"
                size="small"
                type="number"
                fullWidth={width}
                onChange={(e) => console.log(e.target.value)}
              />
            </div> */}
          </div>

          <div className="add-suplier-sub2">
            Purchase details:
            {/* <form> */}
            {productDetails.map((form, index) => {
              return (
                <div className="product-details" key={index}>
                  <b>product {index + 1}</b>
                  <div className="box">
                    Select Category-type
                    <br />
                    <Select
                      showSearch
                      style={{ width: 300 }}
                      placeholder="Select category-type"
                      // value={cattypeid}
                      onChange={(value) => {
                        // setCatTypeId(value);
                        setSubCatId("");
                        setProductId("");
                        console.log(value);
                        const token = sessionStorage.getItem("token");
                        const headers = { Authorization: `Bearer ${token}` };

                        try {
                          axios
                            .get(
                              `http://127.0.0.1:8000/admin-cat-type-to-category/${value}/`,
                              //  qs.stringify({ cat_type: cat_type, active: cat_status }),
                              { headers }
                            )
                            .then((response) => {
                              console.log(response.data.data.Category);
                              setSubCat_Data(
                                response.data.data.Category.map(
                                  ({ cat_title, cat_id }) => ({
                                    label: cat_title,
                                    value: cat_id,
                                  })
                                )
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        } catch (err) {}
                      }}
                      size="mediam"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={cat_data}
                    />
                  </div>
                  <div className="box">
                    Select category
                    <br />
                    <Select
                      showSearch
                      style={{ width: 300 }}
                      placeholder="Select category"
                      onChange={(value) => {
                        setProductId("");

                        const token = sessionStorage.getItem("token");
                        const headers = { Authorization: `Bearer ${token}` };

                        try {
                          axios
                            .get(
                              `http://127.0.0.1:8000/admin-cat-to-product/${value}/`,
                              //  qs.stringify({ cat_type: cat_type, active: cat_status }),
                              { headers }
                            )
                            .then((response) => {
                              console.log(response.data.data);
                              setProd_Data(
                                response.data.data.Product.map(
                                  ({ prod_name, prod_id }) => ({
                                    label: prod_name,
                                    value: prod_id,
                                  })
                                )
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        } catch (err) {}
                      }}
                      size="mediam"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={subcat_data}
                    />
                  </div>
                  <div className="box">
                    Select product
                    <br />
                    <Select
                      showSearch
                      name="prod_id"
                      style={{ width: 300 }}
                      placeholder="Select product"
                      onChange={(value, na) => {
                        handleProductId(value, index);
                      }}
                      size="mediam"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={prod_data}
                    />
                  </div>

                  <div className="box-qty">
                    Enter size and quantity{" "}
                    <button
                      className="button-2"
                      onClick={() => handleNewSize(index)}>
                      + add
                    </button>
                    <br />
                    {productDetails[index].purch_qty.map((form1, index1) => {
                      return (
                        <div className="size-quantity" key={index1}>
                          <TextField
                            label="size"
                            size="small"
                            name="size"
                            type="text"
                            sx={{ width: 100 }}
                            // fullWidth={width}
                            onChange={(event) =>
                              handleFormChangeSize(event, index1, index)
                            }
                            value={form1.size}
                          />
                          {"  "}
                          <TextField
                            label="qty"
                            size="small"
                            name="qty"
                            type="number"
                            sx={{ width: 100 }}
                            // fullWidth={width}
                            onChange={(event) =>
                              handleFormChangeSize1(event, index1, index)
                            }
                            value={form1.qty}
                          />
                          {"  "}
                          {/* <button
                            className="button-39"
                            onClick={() => handleRemove(index1, index)}>
                            - Remove
                          </button> */}
                          <FontAwesomeIcon
                            className="edit-product-delete"
                            icon={faTrashCan}
                            onClick={() => handleRemove(index1, index)}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="box">
                    Price:
                    <br />
                    <TextField
                      label="price"
                      name="purch_price"
                      size="small"
                      type="number"
                      sx={{ width: 200 }}
                      // fullWidth={width}
                      onChange={(event) => handleFormChangeprice(event, index)}
                      value={form.purch_price}
                    />
                  </div>
                  <button className="button-40" onClick={handleRemoveProduct}>
                    - Remove product
                  </button>
                </div>
              );
            })}
            {flag && <p className="error-color">{error}</p>}
            <button className="button-30" onClick={handleAddProduct}>
              + Add product
            </button>
            <div className="suplier-button">
              <button
                className="button-311"
                onClick={handleAddClick}>
                Add
              </button>
            </div>
          </div>
        </div>
      </ThemeProvider>
      {/* </form> */}
      <Footer />
      <Toaster
        position="top-center"
        containerStyle={{
          top: 10,
        }}
        reverseOrder={true}
      />
    </>
  );
}

export default AddPurchase;
