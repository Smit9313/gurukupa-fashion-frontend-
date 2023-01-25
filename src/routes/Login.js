import React,{useState, useeffect, useEffect} from 'react';
import "../Style/login.css";
import {Link, useHistory} from 'react-router-dom';
import Footer from './Footer';
import Navbar from "../components/navbar/Navbar";
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [passFlag, setPassFlag] = useState(false);


  const [error, setError] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);

  const history = useHistory();

  const validateRegister = (event) =>{
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
    }

    if (!emailNull && email_pattern.test(email)) {
      setEmailFlag(true);
    }

    /****** Password *******/

    let passNull = pass.trim() === "";
    let passNotNull = pass.trim() !== "";
    let minPassLength = pass.trim().length < 7;
    let maxPassLength = pass.trim().length > 10;

    if (passNull) {
      setPassFlag(false);
      setPassError("Password Should not blank.");
    }

    if ((minPassLength || maxPassLength) && passNotNull) {
      setPassFlag(false);
      setPassError("password length must be 8 to 10");
    }

    if (!passNull && !minPassLength && !maxPassLength) {
      setPassFlag(true);
    }
  };

  // if(data){nai avtu??
  //   // data.map((item,index)={
      
  //   //   return ;
  //   // });
  // }

  if (emailFlag === true && passFlag === true) {
      axios
        .post("http://127.0.0.1:8000/mongo_auth/login/", {
          // name: uname,
          email: email,
          password: pass,
        })
        .then((response) => {
          // console.log("response ", response.status);
          if (response.status === 200) {
          }
          sessionStorage.setItem(
            "token",
            JSON.stringify(response.data.data["token"])
          );
          // console.log(response);

          history.push("/home");
        })
        .catch((error) =>{
          // console.log(error);
          setErrorFlag(true);
          setEmailFlag(false)
      });
  }

  return (
    <>
      <Navbar />
      {/* <div className="extra-space"></div> */}
      {/* {
        data.map((item, index)=>{
          return <div key={index}>{item.title}
          </div>
        })
      } */}
      <div className="container1">
        <div className="title">Login</div>
        <div className="content">
          <form onSubmit={validateRegister}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!emailFlag && <p>{emailError}</p>}
                {errorFlag && <p>User not found</p>}
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPass(e.target.value)}
                />
                {!passFlag && <p>{passError}</p>}
              </div>
            </div>
            <button type="submit">Login</button>
            <div className="footer-f">
              <h4>
                Don't have an account ?{" "}
                <Link className="" to="./register">
                  Register Now
                </Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
      <div className="extra-space"></div>
      <Footer />
    </>
  );
}

export default Login;