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


import React, { useEffect, useState, useRef } from 'react';
import { connectWebSocket } from '../services/websocketService';
import useStore from './Store';

const VideoCaptureComponent = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const { setActScore } = useStore();
    const socketRef = useRef(null);
    const videoRef = useRef(null); // Para referencia del video
    const [isSocketOpen, setIsSocketOpen] = useState(false); // Estado para controlar si el WebSocket está abierto

    let user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user['access'] : null;

    useEffect(() => {
        const handleMessage = (data) => {
            console.log('Mensaje recibido desde WebSocket:', data);
            if (data && typeof data === 'object') {
                if (data.image) {
                    const imageUrl = `data:image/jpeg;base64,${data.image}`;
                    setImageSrc(imageUrl);
                } else {
                    console.warn('No se encontró la propiedad "image" en el mensaje:', data);
                }

                if (data.actS !== undefined) {
                    setActScore(data.actS);
                }
            } else {
                console.error('El mensaje recibido no es un objeto válido:', data);
            }
        };

        // Conectar el WebSocket y manejar mensajes
        const socket = connectWebSocket(handleMessage, setActScore, token);
        socketRef.current = socket;

        // Manejar el evento onopen para saber cuándo el WebSocket está listo
        socket.onopen = () => {
            console.log('WebSocket connection established');
            setIsSocketOpen(true); // Actualizar el estado del socket a abierto
            if (token) {
                socket.send(JSON.stringify({ token: token })); // Enviar el token al establecer la conexión
            }
        };

        // Manejar el evento onclose
        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
            setIsSocketOpen(false); // Actualizar el estado del socket a cerrado
        };

        // Iniciar la cámara y enviar imágenes
        const intervalId = setInterval(() => {
            if (videoRef.current && socketRef.current && isSocketOpen) { // Verifica que el socket esté abierto
                const canvas = document.createElement('canvas');
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(videoRef.current, 0, 0);
                const imageData = canvas.toDataURL('image/jpeg');
                const base64Data = imageData.split(',')[1]; // Extraer la parte base64
                
                // Enviar la imagen solo si el socket está abierto
                socket.send(JSON.stringify({ image: base64Data }));
            }
        }, 1000); // Enviar cada segundo

        // Limpia la conexión al desmontar el componente
        return () => {
            clearInterval(intervalId);
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [token, setActScore]);

    return (
        <div>
            <video ref={videoRef} id="video" autoPlay style={{ display: 'none' }} />
            {imageSrc && <img src={imageSrc} alt="Imagen del WebSocket" />}
        </div>
    );
};

export default VideoCaptureComponent;
