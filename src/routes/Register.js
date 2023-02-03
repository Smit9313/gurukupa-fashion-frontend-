import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import "../Style/register.css";
import Footer from "./Footer.js";
import axios from "axios";

function Register() {

  const [uname, setUname] = useState("");
  const [unameError, setUnameError] = useState("");
  const [nameFlag, setNameFlag] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [passFlag, setPassFlag] = useState(false);

  const [passCon, setPassCon] = useState("");
  const [passConError, setPassConError] = useState("");
  const [passConFlag, setPassConFlag] = useState(false);

  const [error, setError] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);

  let history = useHistory();

  const validateRegister = (event) => {
    event.preventDefault();

    /******** Username *******/

    let nameNull = uname.trim() === "";
    let nameNotNull = uname.trim() !== "";
    let minNameLength = uname.trim().length < 6;
    let maxNameLength = uname.trim().length > 10;

    if (nameNull) {
      setNameFlag(false);
      setUnameError("Name Should not blank.");
    }

    if ((minNameLength || maxNameLength) && nameNotNull) {
      setNameFlag(false);
      setUnameError("Username length must be 6 to 10");
    }

    if (!nameNull && !minNameLength && !maxNameLength) {
      setNameFlag(true);
    }

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

    /****** Confirm Password *******/

    let passConNull = passCon.trim() === "";
    let passConNotNull = passCon.trim() !== "";
    let minPassConLength = passCon.trim().length < 7;
    let maxPassConLength = passCon.trim().length > 10;

    if (passConNull) {
      setPassConFlag(false);
      setPassConError("Confirm Password Should not blank.");
    }

    if ((minPassConLength || maxPassConLength) && passConNotNull) {
      setPassConFlag(false);
      setPassConError("Confirm password length must be 8 to 10");
    }

    if (passConNotNull && pass !== passCon) {
      setPassConFlag(false);
      setPassConError("password and confirm password must be same.");
    }

    if (
      !passConNull &&
      !minPassConLength &&
      !maxPassConLength &&
      pass === passCon
    ) {
      setPassConFlag(true);
    }
      // console.log(error);
  };

  if (
    nameFlag === true &&
    emailFlag === true &&
    passFlag === true &&
    passConFlag === true
  ) {
    //  Register Api

    axios
      .post("http://127.0.0.1:8000/signup/", {
        name: uname,
        email: email,
        password: passCon,
        role: "customer",
      })
      .then((response) => {
        // console.log(response.data.data["email"]);
        // console.log("response ",response.status);
        if (response.status === 200) {
          axios
            .post("http://127.0.0.1:8000/login/", {
              // name: uname,
              email: email,
              password: passCon,
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
            .catch(
              (error) =>
                // console.log(error)
                pass
            );
        }
      })
      .catch((error) => {
        setError(error.response.data.data["error_msg"]);
        setErrorFlag(true);
        console.log(error.response.data.data["error_msg"]);
        setEmailFlag(false);
      });
      // console.log(error);
  }


  return (
    <>
      <Navbar />
      {/* <div className="extra"></div> */}
      <div className="container1">
        <div className="title">Registration</div>
        <div className="content">
          <form onSubmit={validateRegister}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) => setUname(e.target.value)}
                />
                {!nameFlag && <p>{unameError}</p>}
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!emailFlag && <p>{emailError}</p>}
                {errorFlag && <p>{error}</p>}
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
              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  onChange={(e) => setPassCon(e.target.value)}
                />
                {!passConFlag && <p>{passConError}</p>}
              </div>
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
      <div className="extra"></div>
      <Footer />
    </>
  );
}

export default Register;
