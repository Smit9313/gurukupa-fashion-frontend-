import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import "../Style/register.css";
import Footer from "./Footer.js";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { isEmpty } from "lodash";
import { Input } from "antd";

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

    const token = localStorage.getItem("token");

    // Replace this with your actual check
    if (!isEmpty (token)) {
      history.replace("/");
    }

  const validateRegister = (event) => {
    event.preventDefault();

    /******** Username *******/

    let nameNull = uname.trim() === "";
    let nameNotNull = uname.trim() !== "";
    // let minNameLength = uname.trim().length < 6;
    // let maxNameLength = uname.trim().length > 10;

    if (nameNull) {
      setNameFlag(false);
      setUnameError("Name Should not blank.");
    }

    // if ((minNameLength || maxNameLength) && nameNotNull) {
    //   setNameFlag(false);
    //   setUnameError("Username length must be 6 to 10");
    // }

    if (!nameNull) {
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
    if (!passConNull && pass === passCon) {
      setPassConFlag(true);
    }

    if (
      !nameNull &&
      // !minNameLength &&
      // !maxNameLength &&
      !emailNull &&
      email_pattern.test(email) &&
      !passNull &&
      !minPassLength &&
      !maxPassLength &&
      !passConNull &&
      pass === passCon
    ) {

      axios
        .post(`${process.env.REACT_APP_API_HOST}/signup/`, {
          name: uname,
          email: email.toLocaleLowerCase(),
          password: passCon,
          role: "customer",
        })
        .then((response) => {
          console.log(response);
          if (response.data.message === "Success!") {
            axios
              .post(`${process.env.REACT_APP_API_HOST}/login/`, {
                // name: uname,
                email: email.toLocaleLowerCase(),
                password: passCon,
              })
              .then((response1) => {
                if (response1.data.message === "Success!") {
                  toast.success("Registerd successfully!", {
                    duration: 3000,
                  });
                  localStorage.setItem(
                    "token",
                    JSON.stringify(response1.data.data["token"])
                  );

                  setUname("");
                  setEmail("");
                  setPass("");
                  setPassCon("");

                  history.push("/home");
                  window.location.reload(true);
                }
              })
              .catch(
                (error) =>
                  // console.log(error)
                  pass
              );
          }else if(response.data.message === "User already exists."){
            setEmailFlag(false);
            setEmailError("User already exists.");
             toast.error("User already exists.", {
               duration: 3000,
             });
          }else{}
        })
        .catch((error) => {
          setError(error.response.data.data["error_msg"]);
          setErrorFlag(true);
          console.log(error.response.data.data["error_msg"]);
          setEmailFlag(false);
        });
    }
  };

  return (
    <>
      <Navbar />
      {/* <div className="extra"></div> */}
      <div className="container1 animate__animated animate__zoomIn">
        <div className="title">Registration</div>
        <div className="content">
          <form onSubmit={validateRegister}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input
                  id="inputText"
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) => setUname(e.target.value)}
                />
                {!nameFlag && <p className="error-color">{unameError}</p>}
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  id="inputText"
                  type="text"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!emailFlag && <p className="error-color">{emailError}</p>}
                {errorFlag && <p className="error-color">{error}</p>}
              </div>
              <div style={{ marginTop: "30px" }}>
                <span className="details">Password</span>
                <Input.Password
                  type="password"
                  id="font-style"
                  style={{
                    height: "45px",
                    fontSize: "16px",
                    borderBottomWidth: "2px",
                    borderColor: "#000000",
                  }}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter your password"
                />
                {!passFlag && <p className="error-color">{passError}</p>}
              </div>
              <div style={{ marginTop: "30px" }}>
                <span style={{ marginTop: "30px" }} className="details">
                  Confirm Password
                </span>
                <Input.Password
                  type="password"
                  style={{
                    height: "45px",
                    fontSize: "16px",
                    borderBottomWidth: "2px",
                    borderColor: "#000000",
                  }}
                  onChange={(e) => setPassCon(e.target.value)}
                  placeholder="Confirm your password"
                />
                {!passConFlag && <p className="error-color">{passConError}</p>}
              </div>
            </div>
            <button style={{ marginTop: "30px" }} type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="extra"></div>
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

export default Register;
