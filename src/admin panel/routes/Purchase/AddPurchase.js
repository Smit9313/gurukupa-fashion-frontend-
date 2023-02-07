import React,{useState,useEffect} from 'react';
import Header from '../../components/Header';
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Footer from '../../components/Footer';
import MenuItem from "@mui/material/MenuItem";
import { Form, Select } from "antd";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from 'axios';


function AddPurchase() {

    const [supplier, setSupplier] = React.useState("");
    const [value, setValue] = React.useState(null);
    const [divs, setDivs] = useState([1]);
    const [suppName,setSuppName] = useState("");
    const [supId, setSupId] = useState("");


    const handleChange = (event) => {
       setSupplier(event.target.value);
    };
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


    const handleProductQty = () => {
      setDivs([...divs, divs.length + 1]);
    };

        const handleProductQtyM = (index) => {
          setDivs(divs.filter((div) => div !== index));
        };


  return (
    <>
      <Header name="Add Purchase" path="admin / addPurchase" />
      <div className="add-suplier">
        <div className="add-suplier-sub1">
          <div className="box">
            <p>Select Suplier Name:</p>

            <Select
              showSearch
              style={{ width: 332 }}
              placeholder="Select category"
              value={supId}
              onChange={(value) => {setSupId(value)
                console.log(value)
              }
              }
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
            {/* <p>Select product:</p>
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
            </Select> */}
          </div>
          {/* <div className="box box-qty">
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
          </div> */}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AddPurchase