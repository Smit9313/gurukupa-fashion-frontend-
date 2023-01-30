import React from 'react';
import Header from '../../components/Header';
import '../../Style/addsuplier.css';
import TextField from "@mui/material/TextField";
import { Button } from '@mui/material';
import Footer from '../../components/Footer';
import SendIcon from "@mui/icons-material/Send";


function AddSuplier() {

    const width = true;

  return (
    <>
      <Header name="Add Suplier" path="admin / addSuplier" />
      <div className="add-suplier">
        <div className="add-suplier-sub1">
          <div className="box">
            <p>Enter Suplier Name:</p>
            <TextField label="name" size="small" fullWidth={width} />
          </div>

          <div className="box">
            <p>Enter Mobile No:</p>
            <TextField label="mobile no" size="small" fullWidth={width} />
          </div>

          <div className="box">
            <p>Enter Email:</p>
            <TextField label="email" size="small" fullWidth={width} />
          </div>
        </div>

        <div className="add-suplier-sub1">
          <div className="box">
            <p>Enter Shop no:</p>
            <TextField label="shop no" size="small" fullWidth={width} />
          </div>

          <div className="box">
            <p>Enter Area Street:</p>
            <TextField label="area street" size="small" fullWidth={width} />
          </div>

          <div className="box">
            <p>Enter Landmark:</p>
            <TextField label="landmark" size="small" fullWidth={width} />
          </div>

          <div className="box">
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
          </div>

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

export default AddSuplier