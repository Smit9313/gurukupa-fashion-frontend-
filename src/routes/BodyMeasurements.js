import React, { useState, useEffect, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import html2canvas from "html2canvas";
import { isEmpty } from "lodash";
import "../Style/bodymeasurements.css";
import Navbar from "../components/navbar/Navbar";
import { Toaster, toast } from "react-hot-toast";
import ReactCanvasConfetti from "react-canvas-confetti";

const ENDPOINT = "http://localhost:8000"; // change to your Socket.io server URL
const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

function BodyMeasurements({hight,weight,gender}) {

  const history = useHistory();

  const [stream, setStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [ss, setSs] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef();
  const refAnimationInstance = useRef(null);

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
    ctx.fillText("Hello...", 50, 50);

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
    canvas.width = 400;
    canvas.height = 400;
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
  };

  if(ss.length === 2){
    // fire();
    console.log("valid");
    console.log(hight,weight,gender)
  }

  return (
    <>
      <Navbar />
      <div className="canvas-class-canvas">
        <video
          style={{ borderRadius: "20px", display: "none" }}
          ref={videoRef}
          autoPlay
          onPlay={handleVideoFrame}
        />
        <div>
          <canvas
            style={{ borderRadius: "20px" }}
            ref={canvasRef}
            width="400"
            height="590"
          />
        </div>
        <div>
          <button className="button-300" onClick={handleScreenshot}>
            Click
          </button>
          <button className="button-300" onClick={()=>{
            // history.push('');
          }}>
            model
          </button>
        </div>

        {/* {!isEmpty(ss) && <img src={ss} />} */}
      </div>

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
