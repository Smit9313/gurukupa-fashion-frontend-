import React, { useState, useEffect, useRef, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import html2canvas from "html2canvas";
import { isEmpty } from "lodash";
import "../Style/bodymeasurements.css";
import Navbar from "../components/navbar/Navbar";
import { Toaster, toast } from "react-hot-toast";
import ReactCanvasConfetti from "react-canvas-confetti";
import axios from "axios";
import GLBLoader from "../components/GLBLoader";
import ClipLoader from "react-spinners/ClipLoader";

const ENDPOINT = "http://localhost:8000"; // change to your Socket.io server URL
const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

function BodyMeasurements({ height, weight, gender }) {
  const history = useHistory();
  // console.log(pro_id)

  const [stream, setStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [ss, setSs] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef();
  const refAnimationInstance = useRef(null);
  const [loading, setLoading] = useState(true);
  const [bdata, setBdata] = useState();
  const [tmp, setTmp] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);
  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  const constraints = {
    audio: false,
    video: {
      // width: { ideal: 1920 },
      // height: { ideal: 1080 },
      facingMode: "environment",
    },
  };

  function draw() {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    // Draw the live video on the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // ctx.font = "30px Arial";
    // ctx.fillStyle = "green";
    // ctx.fillText("Hello...", 50, 50);

    // Draw additional graphics based on conditions

    // Call the draw function again after a short delay
    setTimeout(draw, 10);
  }

  useEffect(() => {
    // establish Socket.io connection
    // const socket = socketIOClient(ENDPOINT);
    // setSocket(socket);

    if (cameraOn) {
      // get access to camera and stream video
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          setStream(stream);
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          // console.log(stream);
          const options = {
            mimeType: "video/webm;codecs=vp9",
            videoBitsPerSecond: 128000,
            width: 640,
            height: 480,
          };
          const recorder = new MediaRecorder(stream,options);
          setMediaRecorder(recorder);
        })
        .catch((error) => console.log("Error getting user media:", error));

      // cleanup function
      // return () => {
      //   socket.disconnect();
      //   console.log(stream);
      //   stream.getTracks().forEach((track) => track.stop());
      // };
      draw();
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        setMediaRecorder(null);
      }
    }

    
  }, [cameraOn]);

  useEffect(() => {
    // if (socket) {
    //   socket.on("object_detected", () => {
    //     setIsDetecting(true);
    //   });
    // }
  }, [socket]);

  const handleVideoFrame = () => {
    if (isDetecting) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textBaseline = "top";

      context.fillText("Hello, World!", 10, 10);

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.5);
      socket.emit("video_frame", dataUrl);
      setIsDetecting(false);
    }
  };

  function dataURItoBlob(dataURI, fileName) {
    // Convert the data URI to a binary buffer
    const binary = atob(dataURI.split(",")[1]);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      buffer[i] = binary.charCodeAt(i);
    }

    // Create a new Blob object from the buffer with the correct MIME type
    const blob = new Blob([buffer], { type: "image/png" });
    blob.name = fileName;

    // Set the originFileObj property to the new Blob object
    blob.originFileObj = blob;

    // Return the new Blob object
    return blob;
  }

  const handleScreenshot = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext("2d");

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const screenshot = await html2canvas(videoRef.current);
    console.log(screenshot);
    const dataURL = canvas.toDataURL("image/png");
    console.log(dataURL);
    const img = new Image();
    img.src = dataURL;
    console.log(ss.length);
    if (ss.length < 2) {
      setSs([...ss, dataURL]);
      toast.success("Clicked", {
        duration: 3000,
      });
      setIsExploding(true);
    } else {
      toast.error("Something wrong!", {
        duration: 3000,
      });
    }
    console.log(ss);

    if (ss.length === 1) {
      setLoading(true);
      setTmp(false);
      setCameraOn(false);
      // fire();
      console.log("valid");
      console.log(height, weight, gender);
      console.log(ss);

      const formData = new FormData();

      const fileName0 = "my-image0.png";
      const fileName1 = "my-image1.png";
      const file0 = dataURItoBlob(ss[0], fileName0);
      const file1 = dataURItoBlob(dataURL, fileName1);
      console.log(file0);

      formData.append(fileName0, file0.originFileObj, file0?.name);
      formData.append(fileName1, file1.originFileObj, file1?.name);

      formData.append("gender", gender);
      formData.append("height", height);
      formData.append("weight", weight);

      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        axios
          .post(`${process.env.REACT_APP_API_HOST}/measure/`, formData, {
            headers,
          })
          .then((response) => {
            console.log(response);

            if (response.data.message === "Success!") {
              setBdata(response.data.data);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {}
    }
  };

  return (
    <>
      <Navbar />
      {tmp && (
        <div className="canvas-class-canvas">
          <video
            style={{ borderRadius: "5px" }}
            ref={videoRef}
            width="100%"
            height="600"
            autoPlay
            onPlay={handleVideoFrame}
          />
          <div style={{ width: "100%" }}>
            <canvas
              ref={canvasRef}
              style={{ width: "100%", height: "500px", display: "none" }}
              width="100%"
              height="100%"
            />
          </div>
          <div style={{ marginTop: "30px", marginLeft: "170px" }}>
            <button className="button-300" onClick={handleScreenshot}></button>
            {/* <button className="button-300" onClick={()=>{
            // history.push('');
          }}>
            model
          </button> */}
          </div>
          {/* {!isEmpty(ss) && <img src={ss} />} */}
        </div>
      )}
      {!loading && (
        <>
          <GLBLoader url={bdata.model_url} />
          <div style={{ padding: "30px" }}>
            <p>Chest : {bdata.measurement_results["chest"].toFixed(2)}</p>
            <p>Hip : {bdata.measurement_results["hip"].toFixed(2)}</p>
            <p>Waist : {bdata.measurement_results["waist"].toFixed(2)}</p>
          </div>
        </>
      )}
      {loading && !tmp && (
        <>
          <div className="loader-spin">
            <ClipLoader color="#000" />
          </div>
        </>
      )}

      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
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

export default BodyMeasurements;
