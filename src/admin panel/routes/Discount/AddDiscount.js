import React from 'react';
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


function AddDiscount() {

      const [value, setValue] = React.useState(null);

const width = true;

  return (
    <>
      <Header name="Add Discount" path="admin / addDiscount" />

      <div className="add-suplier">
        <div className="add-suplier-sub1">
          <div className="box">
            <p>Discount percentage</p>
            <TextField label="amount" size="small" fullWidth={width} />
          </div>

          {/* <div className="box">
            <p>create Date:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="select date"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          </div> */}

          <div className="box">
            <p>Valid From:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="select date"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="box">
            <p>Valid Until:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="select date"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          </div>

        </div>

        <div className="add-suplier-sub1">
          <div className="box">
            <p>Coupon Code:</p>
            <TextField label="shop no" size="small" fullWidth={width} />
          </div>

          <div className="box">
            <p>Minimum Order Value:</p>
            <TextField label="area street" size="small" fullWidth={width} />
          </div>

          <div className="box">
            <p>Maximum Discount Amount</p>
            <TextField label="landmark" size="small" fullWidth={width} />
          </div>

          {/* <div className="box">
            <p>Enter City:</p>
            <TextField label="city" size="small" fullWidth={width} />
          </div>

          <div className="box">
            <p>Enter State:</p>
            <TextField label="state" size="small" fullWidth={width} />
          </div>

          <div className="box">
            <p>Enter Pincode:</p>
            <TextField label="pincode" size="small" fullWidth={width} />
          </div> */}

          <div className="suplier-button">
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              fullWidth={width}>
              Add
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddDiscount