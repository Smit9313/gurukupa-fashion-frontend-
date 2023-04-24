import { isEmpty } from "lodash";
import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Input, Radio, ConfigProvider } from "antd";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "../components/navbar/Navbar";
import "../Style/megic.css";
import Footer from "./Footer";

function Megic() {
  const token = localStorage.getItem("token");
  const { pid } = useParams();
  const history = useHistory();

  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [gender, setGender] = useState("male");

  const handleNextForm = (e) => {
    e.preventDefault();

    if (!isEmpty(height) && !isEmpty(weight) && !isEmpty(gender)) {
      history.push(`/camera/${pid}/${gender}/${height}/${weight}`);
    } else {
      console.log("invalid");
      toast.error("Fill all details!", {
        duration: 3000,
      });
    }
  };

  return (
    <>
      {!isEmpty(token) ? (
        <>
          <ConfigProvider
            theme={{
              components: {
                Radio: {
                  colorPrimary: "#000",
                  colorPrimaryHover: "#000",
                },
              },
            }}>
            <Navbar />
            <div className="container1">
              <div className="title">Fill Details</div>

              <form>
                <div className="megic-form">
                  <p>Enter weight :</p>
                  <Input
                    type="number"
                    min={1}
                    InputProps={{
                      inputProps: { min: 1 },
                    }}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <label>Kgs</label>
                </div>
                <div className="megic-form">
                  <p>Enter height :</p>
                  <Input
                    type="number"
                    min={1}
                    InputProps={{
                      inputProps: { min: 1 },
                    }}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                  <label>Cm</label>
                </div>
                <div className="megic-form">
                  <p>Select gender :</p>

                  <Radio.Group
                    defaultValue={gender}
                    onChange={(value) => {
                      setGender(value.target.value);
                    }}>
                    <Radio value="male"> Male </Radio>
                    <Radio value="female"> Female </Radio>
                  </Radio.Group>
                </div>

                <button onClick={(e) => handleNextForm(e)}>Next</button>
              </form>
            </div>
            <div className="container1" style={{ marginTop: "20px", marginBottom:"50px", padding:"23px" }}>
              <div className="title">Instructions</div>
              <br />
              <p>
                1. Find a well-lit area in your home with good lighting. This
                will help ensure that the measurement is accurate.
              </p>
              <br />
              <p>
                2. Choose a clean background like a wall or door. Avoid patterns
                or textures in the background as they can interfere with the
                measurement.
              </p>
              <br />
              <p>
                3. Wear form-fitting or minimal clothing to ensure that the
                measurement is as precise as possible.
              </p>
              <br />
              <p>
                4. Stand in front of the camera and follow the on-screen guide
                to position yourself correctly.
              </p>
              <br />
              <p>
                5. Once the measurement is complete, select from the suggested
                sizes to find the best fit.
              </p>
            </div>
            <Footer />
          </ConfigProvider>
        </>
      ) : (
        <>
          <br />
          <br />
          <center>
            <h2>Login First to use tool...</h2>
          </center>
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

export default Megic;
