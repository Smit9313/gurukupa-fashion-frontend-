import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";  


function AddCategory() {

    const [category, setCategory] = React.useState("");
    const handleChange = (event) => {
      setCategory(event.target.value);
    };


    const width = true;

    return (
      <>
        <Header name="Add Category" path="admin / addCategory" />
        <div className="add-suplier">
          <div className="add-suplier-sub1">
            Category:
            <div className="box">
              <p>Enter Category type:</p>
              <TextField label="type" size="small" fullWidth={width} />
            </div>
            <div className="box">
              <p>Enter Status:</p>
              <TextField label="status" size="small" fullWidth={width} />
            </div>
            <div className="suplier-button">
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                fullWidth={width}>
                Add Category
              </Button>
            </div>
          </div>

          <div className="add-suplier-sub1">
            Sub-Category:
            <div className="box">
              <p>Select Category:</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Select Supplier"
                size="small"
                onChange={handleChange}
                fullWidth={true}>
                <MenuItem value={10}>x</MenuItem>
                <MenuItem value={20}>y</MenuItem>
                <MenuItem value={30}>z</MenuItem>
              </Select>
            </div>
            <div className="box">
              <p>Category Title</p>
              <TextField label="title" size="small" fullWidth={width} />
            </div>
            <div className="box">
              <p>Categoty Description</p>
              <TextField label="description" size="small" fullWidth={width} />
            </div>
            <div className="box">
              <p>Category Status</p>
              <TextField label="status" size="small" fullWidth={width} />
            </div>
            <div className="suplier-button">
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                fullWidth={width}>
                Add sub-Category
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}

export default AddCategory