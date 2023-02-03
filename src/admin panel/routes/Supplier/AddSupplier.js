import React,{useState,useEffect} from 'react';
import Header from '../../components/Header';
import '../../Style/addsuplier.css';
import TextField from "@mui/material/TextField";
import { Button } from '@mui/material';
import Footer from '../../components/Footer';
import SendIcon from "@mui/icons-material/Send";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddSuplier() {

    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [pincodeError, setPincodeError] = useState(false);


    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [nameFlag, setNameFlag] = useState(false);

    const [mobile, setMobile] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [mobileFlag, setMobileFlag] = useState(false);   

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailFlag, setEmailFlag] = useState(false);

    const [shop, setShop] = useState("");
    const [area, setArea] = useState("");
    const [landmark, setLandmark] = useState("");

    // flags
    const [flag1, setFlag1] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [flag3, setFlag3] = useState(false);

    const [message, setMessage] = useState("");
    const [valid, setValid] = useState(false);

    const width = true;


    useEffect(() => {

      const fetchData = async () => {
        const result = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );

        if(pincode.length === 6)
        {
          if (
            result.data[0].Message !== "No records found" &&
            result.data[0].Message !== "The requested resource is not found"
          ) {
            
            setCity(result.data[0].PostOffice[0].District);
            setState(result.data[0].PostOffice[0].State);
            setPincodeError(false);
          }
        }
        else{
          setPincodeError(true);
          setState("");
          setCity("");
        }

        if(pincode.length === 0){
          setPincodeError(false);
        }
        
      };

      fetchData();

     }, [pincode])
    

      const toast_message = (message) => {
        if (message === "Success") {
          return toast.success("Supplier added", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }else if(message === "warning"){
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
        }else{}
      };



    const handleSubmit = event =>{
      event.preventDefault();

      /************** Name *************/

      let nameNull = name.trim() === "";
      let nameNotNull = name.trim() !== "";
      let minNameLength = name.trim().length < 6;
      let maxNameLength = name.trim().length > 15;

      if (nameNull) {
        setNameFlag(false);
        setNameError("Name Should not blank.");
        setFlag1(true);
      }

      if ((minNameLength || maxNameLength) && nameNotNull) {
        setNameFlag(false);
        setNameError("Username length must be 6 to 15");
        setFlag1(true);
      }

      if (!nameNull && !minNameLength && !maxNameLength) {
        setNameFlag(true);
      }

      /************** Mobile no *************/
      if (mobile.trim() === "") {
        setMobileFlag(false);
        setMobileError("Mobile no. Should not blank.");
        setFlag2(true);
      }

      if (mobile.trim().length > 10) {
        setMobileFlag(false);
        setMobileError("Mobile no minimum more then 10");
        setFlag2(true);
      }

      if(mobile.trim().length === 10){
        setMobileFlag(true);
      }



      /************** Email *************/
      const email_pattern =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      let emailNull = email.trim() === "";
      let emailNotNull = email.trim() !== "";

      if (emailNull) {
        setEmailFlag(false);
        setEmailError("Email Should not be blank.");
        setFlag3(true);
      }

      if (emailNotNull && !email_pattern.test(email)) {
        setEmailFlag(false);
        setEmailError("Enter Valid Email.");
        setFlag3(true);
      }

      if (emailNotNull && email_pattern.test(email)) {
        setEmailFlag(true);
      }


      if(nameNull || minNameLength || maxNameLength || mobile.trim() === "" || mobile.trim().length > 10 || emailNull || !email_pattern.test(email)){
        toast_message("warning");
      }
         
    }

     if (emailFlag === true && nameFlag === true && mobileFlag === true) {
       console.log("valid");

       const token = sessionStorage.getItem("token");
       const headers = { Authorization: `Bearer ${token}` };
       try {
         axios
           .post(
             "http://127.0.0.1:8000/admin-supplier/",
             {
               name: name,
               mobile_no: mobile,
               email: email,
               shop_no: shop,
               area_street: area,
               landmark: landmark,
               city: city,
               state: state,
               pincode: pincode,
             },
             { headers }
           )
           .then((response) => {
             if (response.data["message"] === "Success!") {
               setValid(true);
               setMessage("Supplier Added.");
               toast_message("Success");

               setEmailFlag(false);
               setMobileFlag(false);
               setNameFlag(false);

               setName("");
               setMobile("");
               setEmail("");
               setShop("");
               setArea("");
               setLandmark("");
               setCity("");
               setState("");
               setPincode("");

               setFlag1(false);
               setFlag2(false);
               setFlag3(false);

             } else if (response.data["message"] === "Supplier not inserted.") {
               setValid(false);
               setMessage("Supplier not inserted.");
               toast_message("warning");

             } else if (response.data["message"] === "User not admin.") {
               setValid(false);
               setMessage("User not admin.");
               toast_message("warning");
             } else {
             }
           })
           .catch((error) => {
             console.log(error);
           });
         //  setMessage("Supplier Added.");
       } catch (err) {
         // setError(err);
         console.log("Error");
         setMessage("");
       }
       // setMessage("Supplier Added.");
       console.log()
     }


   
  
  return (
    <>
      <Header name="Add Suplier" path="admin / addSuplier" />
      <form onSubmit={handleSubmit}>
        <div className="add-suplier">
          <div className="add-suplier-sub1">
            <div className="box">
              <p>Enter Suplier Name:</p>
              <TextField
                label="name"
                size="small"
                value={name}
                fullWidth={width}
                onChange={(e) => setName(e.target.value)}
              />
              {flag1 && <p className="error-color">{nameError}</p>}
            </div>

            <div className="box">
              <p>Enter Mobile No:</p>
              <TextField
                label="mobile no"
                type="number"
                size="small"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                fullWidth={width}
              />
              {flag2 && <p className="error-color">{mobileError}</p>}
            </div>

            <div className="box">
              <p>Enter Email:</p>
              <TextField
                label="email"
                size="small"
                value={email}
                fullWidth={width}
                onChange={(e) => setEmail(e.target.value)}
              />
              {flag3 && <p className="error-color">{emailError}</p>}
            </div>
          </div>

          <div className="add-suplier-sub1">
            <div className="box">
              <p>Enter Shop no:</p>
              <TextField
                label="shop no"
                size="small"
                value={shop}
                fullWidth={width}
                onChange={(e) => setShop(e.target.value)}
              />
            </div>

            <div className="box">
              <p>Enter Area Street:</p>
              <TextField
                label="area street"
                size="small"
                value={area}
                fullWidth={width}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>

            <div className="box">
              <p>Enter Landmark:</p>
              <TextField
                label="landmark"
                size="small"
                value={landmark}
                fullWidth={width}
                onChange={(e) => setLandmark(e.target.value)}
              />
            </div>

            <div className="box">
              <p>Enter Pincode:</p>
              <TextField
                label="pincode"
                type="number"
                value={pincode}
                size="small"
                fullWidth={width}
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
                fullWidth={width}
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
                fullWidth={width}
                inputProps={{ readOnly: true }}
              />
            </div>

            <div className="suplier-button">
              <Button
                onClick={handleSubmit}
                variant="contained"
                endIcon={<SendIcon />}
                fullWidth={width}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </form>
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

export default AddSuplier