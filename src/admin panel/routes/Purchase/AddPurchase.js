import React,{useState} from 'react';
import Header from '../../components/Header';
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Footer from '../../components/Footer';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";  
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


function AddPurchase() {

    const [supplier, setSupplier] = React.useState("");
    const [value, setValue] = React.useState(null);
    const [divs, setDivs] = useState([1]);


    const handleChange = (event) => {
       setSupplier(event.target.value);
    };
    const width = true;

    const handleProductQty = () => {
      setDivs([...divs, divs.length + 1]);
    };

        const handleProductQtyM = (index) => {
          setDivs(divs.filter((div) => div !== index));
        };

      // console.log(supplier);
      // console.log(value);
  return (
    <>
      <Header name="Add Purchase" path="admin / addPurchase" />
      <div className="add-suplier">
        <div className="add-suplier-sub1">
          <div className="box">
            <p>Select Suplier Name:</p>
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
            <p>Select Purchase Date:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="select"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="box">
            <p>Enter Total Amount:</p>
            <TextField
              label="amount"
              size="small"
              type="number"
              fullWidth={width}
              onChange={(e) => console.log(e.target.value)}
            />
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
          Purchase details:
          <div className="box">
            <p>Select product:</p>
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
                <TextField
                  label="size"
                  size="small"
                  onChange={(e) => console.log(e.target.value)}
                />
                <div className="space-b"></div>
                <TextField
                  label="Qty"
                  size="small"
                  onChange={(e) => console.log(e.target.value)}
                />
                <i
                  className="bx bx-minus icon add-icon"
                  onClick={() => handleProductQtyM(div)}></i>
              </div>
            ))}
          </div>
          <div className="box">
            <p>Enter price:</p>
            <TextField
              label="price"
              size="small"
              type="number"
              fullWidth={width}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AddPurchase