import React,{useState} from 'react';
import Navbar from "../components/navbar/Navbar";
import Footer from './Footer';
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {

   const [email, setEmail] = useState("");
   const [emailError, setEmailError] = useState("");
   const [emailFlag, setEmailFlag] = useState(false);
   const [flag , setFlag] = useState(true);

   let history = useHistory();

  const handleClick=(event)=>{
    event.preventDefault();


    /****** Email *******/
    const email_pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let emailNull = email.trim() === "";
    let emailNotNull = email.trim() !== "";

    if (emailNull) {
      setEmailFlag(false);
      setEmailError("Email Should not be blank.");
    }

    if (emailNotNull && !email_pattern.test(email)) {
      setEmailFlag(false);
      setEmailError("Enter Valid Email.");
      setFlag(true);
    }

    if (!emailNull && email_pattern.test(email)) {
      setEmailFlag(true);
    }
  }

       const toast_message = (message) => {
         if (message === "Success") {
           return toast.success("Check Email..", {
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

  if(emailFlag === true){

    try {
         axios
           .post("http://127.0.0.1:8000/request-password-reset/", {
             email: email,
           })
           .then((response) => {

            if (response.data.message === "User doesn't exist."){
              setEmailError("User doesn't exist.");
              toast_message("warning");
              setEmailFlag(false);
            }else if(response.data.message === "Success!"){
              setEmailFlag(false);
              toast_message("Success");
              setFlag(!flag);
            }else{
               setEmailFlag(false);
            }
             setEmailFlag(false);
           })
           .catch((error) => {
             console.log(error);
           });
       } catch (err) {

       }
     }

  


  return (
    <>
      <Navbar />
      <div className="extra-space-login"></div>
      <div className="container1">
        <div className="title">Reset Password</div>
        <div className="content">
          {flag && (
            <form>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Email:</span>
                  <input
                    type="text"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!emailFlag && <p>{emailError}</p>}
                </div>
              </div>

              <button type="submit" onClick={handleClick}>
                Send mail
              </button>
            </form>
          )}

          {!flag && (
            <form>
              <div className="user-details">
                <div className="input-box">
                  You should receive a link in a few moments. Please open that
                  link to reset your password.
                  <br/>
                  <span className="details">Email:</span>
                  <h5>{email}</h5>
                </div>
              </div>

              <button type="submit" onClick={() => history.push("/login")}>
                back to login
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="extra-space-login"></div>

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

export default ForgotPassword