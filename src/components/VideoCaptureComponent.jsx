// import React, { useEffect, useRef, useState } from 'react';
// import { connectWebSocket } from '../services/websocketService';
// import useStore from './Store';

// const VideoCaptureComponent = () => {
//     const [imageSrc, setImageSrc] = useState(null);
//     const { setActScore } = useStore();
//     const socketRef = useRef(null);

//     let user = JSON.parse(localStorage.getItem('user'));
//     const token = user['access'];

//     useEffect(() => {
//         const handleMessage = (data) => {
//             const imageUrl = `data:image/jpeg;base64,${data}`;
//             setImageSrc(imageUrl);
//         };

//         const socket = connectWebSocket(handleMessage, setActScore, token);
//         socketRef.current = socket;

//         return () => {
//             if (socketRef.current) {
//                 socketRef.current.close();
//             }
//         };
//     }, [token, setActScore]);

//     return (
//         <div className="w-full h-full flex items-center justify-center">
//             {imageSrc ? (
//                 <img src={imageSrc} alt="Processed" className="w-full h-full object-contain" />
//             ) : (
//                 <div className="text-white text-2xl">Waiting for video...</div>
//             )}
//         </div>
//     );
// };

// export default VideoCaptureComponent;

import React, { useEffect, useRef, useState } from 'react';
import { connectWebSocket } from '../services/websocketService';
import useStore from './Store';

const VideoCaptureComponent = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const { setActScore } = useStore();
    const socketRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    let user = JSON.parse(localStorage.getItem('user'));
    const token = user['access'];

    useEffect(() => {
        // Iniciar la cámara
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

        // Configurar WebSocket
        const handleMessage = (data) => {
            const imageUrl = `data:image/jpeg;base64,${data}`;
            setImageSrc(imageUrl);
        };

        const socket = connectWebSocket(handleMessage, setActScore, token);
        socketRef.current = socket;

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [token, setActScore]);

    const captureImage = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (canvas && video) {
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/jpeg');

            // Enviar la imagen capturada al backend vía WebSocket
            if (socketRef.current) {
                socketRef.current.send(JSON.stringify({ image: imageData }));
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            captureImage();
        }, 1000); // Captura una imagen cada segundo

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <video ref={videoRef} autoPlay playsInline className="hidden" width="640" height="480" />
            <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
            {imageSrc ? (
                <img src={imageSrc} alt="Processed" className="w-full h-full object-contain" />
            ) : (
                <div className="text-white text-2xl">Waiting for video...</div>
            )}
        </div>
    );
};

export default VideoCaptureComponent;
