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

    let user = JSON.parse(localStorage.getItem('user'));
    const token = user['access'];

    useEffect(() => {
        const handleMessage = (data) => {
            console.log('Mensaje recibido desde WebSocket:', data);
            if (data.image) {
                const imageUrl = `data:image/jpeg;base64,${data.image}`;
                setImageSrc(imageUrl);
            }
            if (data.actS) {
                setActScore(data.actS);
            }
        };

        // Conecta el WebSocket y maneja mensajes
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
            {imageSrc ? (
                <img src={imageSrc} alt="Processed" className="w-full h-full object-contain" />
            ) : (
                <p>Cargando imagen...</p>
            )}
        </div>
    );
};

export default VideoCaptureComponent;

