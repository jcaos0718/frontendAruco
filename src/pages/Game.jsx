// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import VideoCaptureComponent from '../components/VideoCaptureComponent';
// import useStore from '../components/Store';

// const Game = () => {
//     const { user, logout,updateUserScore } = useAuth();
//     const { actScore,  setActScore } = useStore();
//     console.log(user)
//     const [currentScore, setCurrentScore] = useState(user.score); // Estado local para el puntaje del usuario

//     useEffect(() => {
//         const fetchUserScore = async () => {
//             try {
//                 const response = await fetch(`http://localhost:8000/api/auth/user/${user.username}/score`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                          'Authorization': `Bearer ${user.access}`, // Agrega el token si es necesario
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch user score');
//                 }

//                 const data = await response.json();
//                 // Actualiza el estado local con el puntaje obtenido
//                 setCurrentScore(data.score);

//                 // Actualiza el puntaje en el contexto si es necesario
//                 if (updateUserScore) {
//                     updateUserScore(data.score);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user score:', error);
//             } finally {
//                 // Marca la carga como completada
//                 setLoading(false);
//             }
//         };

//         fetchUserScore();
//     }, [user.username, user.token, updateUserScore]);

//     useEffect(() => {
//         if (actScore === 1) {
//             const fetchUserScore = async () => {
//                 try {
//                     const response = await fetch(`http://localhost:8000/api/auth/user/${user.username}/score`, {
//                         method: 'GET',
//                         headers: {
//                             'Content-Type': 'application/json',
//                              'Authorization': `Bearer ${user.access}`, // Agrega el token si es necesario
//                         },
//                     });

//                     if (!response.ok) {
//                         throw new Error('Failed to fetch user score');
//                     }

//                     const data = await response.json();
//                     // Actualiza el estado local con el puntaje obtenido
//                     console.log(data)
//                     setCurrentScore(data.score);
//                     setActScore(0);
//                 } catch (error) {
//                     console.error('Error fetching user score:', error);
//                 }
//             };

//             fetchUserScore();
//         }
//     }, [actScore, user.username, user.token]); // Dependencias: ejecuta el efecto cuando actScore, user.username o user.token cambian

//     const handleLogout = () => {
//         logout();
//     };

//     return (
//         <div className="flex flex-col mt-16 mb-8 items-center justify-center h-screen text-white p-4">
//             <div className="p-6 rounded-lg text-center items-center " >
//                 <h2 className="text-3xl font-bold mb-4">Start to play, {user.username}!</h2>


                
//                 <VideoCaptureComponent />
//                 <h2 className="text-3xl font-bold mb-4 mt-4">Search for aruco markers, Score: {currentScore}</h2>
//                 <button
//                     onClick={handleLogout}
//                     className="bg-red-500 hover:bg-red-700 text-white font-bold mt-4 py-2 px-4 rounded"
//                 >
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Game;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import VideoCaptureComponent from '../components/VideoCaptureComponent';
import useStore from '../components/Store';


const Game = () => {
    const { user, logout, updateUserScore } = useAuth();
    const { actScore, setActScore } = useStore();
    const [currentScore, setCurrentScore] = useState(user.score);

    useEffect(() => {
        const fetchUserScore = async () => {
            try {
                //const response = await fetch(`http://localhost:8000/api/auth/user/${user.username}/score`, {
                const response = await fetch(`https://backendaruco-bakn.onrender.com/api/auth/user/${user.username}/score`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.access}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user score');
                }

                const data = await response.json();
                setCurrentScore(data.score);

                if (updateUserScore) {
                    updateUserScore(data.score);
                }
            } catch (error) {
                console.error('Error fetching user score:', error);
            }
        };

        fetchUserScore();
    }, [user.username, user.access, updateUserScore]);

    useEffect(() => {
        if (actScore === 1) {
            fetchUserScore();
        }
    }, [actScore, user.username, user.access]);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="mt-16 relative w-full h-screen bg-cover bg-center" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
            <div className="absolute inset-0 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-center h-full text-white p-4">
                    <h2 className="text-4xl font-bold mb-4 text-blue-500">Start to play, {user.username}!</h2>

                    <div className="relative w-2.5/4 h-2.5/4 rounded-lg overflow-hidden mb-4">
                        <VideoCaptureComponent />
                        
                      
                        {/* Reindeer image */}
                        <div className="absolute  -bottom-4 left-1/2 transform translate-x-52 w-600 h-500 z-2">
                            <img
                                src="/Reindeer.png"
                                alt="Reindeer"
                                width={150}
                                height={150}
                                className="object-contain"
                            />
                        </div>
                    
                        
                        {/* Train image */}
                        <div className="absolute -bottom-8 -left-20 w-500 h-500 transform ">
                            <img
                                src="/tren.png"
                                alt="Train"
                               
                           
                            />
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-4">Search for aruco markers, Score: {currentScore}</h2>
                    
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full text-xl"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Game;