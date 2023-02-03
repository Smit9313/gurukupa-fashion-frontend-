import React,{useState} from 'react';
import dayjs, { Dayjs } from "dayjs";
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";


function AddDiscount() {




  // Discount
  const [discount, setDiscount] = useState("");
  const [error1,setError1] = useState("");
  const [flag1, setFlag1] = useState(true);

  // valid from
  const [validFrom, setvalidFrom] = useState(new Date());
  const [error2, setError2] = useState("");
  const [flag2, setFlag2] = useState(true);


  // valid until
  const [validUntil, setValidUntil] = useState(new Date());
  const [error3, setError3] = useState("");
  const [flag3, setFlag3] = useState(true);

  // coupen code
  const [coupen, setCoupen] = useState("");
  const [error4, setError4] = useState("");
  const [flag4, setFlag4] = useState(true);


  // minimum order value
  const [minValue, setminValue] = useState("");
  const [error5, setError5] = useState("");
  const [flag5, setFlag5] = useState(true);

  // maximum order value
  const [maxValue, setmaxValue] = useState("");
  const [error6, setError6] = useState("");
  const [flag6, setFlag6] = useState(true);

  const width = true;

  const toast_message = (message) => {
    if (message === "Success") {
      return toast.success("Category added", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (message === "warning") {
      return toast.warn("Somthing wrong!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
    }
  };



  const handleClick = (e) =>{
    e.preventDefault();

    
    // Discount percentage
    if(discount.length === 0){
      setFlag1(false);
      setError1("discount should not blank!");
      // toast_message("warning");
    }
    if(discount > 100){
      setFlag1(false);
      setError1("discount should be 1 to 100");
      toast_message("warning");
    }

    if(discount.length !== 0 && discount < 100){
      setFlag1(true); 
    }


   if (coupen.trim().length === 0) {
     setFlag4(false);
     setError4("discount should not blank!");
    //  toast_message("warning");
   }
   if (coupen.trim().length !== 0){
    setFlag4(true);
   }

    if (minValue === 0 || minValue.length === 0) {
      // Minimum Order Value:
      setFlag5(false);
      setError5("enter valid min value!");
    }
    if (minValue > 0 && minValue.length !== 0) {
      setFlag5(true);
    }

    // Maximum Discount Amount
    if(maxValue === 0 || maxValue.length === 0){
      setFlag6(false);
      setError6("enter valid max value!");
    }
    if (maxValue > 0 && maxValue.length !== 0) {
      setFlag6(true);
    }

  if (
    (discount.length === 0 &&
      discount > 100 &&
      coupen.trim().length === 0 &&
      minValue === 0) ||
    minValue.length === 0 ||
    maxValue === 0 ||
    maxValue.length === 0
  ){
    toast_message("warning")
  }
}


  if(flag1=== true && flag2 === true && flag3 === true && flag4 === true && flag5 === true && flag6 === true){
    console.log("ghfajkh")
  }


  return (
    <>
      <Header name="Add Discount" path="admin / addDiscount" />

      <div className="add-suplier">
        <div className="add-suplier-sub1">
          <div className="box">
            <p>Discount percentage</p>
            <TextField
              type="number"
              label="amount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              size="small"
              fullWidth={width}
            />
            {!flag1 && <p className="error-color">{error1}</p>}
          </div>

          <div className="box">
            <p>Valid From:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={validFrom}
                onChange={(newValue) => setvalidFrom(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="box">
            <p>Valid Until:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="select date"
                value={validUntil}
                onChange={(newValue) => {
                  setValidUntil(newValue);
                }}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className="add-suplier-sub1">
          <div className="box">
            <p>Coupon Code:</p>
            <TextField
              label="shop no"
              onChange={(e) => setCoupen(e.target.value)}
              size="small"
              fullWidth={width}
            />
          </div>

          <div className="box">
            <p>Minimum Order Value:</p>
            <TextField
              label="min order value"
              type="number"
              onChange={(e) => setminValue(e.target.value)}
              size="small"
              fullWidth={width}
            />
            {!flag5 && <p className="error-color">{error5}</p>}
          </div>

          <div className="box">
            <p>Maximum Discount Amount</p>
            <TextField
              label="max discount amount"
              size="small"
              onChange={(e) => setmaxValue(e.target.value)}
              type="number"
              fullWidth={width}
            />
            {!flag6 && <p className="error-color">{error6}</p>}
          </div>

          <div className="suplier-button">
            <Button
              onClick={handleClick}
              variant="contained"
              endIcon={<SendIcon />}
              fullWidth={width}>
              Add
            </Button>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default AddDiscount