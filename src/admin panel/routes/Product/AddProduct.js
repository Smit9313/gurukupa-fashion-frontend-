import React,{useState} from 'react';
import Header from '../../components/Header';
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Footer from "../../components/Footer";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import '../../Style/addproduct.css'

function AddProduct() {

  const width = true;

   const [supplier, setSupplier] = React.useState("");
   const [value, setValue] = React.useState(null);
    const [divs, setDivs] = useState([1]);
    const [divsImg, setDivsImg] = useState([1]);

   const handleChange = (event) => {
     setSupplier(event.target.value);
   };

   const handleProductImg = ()=>{
         setDivsImg([...divsImg, divsImg.length + 1]);
   }

    const handleProductQty = () => {
        setDivs([...divs, divs.length + 1]);
    };

    const handleProductQtyM = (index) =>{
        setDivs(divs.filter((div) => div !== index));
    }

    const handleProductImgM = (index)=>{
      setDivsImg(divsImg.filter((div)=> div !== index));
    }

      
  return (
    <>
      <Header name="Add Product" path="admin / addProduct" />
      <div className="add-suplier">
        <div className="add-suplier-sub1">
          <div className="box">
            <p>Enter product name:</p>
            {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={supplier}
              label="Select Supplier"
              size="small"
              onChange={handleChange}
              fullWidth={true}>
              <MenuItem value={10}>x</MenuItem>
              <MenuItem value={20}>y</MenuItem>
              <MenuItem value={30}>z</MenuItem>
            </Select> */}
            <TextField label="name" size="small" fullWidth={width} />
          </div>

          <div className="box">
            <p>Select category</p>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="select"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={supplier}
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
            <p>Enter status:</p>
            <TextField label="amount" size="small" fullWidth={width} />
          </div>

          <div className="box">
            <p>Enter product description:</p>
            <TextField label="description" size="small" fullWidth={width} />
          </div>

          <div className="box">
            <p>Enter price:</p>
            <TextField label="price" size="small" fullWidth={width} />
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

        <div className="add-suplier-sub1">
          <div className="box box-qty">
            <p>Enter product quantity:</p>
            <div className="add-qty-btn">
              <i
                className="bx bx-plus icon add-icon"
                onClick={handleProductQty}></i>
              <p>Add</p>
            </div>
            {divs.map((div) => (
              <div key={div} className="add-qty">
                <TextField label="size" size="small" />
                <div className="space-b"></div>
                <TextField label="Qty" size="small" />
                <i
                  className="bx bx-minus icon add-icon"
                  onClick={() => handleProductQtyM(div)}></i>
              </div>
            ))}
          </div>

          <div className="box box-qty">
            <p>select Product image:</p>
            <div className="add-qty-btn">
              <i
                className="bx bx-plus icon add-icon"
                onClick={handleProductImg}></i>
              <p>Add</p>
            </div>
            {divsImg.map((div) => (
              <div key={div} className="add-qty">
                {/* <TextField label="price" size="small" /> */}
                <Button variant="contained" component="label">
                  Upload
                  <input accept="image/*" multiple type="file" />
                </Button>
                {/* <div className="space-b"></div> */}
                {/* <TextField label="price" size="small" /> */}
                <i
                  className="bx bx-minus icon add-icon"
                  onClick={() => handleProductImgM(div)}></i>
              </div>
            ))}
          </div>

          {/* <div className="box">
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
          </div> */}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AddProduct