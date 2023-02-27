import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import html2canvas from "html2canvas";
import { isEmpty } from "lodash";
import "../Style/bodymeasurements.css";
import Navbar from "../components/navbar/Navbar";
// import "./app.css";

const ENDPOINT = "http://localhost:8000"; // change to your Socket.io server URL

function BodyMeasurements() {
  const [stream, setStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [ss, setSs] = useState();
  const videoRef = useRef(null);
    const canvasRef = useRef();

  const constraints = {
    audio: false,
    video: {
      width: { ideal: 400 },
      height: { ideal: 812 },
    },
  };


  function draw() {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    // Draw the live video on the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    ctx.font = "30px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("hjhsjb", 50, 50);

    // Draw additional graphics based on conditions

    // Call the draw function again after a short delay
    setTimeout(draw, 10);
  }

  useEffect(() => {
    // establish Socket.io connection
    // const socket = socketIOClient(ENDPOINT);
    // setSocket(socket);

    // get access to camera and stream video
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setStream(stream);
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        // console.log(stream);
        const recorder = new MediaRecorder(stream);
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
  }, []);

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

  const handleScreenshot = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.clientWidth;
    canvas.height = videoRef.current.clientHeight;
    const context = canvas.getContext("2d");

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const screenshot = await html2canvas(videoRef.current);
    console.log(screenshot);
    const dataURL = canvas.toDataURL("image/png");
    const img = new Image();
    img.src = dataURL;
    setSs(dataURL);
  };

  return (
    <>
      <Navbar />
      <div className="canvas-class-canvas">
        <video
          style={{ borderRadius: "20px" }}
          ref={videoRef}
          autoPlay
          onPlay={handleVideoFrame}
        />
        <div>
          <canvas
            ref={canvasRef}
            width="490"
            height="690"
          />
        </div>
        <div>
          <button className="button-300" onClick={handleScreenshot}>
            Click
          </button>
        </div>

        {!isEmpty(ss) && <img src={ss} />}
      </div>
    </>
  );
}

export default BodyMeasurements;
