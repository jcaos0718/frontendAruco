import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import React from 'react';
import fondo2 from '/fondo2.png';
import fondo1 from '/fondo1.png';
import fondo0 from '/fondo0.png';

const Home3 = () => {
    return (
        <Parallax pages={2}>
            {/* Fondo más bajo */}
            <ParallaxLayer
                offset={0}
                speed={0.3}
                style={{
                    backgroundImage: `url(${fondo0})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                    height: '100vh',
                    width: '100%',
                    zIndex: 1,
                }}
            />

            {/* Fondo intermedio */}
            <ParallaxLayer
                offset={0.5}
                speed={0.35}
                style={{
                    backgroundImage: `url(${fondo1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                    height: '100vh',
                    width: '100%',
                    zIndex: 2,
                }}
            />

            {/* Fondo más alto */}
            <ParallaxLayer
                offset={1}
                speed={0.4}
                style={{
                    backgroundImage: `url(${fondo2})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                    height: '100vh',
                    width: '100%',
                    zIndex: 3,
                }}
            />
        </Parallax>
    );
}

export default Home3;
