import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import Error from "./Error";

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

  const toast_message = (message) => {
    if (message === "Success") {
      return toast.success("password added", {
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

    if (
      !passConNull &&
      !minPassConLength &&
      !maxPassConLength &&
      pass === passCon
    ) {
      setPassConFlag(true);
    }

    console.log(passFlag, passConFlag);
  };

  useEffect(() => {
    const headers = { Authorization: `Bearer ${key}` };

    try {
      axios
        .get(`http://127.0.0.1:8000/reset-password/`, { headers })
        .then((response) => {
          if (response.data.message === "Token corrupted.") {
            setIsValid(false);
          }else if (response.data.message === "User exists.") {
            setIsValid(true);
          }else{}
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
    const headers = { Authorization: `Bearer "${key}"` };
    console.log(headers);
    try {
      axios
        .post(
          `http://127.0.0.1:8000/reset-password/`,
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
            toast_message("Success");
            setPass("");
            setPassCon("");
            history.push("/login");
            // <Redirect to="/login" />;
          } else {
            toast_message("warning");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
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
                  <div className="input-box">
                    <span className="details">Password:</span>
                    <input
                      type="text"
                      value={pass}
                      placeholder="password"
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Confirm password:</span>
                    <input
                      type="text"
                      value={passCon}
                      placeholder="confirm password"
                      onChange={(e) => setPassCon(e.target.value)}
                    />
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
      ):
      <>
        <Error/>
      </>
      }

    </>
  );
}

export default ChangePassword;
