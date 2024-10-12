import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground= () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = useCallback((container) => {
        console.log(container);
    }, []);

    return (
        <>
            {init && (
                <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={{
                        // background: {
                        //     color: {
                        //         value: "#00274d", // Azul oscuro navideño
                        //     },
                        // },
                        
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: true,
                                    mode: "repulse",
                                },
                                resize: true,
                            },
                            modes: {
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: "#ffffff", // Color blanco para las bolas de nieve
                            },
                            move: {
                                direction: "bottom", // Las partículas se moverán hacia abajo
                                enable: true,
                                outModes: {
                                    default: "out", // Las partículas desaparecen al salir de la pantalla
                                },
                                random: false,
                                speed: 1, // Velocidad de caída más lenta
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 800,
                                },
                                value: 100, // Más partículas para una apariencia más nevada
                            },
                            opacity: {
                                value: 0.8, // Mayor opacidad para que las bolas de nieve sean más visibles
                            },
                            shape: {
                                type: "circle", // Las partículas son círculos
                            },
                            size: {
                                value: { min: 2, max: 10 }, // Tamaño de las bolas de nieve
                            },
                        },
                        detectRetina: true,
                    }}
                />
            )}
        </>
    );
};

export default ParticleBackground;

