// export const connectWebSocket = () => {
//     const socket = new WebSocket('ws://localhost:8000/ws/video/');

//     socket.onopen = () => {
//         console.log('WebSocket connection established');
//     };

//     socket.onmessage = (event) => {
//         console.log('Message from server', event.data);
//     };

//     socket.onclose = (event) => {
//         if (event.wasClean) {
//             console.log('WebSocket connection closed cleanly');
//         } else {
//             console.error('WebSocket connection died');
//         }
//     };

//     socket.onerror = (error) => {
//         console.error('WebSocket error:', error);
//     };

//     return socket;
// };

// export const connectWebSocket = (setProcessedImage, setActScore, token) => {
//     //const socket = new WebSocket('ws://localhost:8000/ws/camera/');
//     const socket = new WebSocket('wss://backendaruco-bakn.onrender.com/ws/camera/');
//     socket.onopen = () => {
//         console.log('WebSocket connection established');
//         // Enviar el token inmediatamente después de conectar
//         socket.send(JSON.stringify({ token: token }));
//     };

//     socket.onmessage = (event) => {
//         try {
//             // Parse the incoming JSON data
//             const data = JSON.parse(event.data);

//             // Extract image and score
//             const processedImage = data.image;
//             const actScore = data.actS;

//             // Set the state with the received data
//             setProcessedImage(processedImage);
//             setActScore(actScore);
//             if (actScore===1){

//                 console.log(actScore)
//             }
        

//             // Optionally, you can also handle the image in an <img> tag or canvas
//             // For example, you could use a base64 image source for an <img> tag
//             // const imageUrl = `data:image/jpeg;base64,${processedImage}`;
//             // document.getElementById('yourImageId').src = imageUrl;
//         } catch (error) {
//             console.error('Error parsing WebSocket message:', error);
//         }
//     };

//     socket.onclose = (event) => {
//         if (event.wasClean) {
//             console.log('WebSocket connection closed cleanly');
//         } else {
//             console.error('WebSocket connection died');
//         }
//     };

//     socket.onerror = (error) => {
//         console.error('WebSocket error:', error);
//     };

//     return socket;
// };

// export const connectWebSocket = (setProcessedImage, setActScore, token) => {
//     const socket = new WebSocket('wss://backendaruco-bakn.onrender.com/ws/camera/');

//     socket.onopen = () => {
//         console.log('WebSocket connection established');

//         // Asegúrate de que el token esté definido antes de enviarlo
//         if (token) {
//             socket.send(JSON.stringify({ token: token }));
//         } else {
//             console.error('Token no definido, no se puede enviar');
//         }
//     };

//     socket.onmessage = (event) => {
//         try {
//             // Parse the incoming JSON data
//             const data = JSON.parse(event.data);

//             // Extract image and score
//             const processedImage = data.image;
//             const actScore = data.actS;

//             // Set the state with the received data
//             setProcessedImage(processedImage);
//             setActScore(actScore);
            
//             if (actScore === 1) {
//                 console.log('Score actualizado:', actScore);
//             }

//             // Opcional: manejar la imagen en una etiqueta <img> o en un canvas
//             // const imageUrl = `data:image/jpeg;base64,${processedImage}`;
//             // document.getElementById('yourImageId').src = imageUrl;

//         } catch (error) {
//             console.error('Error parsing WebSocket message:', error);
//         }
//     };

//     socket.onerror = (event) => {
//         console.error('WebSocket error observed:', event);
//     };

//     socket.onclose = (event) => {
//         if (event.wasClean) {
//             console.log('WebSocket connection closed cleanly');
//         } else {
//             console.error('WebSocket connection died');
//         }
//     };

//     return socket;
// };

// Función para conectar el WebSocket


export const connectWebSocket = (handleMessage, setActScore, token) => {
    const socket = new WebSocket('wss://backendaruco-bakn.onrender.com/ws/camera/');

    socket.onopen = () => {
        console.log('WebSocket connection established');
        if (token) {
            socket.send(JSON.stringify({ token }));
        } else {
            console.error('Token no definido, no se puede enviar');
        }
        startCamera();
    };

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log(data);
            handleMessage(data);
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    };

    socket.onclose = (event) => {
        if (event.wasClean) {
            console.log('Connection closed cleanly');
        } else {
            console.error('Connection error');
        }
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    return socket;
};

export const handleMessage = (data) => {
    if (data.image) {
        setImageSrc(`data:image/jpeg;base64,${data.image}`);
    }

    if (data.actS) {
        setActScore(data.actS);
    }
};

export const startCamera = () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
            setInterval(() => {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const frame = context.getImageData(0, 0, canvas.width, canvas.height);
                // Enviar el frame a través del WebSocket
            }, 100);
        })
        .catch((error) => {
            console.error('Error accessing the camera:', error);
        });
};
