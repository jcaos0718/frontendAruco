import React, { useRef, useEffect } from 'react';

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    startCamera();
  }, []);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
      onCapture(imageData); // Enviar la imagen capturada al backend
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      captureImage();
    }, 1000); // Captura una imagen cada segundo

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline width="640" height="480" />
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
    </div>
  );
};

export default CameraCapture;