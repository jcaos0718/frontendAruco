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

export const connectWebSocket = (setProcessedImage, setActScore, token) => {
    const socketUrl = 'wss://backendaruco-bakn.onrender.com/ws/camera/';
    let socket = new WebSocket(socketUrl);

    const connect = () => {
        socket = new WebSocket(socketUrl);

        socket.onopen = () => {
            console.log('WebSocket connection established');
            // Enviar el token inmediatamente después de conectar
            socket.send(JSON.stringify({ token: token }));
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                // Extraer imagen procesada y puntaje
                const processedImage = data.image;
                const actScore = data.actS;

                // Actualizar el estado con los datos recibidos
                setProcessedImage(processedImage);
                setActScore(actScore);

                if (actScore === 1) {
                    console.log('Active Score:', actScore);
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        socket.onclose = (event) => {
            if (event.wasClean) {
                console.log('WebSocket connection closed cleanly');
            } else {
                console.error('WebSocket connection died, attempting to reconnect...');
                setTimeout(connect, 3000); // Intentar reconectar después de 3 segundos
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };

    // Iniciar la conexión WebSocket
    connect();

    return socket;
};
