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
    const [imageSrc, setImageSrc] = useState(null);  // Estado para almacenar la imagen procesada
    const { setActScore } = useStore();  // Usa el estado global para manejar el score
    const socketRef = useRef(null);

    // Obtener el token del usuario almacenado en localStorage
    let user = JSON.parse(localStorage.getItem('user'));
    const token = user['access'];

    useEffect(() => {
        // Manejar los mensajes recibidos a través del WebSocket
        const handleMessage = (data) => {
            console.log('Mensaje recibido desde WebSocket:', data);
            if (data && typeof data === 'object') {
                if (data.image) {
                    // Si la propiedad "image" está presente, se crea la URL base64 para mostrarla
                    const imageUrl = `data:image/jpeg;base64,${data.image}`;
                    setImageSrc(imageUrl);  // Actualiza el estado con la imagen procesada
                } else {
                    console.warn('No se encontró la propiedad "image" en el mensaje:', data);
                }

                if (data.actS !== undefined) {
                    setActScore(data.actS);  // Actualiza el score si está presente
                }
            } else {
                console.error('El mensaje recibido no es un objeto válido:', data);
            }
        };

        // Conecta el WebSocket y maneja los mensajes
        const socket = connectWebSocket(handleMessage, setActScore, token);
        socketRef.current = socket;

        // Limpia la conexión al desmontar el componente
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [token, setActScore]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <video id="video" className="hidden"></video> {/* Elemento <video> oculto para capturar la cámara */}
            {imageSrc ? (
                <img src={imageSrc} alt="Processed" className="w-full h-full object-contain" />
            ) : (
                <p>Cargando imagen...</p>
            )}
        </div>
    );
};

export default VideoCaptureComponent;
