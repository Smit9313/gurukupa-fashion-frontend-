import React, { useState } from "react";
import "../Style/login.css";
import { Link, useHistory } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import { Input } from "antd";
import { isEmpty } from "lodash";

function Login() {
  const [role, setRole] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [passFlag, setPassFlag] = useState(false);

  const [error, setError] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);

  const [navClose, setNavClose] = useState(false);

  const history = useHistory();

  // useEffect(() => {
  //   localStorage.setItem("role", role);
  //   console.log(role)
  // }, [role]);

  const token = localStorage.getItem("token");

    // Replace this with your actual check
   if (!isEmpty(token)) {
     history.replace("/");
   }



  const validateRegister = (event) => {
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

    if (
      !passNull &&
      !minPassLength &&
      !maxPassLength &&
      !emailNull &&
      email_pattern.test(email)
    ) {
      axios
        .post(`${process.env.REACT_APP_API_HOST}/login/`, {
          // name: uname,
          email: email.toLocaleLowerCase(),
          password: pass,
        })
        .then((response) => {
          if (response.data.message === "User not found.") {
            setError("User not found.");
            setErrorFlag(true);
          } else if (response.data.message === "Success!") {
            localStorage.setItem(
              "token",
              JSON.stringify(response.data.data["token"])
            );

            history.push("/home");
            window.location.reload(true);
          } else if (response.data.message === "Incorrect password!") {
            setPassError("Incorrect password!");
            setPassFlag(false);
          } else {
          }
        })
        .catch((error) => {
          setErrorFlag(true);
          setEmailFlag(false);
        });
    }
  };

  return (
    <>
      <Navbar closeNav={navClose} />
      <div onClick={() => setNavClose(!navClose)}>
        <div className="extra-space-login"></div>
        {/* {
        data.map((item, index)=>{
          return <div key={index}>{item.title}
          </div>
        })
      } */}
        <div className="container1 animate__animated animate__zoomIn">
          <div className="title">Login</div>
          <div className="content">
            <form onSubmit={validateRegister}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Email</span>
                  <input
                    type="text"
                    id="inputText"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!emailFlag && <p>{emailError}</p>}
                  {errorFlag && <p className="error-color">{error}</p>}
                </div>

                <div className="">
                  <span className="details">Password</span>
                  <Input.Password
                    type="password"
                    id="font-style"
                    style={{
                      height: "45px",
                      fontSize: "16px",
                      borderBottomWidth: "2px",
                      borderColor: "#000000",
                      color: "black",
                    }}
                    placeholder="Enter your password"
                    onChange={(e) => setPass(e.target.value)}
                  />
                  {!passFlag && <p className="error-color">{passError}</p>}
                </div>
              </div>
              <button style={{ marginTop: "30px" }} type="submit">
                Login
              </button>
              <div className="footer-f">
                <p>
                  Don't have an account ?{" "}
                  <Link className="" to="./register">
                    Register Now
                  </Link>
                </p>
                <p>
                  Forgotten your password?{" "}
                  <Link className="" to="./forgotpassword">
                    Click here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="extra-space-login"></div>
        {/* <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      /> */}
        <Footer />
      </div>
    </>
  );
}

export default Login;
