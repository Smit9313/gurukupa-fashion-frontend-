import React,{useState} from 'react';
import Navbar from "../components/navbar/Navbar";
import Footer from './Footer';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { LineWave } from "react-loader-spinner";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {

   const [email, setEmail] = useState("");
   const [emailError, setEmailError] = useState("");
   const [emailFlag, setEmailFlag] = useState(false);
   const [flag , setFlag] = useState(true);
   const [loading, setLoading] = useState(false);

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
      	toast.error("Email Should not be blank.", {
          duration: 3000,
        });
    }

    if (emailNotNull && !email_pattern.test(email)) {
      setEmailFlag(false);
      setEmailError("Enter Valid Email.");
      setFlag(true);
      	toast.error("Enter Valid Email.", {
          duration: 3000,
        });
    }

    if (!emailNull && email_pattern.test(email)) {
      // setEmailFlag(true);
      setEmailError("");
      setLoading(true);

      try {
        axios
          .post("http://127.0.0.1:8000/request-password-reset/", {
            email: email,
          })
          .then((response) => {
            console.log(response);

            if (response.data.message === "User doesn't exist.") {
              setEmailError("User doesn't exist.");
              setEmailFlag(false);
              	toast.error(response.data.message, {
                  duration: 3000,
                });
                setLoading(false);
            } else if (response.data.message === "Success!") {
               setLoading(false);
              setEmailFlag(false);
              setFlag(!flag);
              	toast.success("Email send!", {
                  duration: 3000,
                });
            } else {
              setEmailFlag(false);

            }
            setEmailFlag(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {}

    }
  }

      


  


  return (
    <>
      <Navbar />
      <div className="extra-space-login"></div>
      <div style={{marginLeft:"45vw"}}>
        {loading && (
          <LineWave
            height="100"
            width="100"
            color="#000"
            ariaLabel="line-wave"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        )}
      </div>
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
                  {loading && <h4>loading...</h4>}
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
                  <br />
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
      <Toaster
        position="top-center"
        containerStyle={{
          top: 10,
        }}
        reverseOrder={true}
      />
    </>
  );
}

export default ForgotPassword