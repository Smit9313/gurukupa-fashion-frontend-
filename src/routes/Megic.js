import { isEmpty } from "lodash";
import React, { useState } from "react";
import { Input, Radio, ConfigProvider } from "antd";
import { Toaster, toast } from "react-hot-toast";
import BodyMeasurements from "./BodyMeasurements";
import Navbar from "../components/navbar/Navbar";
import "../Style/megic.css";

function Megic() {
  const token = localStorage.getItem("token");

  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [gender, setGender] = useState("male");

  const [form, setForm] = useState(true);
  const [tool, setTool] = useState(false);

  const handleNextForm = (e) => {
    e.preventDefault();

    if (!isEmpty(height) && !isEmpty(weight) && !isEmpty(gender)) {
      // console.log("valid");
      setForm(false);
      setTool(true);

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
            {form && (
              <>
              <Navbar/>
                <div className="container1">
                  <div className="title">Fill Details</div>

                  <form>
                    <div className="megic-form">
                      <p>Enter weight :</p>
                      <Input
                        type="number"
                        onChange={(e) => setWeight(e.target.value)}
                      />
                      <label>Kgs</label>
                    </div>
                    <div className="megic-form">
                      <p>Enter hight :</p>
                      <Input
                        type="number"
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
              </>
            )}
            {tool && (
              <>
                <BodyMeasurements height={height} weight={weight} gender={gender} />
              </>
            )}
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
