import React from "react";
import { useHistory, useParams } from "react-router-dom";

function MeasurementResult() {
  const history = useHistory();
  const { pid, chest, hip, waist } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Measurement result</h1>
      <br />
      {/* <p>{pid}</p> */}
      {/* <br /> */}
      Chest:<p>{chest}</p>
      <br />
      Hip:<p>{hip}</p>
      <br />
      Waist:<p>{waist}</p>
      <br />
      <button onClick={() => history.push(`/single-product/${pid}`)}>Back to product page</button>
    </div>
  );
}

export default MeasurementResult;
