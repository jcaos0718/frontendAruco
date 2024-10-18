import React, { useEffect, useRef, useState } from 'react';

const WebSocketComponent = ({ imageData }) => {
  const ws = useRef(null);
  const [processedImage, setProcessedImage] = useState(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/ws/image/');
    ws.current.onopen = () => console.log('WebSocket connected');
    ws.current.onclose = () => console.log('WebSocket disconnected');

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.processed_image) {
        setProcessedImage(data.processed_image); // Almacenar la imagen procesada
      }
    };

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (ws.current && imageData) {
      ws.current.send(JSON.stringify({ image: imageData }));
    }
  }, [imageData]);

  return (
    <div>
      <h3>Processed Image</h3>
      {processedImage && <img src={processedImage} alt="Processed" />}
    </div>
  );
};

export default WebSocketComponent;