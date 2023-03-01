import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Error from "./Error";
import { Input } from "antd";
import { Toaster, toast } from "react-hot-toast";

function ChangePassword() {
  let { key } = useParams();
  let history = useHistory();

  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [passFlag, setPassFlag] = useState(false);

  const [passCon, setPassCon] = useState("");
  const [passConError, setPassConError] = useState("");
  const [passConFlag, setPassConFlag] = useState(false);

  const [isValid, setIsValid] = useState(false);

  

  const handleChange = (event) => {
    event.preventDefault();

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

    if(!passConNull && !minPassConLength && !maxPassConLength && pass === passCon){
      setPassConFlag(true);
      setPassConError("");
    }

    if (
      !passConNull &&
      !minPassConLength &&
      !maxPassConLength &&
      pass === passCon
    ) {
      setPassConFlag(true);
    }

    
    if (
      !passNull &&
      !minPassLength &&
      !maxPassLength &&
      !passConNull &&
      !minPassConLength &&
      !maxPassConLength &&
      pass === passCon
    ) {
      const headers = { Authorization: `Bearer "${key}` };
      console.log(headers);
      try {
        axios
          .post(
            `${process.env.REACT_APP_API_HOST}/reset-password/`,
            {
              newPassword: passCon,
            },
            { headers }
          )
          .then((response) => {
            console.log(response.data.message);

            if (response.data.message === "Success!") {
              setPassFlag(false);
              setPassConFlag(false);
              setPass("");
              setPassCon("");
              history.push("/login");
            } else {
              toast.error(response.data.message, {
                duration: 3000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    }


  };

  useEffect(() => {
    const headers = { Authorization: `Bearer ${key}` };

    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/reset-password/`, { headers })
        .then((response) => {
          if (response.data.message === "Token corrupted.") {
            setIsValid(false);
          }else if (response.data.message === "User exists.") {
            setIsValid(true);
          }else{

          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (passFlag === true && passConFlag === true) {
    console.log(key);
    
  }

  return (
    <>
      {isValid ? (
        <>
          <Navbar />

          <div className="extra-space-login"></div>
          <div className="container1">
            <div className="title">Reset Password</div>
            <div className="content">
              <form>
                <div className="user-details">
                  <div className="">
                    <span className="details">Password:</span>
                    <Input.Password
                      type="password"
                      style={{
                        height: "45px",
                        borderBottomWidth: "2px",
                        borderColor: "#000000",
                        marginBottom: "30px",
                      }}
                      onChange={(e) => setPass(e.target.value)}
                      placeholder="Enter your password"
                    />
                    {!passFlag && <p>{passError}</p>}
                  </div>
                  <div className="">
                    <span className="details">Confirm password:</span>
                    <Input.Password
                      type="password"
                      style={{
                        height: "45px",
                        borderBottomWidth: "2px",
                        borderColor: "#000000",
                        marginBottom: "30px",
                      }}
                      onChange={(e) => setPassCon(e.target.value)}
                      placeholder="Confirm your password"
                    />
                    {!passConFlag && <p>{passConError}</p>}
                  </div>
                </div>

                <button type="submit" onClick={handleChange}>
                  Change password
                </button>
              </form>
            </div>
          </div>

          <div className="extra-space-login"></div>

          <Footer />
        </>
      ) : (
        <>
          <Error />
        </>
      )}
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

export default ChangePassword;
