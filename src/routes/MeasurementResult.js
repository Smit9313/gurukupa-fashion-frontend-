import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function MeasurementResult() {
  const history = useHistory();
  const { pid, gender, chest, hip, waist } = useParams();

  function metersToInches(meters) {
    const inchesPerMeter = 39.3701;
    return meters * inchesPerMeter;
  }

  const chestSize = parseFloat(metersToInches(chest)).toFixed(2);
  const hipSize = metersToInches(hip).toFixed(2);
  const waistSize = metersToInches(waist).toFixed();

  console.log(typeof chestSize);

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px", marginTop: "70px" }}>
        <h1>Measurement result</h1>
        <br />
        {/* <p>{pid}</p> */}
        {/* <br /> */}
        Chest:<p>{chestSize}</p>
        <br />
        Hip:<p>{hipSize}</p>
        <br />
        Waist:<p>{waistSize}</p>
        <br />
      </div>
      <div style={{ padding: "20px" }}>
        {gender === "male" && (
          <>
            {chestSize >= 32 && chestSize <= 49 && <h2>Shirt size:</h2>}
            {chestSize >= 32 && chestSize <= 34 && <p>XS</p>}
            {chestSize >= 35 && chestSize <= 37 && <p>S</p>}
            {chestSize >= 38 && chestSize <= 40 && <p>M</p>}
            {chestSize >= 41 && chestSize <= 43 && <p>L</p>}
            {chestSize >= 44 && chestSize <= 46 && <p>XL</p>}
            {chestSize >= 47 && chestSize <= 49 && <p>XXL</p>}
            <br />
            {waistSize >= 28 && waistSize <= 39 && <h2>Jeans size:</h2>}
            {waistSize >= 28 && waistSize <= 29 && <p>XS</p>}
            {waistSize >= 30 && waistSize <= 31 && <p>S</p>}
            {waistSize >= 32 && waistSize <= 33 && <p>M</p>}
            {waistSize >= 34 && waistSize <= 35 && <p>L</p>}
            {waistSize >= 36 && waistSize <= 37 && <p>XL</p>}
            {waistSize >= 38 && waistSize <= 39 && <p>XXL</p>}
          </>
        )}
        {gender === "female" && (
          <>
            {chestSize >= 32 && chestSize <= 49 ? (
              <h2>Shirt size:</h2>
            ) : (
              <h2>not matched</h2>
            )}
            {chestSize >= 32 && chestSize <= 33 && <p>XS</p>}
            {chestSize >= 34 && chestSize <= 35 && <p>S</p>}
            {chestSize >= 36 && chestSize <= 37 && <p>M</p>}
            {chestSize >= 38 && chestSize <= 39 && <p>L</p>}
            {chestSize >= 40 && chestSize <= 41 && <p>XL</p>}
            {chestSize >= 42 && chestSize <= 43 && <p>XXL</p>}
            <br />
            {waistSize >= 24 && waistSize <= 35 ? (
              <h2>Jeans size:</h2>
            ) : (
              <h2>not matched</h2>
            )}
            {waistSize >= 24 && waistSize <= 25 && <p>XS</p>}
            {waistSize >= 26 && waistSize <= 27 && <p>S</p>}
            {waistSize >= 28 && waistSize <= 29 && <p>M</p>}
            {waistSize >= 30 && waistSize <= 31 && <p>L</p>}
            {waistSize >= 32 && waistSize <= 33 && <p>XL</p>}
            {waistSize >= 34 && waistSize <= 35 && <p>XXL</p>}
            <br />
            <button
              className="size-btn"
              onClick={() => history.push(`/single-product/${pid}`)}>
              Back to product page
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default MeasurementResult;
