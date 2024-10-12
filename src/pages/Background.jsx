// import { useRef } from 'react';
// import moon from '/moon.png';
// import land from '/land.png';
// import cat from '/cat.gif';

// import nieve from '/NieveFondo.svg';
// import arbol from '/fondo0.png';

// import { Parallax, ParallaxLayer } from '@react-spring/parallax';
// import ParticleBackground from '../components/ParticleBackground';

// function Home2() {
//   const ref = useRef();

//   return (
 
 
      
//       <Parallax pages={3} ref={ref}>
    
//         <ParallaxLayer
        
//           offset={0}
//           speed={1}
//           factor={5}
//           style={{
//             backgroundImage: `url(${nieve})`,
//             backgroundSize: 'cover',
//             backgroundAttachment: 'fixed',
//             zIndex: -1,
//           }}
//         >
          
//         </ParallaxLayer>

//         <ParallaxLayer
//           offset={1.99}
//           speed={1}
//           factor={2.1}
//           style={{
//             backgroundImage: `url(${arbol})`,
//             backgroundSize: 'cover',
//             zIndex: -1,
//           }}
//         ></ParallaxLayer>

//         <ParallaxLayer
//           offset={0.2}
//           speed={0.05}
//           style={{ zIndex: 0 }}
//           onClick={() => ref.current.scrollTo(3)}
//         >
//           <h2>Welcome to my website</h2>
//         </ParallaxLayer>

//         <ParallaxLayer
//           offset={2}
//           speed={2}
//           style={{ zIndex: 0 }}
//           onClick={() => ref.current.scrollTo(0)}
//         >
//           <h2>Hi Mom!</h2>
//         </ParallaxLayer>
//       </Parallax>
   
//   );
// }

// export default Home2;

// import { useEffect, useState } from 'react';
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim";


// export default function Background() {
//   const [init, setInit] = useState(false);

//   useEffect(() => {
//     initParticlesEngine(async (engine) => {
//       await loadSlim(engine);
//     }).then(() => {
//       setInit(true);
//     });
//   }, []);

//   const particlesOptions = {
//     background: {
//       color: {
//         value: "transparent",
//       },
//     },
//     fpsLimit: 120,
//     interactivity: {
//       events: {
//         onClick: {
//           enable: true,
//           mode: "push",
//         },
//         onHover: {
//           enable: true,
//           mode: "repulse",
//         },
//       },
//       modes: {
//         push: {
//           quantity: 4,
//         },
//         repulse: {
//           distance: 200,
//           duration: 0.4,
//         },
//       },
//     },
//     particles: {
//       color: {
//         value: "#ffffff",
//       },
//       links: {
//         color: "#ffffff",
//         distance: 150,
//         enable: true,
//         opacity: 0.5,
//         width: 1,
//       },
//       move: {
//         direction: "none",
//         enable: true,
//         outModes: {
//           default: "bounce",
//         },
//         random: false,
//         speed: 2,
//         straight: false,
//       },
//       number: {
//         density: {
//           enable: true,
//           area: 800,
//         },
//         value: 80,
//       },
//       opacity: {
//         value: 0.5,
//       },
//       shape: {
//         type: "circle",
//       },
//       size: {
//         value: { min: 1, max: 5 },
//       },
//     },
//     detectRetina: true,
//   };

//   return (
//     <div className="absolute inset-0 z-0">
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: "url('/NieveFondo.jpg')",
//           filter: "brightness(0.7)"
//         }}
//       ></div>

//       <div 
//         className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
//         style={{
//           backgroundImage: "url('/fondo0.png')",
//           filter: "brightness(0.7)"
//         }}
//       ></div>

//       {init && (
//         <Particles
//           id="tsparticles"
//           options={particlesOptions}
//           className="absolute inset-0"
//         />
//       )}
//     </div>
//   );
// }
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from 'react';

export default function Background() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = {
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
            value: "#ffffff", 
        },
        move: {
            direction: "bottom", 
            enable: true,
            outModes: {
                default: "out", 
            },
            random: false,
            speed: 1, 
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 100, 
        },
        opacity: {
            value: 0.8, 
        },
        shape: {
            type: "circle", 
        },
        size: {
            value: { min: 2, max: 10 }, 
        },
    },
    detectRetina: true,
}

  return (
    <Parallax pages={1} className="relative w-full h-full">
      {/* Background Layers */}
      <ParallaxLayer
        offset={0}
        speed={0}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/NieveFondo.jpg')", 
          backgroundSize: 'cover',
          filter: 'brightness(0.7)',
        }}
      />

      <ParallaxLayer
        offset={0}
        speed={0.5}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/fondo0.png')", 
          backgroundSize: 'auto',
          backgroundPosition: 'bottom',
          filter: 'brightness(0.7)',
        }}
      />

      {/* Particles */}
     
        <ParallaxLayer
          offset={0}
          speed={0}
          className="absolute inset-0 w-full h-full"
        >
          <Particles
            id="tsparticles"
            options={particlesOptions}
            className="absolute inset-0 w-full h-full"
          />
        </ParallaxLayer>
      
    </Parallax>
  );
}
