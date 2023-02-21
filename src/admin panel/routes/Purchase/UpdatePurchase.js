import React,{useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
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


function UpdatePurchase() {
  let { id } = useParams();
  const history = useHistory();

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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

    useEffect(() => {
      const token = sessionStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        axios
          .get(`http://127.0.0.1:8000/admin-purchase/${id}/`, {
            headers,
          })
          .then((response) => {
            console.log(response);
            if (response.data.message === "Success!") {
                setSupId(response.data.data.supp_name)
                // setDate(dayjs(response.))
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log("Error");
      }
    }, [id]);


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

  return (
    <>
      <section className="home">
        <Header name="Update Purchase" path="admin / updatePurchase" />

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
                    // defaultValue={dayjs()}
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
                        onChange={(event) =>
                          handleFormChangeprice(event, index)
                        }
                        value={form.purch_price}
                      />
                    </div>
                    <button
                      className="button-40"
                      onClick={() => handleRemoveProduct(index)}>
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
                <button className="button-311">
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
      </section>
    </>
  );
}

export default UpdatePurchase;
