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
    const [actScore, setActScore] = useState(0);
    const [socket, setSocket] = useState(null);
    let user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const token = user['access'];
        const newSocket = connectWebSocket(token, handleMessage);
        setSocket(newSocket);

        // Limpiar cuando el componente se desmonte
        return () => {
            if (newSocket) {
                newSocket.close();
            }
        };
    }, []);

    const connectWebSocket = (token, handleMessage) => {
        const socket = new WebSocket('wss://backendaruco-bakn.onrender.com/ws/camera/');

        socket.onopen = () => {
            console.log('WebSocket connection established');
            if (token) {
                socket.send(JSON.stringify({ token }));
                startCamera();
            } else {
                console.error('Token no definido, no se puede enviar');
            }
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                handleMessage(data); // Llama a handleMessage aquí
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        socket.onclose = (event) => {
            if (event.wasClean) {
                console.log('WebSocket connection closed cleanly');
            } else {
                console.error('WebSocket connection closed unexpectedly');
                setTimeout(() => connectWebSocket(token, handleMessage), 5000);
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return socket;
    };

    const handleMessage = (data) => {
        if (data.image) {
            setImageSrc(`data:image/jpeg;base64,${data.image}`);
        }

        if (data.actS) {
            setActScore(data.actS);
        }
    };

    const startCamera = () => {
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
                setInterval(() => {
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const frame = canvas.toDataURL('image/jpeg');
                    sendFrameToWebSocket(frame);
                }, 100);
            })
            .catch((error) => {
                console.error('Error accessing the camera:', error);
            });
    };

    const sendFrameToWebSocket = (frame) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ frame }));
        } else {
            console.warn('WebSocket is not open. Cannot send frame.');
        }
    };

    return (
        <div>
            <video id="video" width="640" height="480" autoPlay></video>
            <canvas id="canvas" width="640" height="480" style={{ display: 'none' }}></canvas>
            {imageSrc && <img src={imageSrc} alt="Received from WebSocket" />}
            <div>Score: {actScore}</div>
        </div>
    );
};

export default VideoCaptureComponent;


