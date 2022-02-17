import React, { useRef, useState } from "react";

export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [camera, setCamera] = useState(false);
  const [btnLable, setBtnLable] = useState("START CAMERA");
  const width = 720;
  const height = 526;

  const photo = () => {
    if (!camera) {
      streamCamVideo();
      setBtnLable("MAKE PHOTO");
    } else {
      handleMakePhoto();
      setBtnLable("START CAMERA");
    }
    setCamera(!camera);
  };

  const streamCamVideo = () => {
    var constraints = { audio: false, video: { width: width, height: height } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = (e) => {
          videoRef.current.play();
        };
      })
      .catch((err) => {
        console.log(err.name + ": " + err.message);
        console.log(err.message);
      });
  };

  const handleMakePhoto = () => {
    navigator.getMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    navigator.getMedia(
      { video: true },
      () => {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        canvasRef.current.getContext("2d").drawImage(videoRef.current, 0, 0);
        let travelerPhoto = canvasRef.current.toDataURL("image/jpeg");
        console.log(travelerPhoto);
      },
      () => {
        console.log("No Permissions");
      }
    );
  };

  return (
    <div>
      <button id="start-camera" onClick={photo}>
        {btnLable}
      </button>
      <br />
      <canvas
        id="canvas"
        max-width={width}
        max-height={height}
        ref={canvasRef}
        style={camera ? { display: "none" } : {}}
      />
      <video
        id="video"
        width="320"
        height="240"
        autoPlay
        ref={videoRef}
        style={!camera ? { display: "none" } : {}}
      ></video>
    </div>
  );
}
