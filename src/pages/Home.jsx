// import { Link } from 'react-router-dom';
// import exampleImage from '/marker23.png'; // Asegúrate de importar la imagen
// import secondImage from '/Santa.jfif'; // Importa la segunda imagen

// const Home = () => {
//   return (
//     <div className="h-screen flex items-center justify-center space-x-8">
//       {/* Primer contenedor cuadrado */}
//       <div className="w-96 h-96 text-white flex flex-col items-center justify-center">
//         <h1 className="text-3xl font-bold mb-4 text-center">Descubre un mundo oculto</h1>
//         <p className="text-lg mb-6 text-center">
//           ¿Te atreves a embarcarte en una aventura única? Escanea los marcadores ARUCO y desbloquea un universo de realidad virtual lleno de sorpresas. ¡Cuantos más encuentres, más cerca estarás de la victoria! ¿Podrás desentrañar todos los misterios?
//         </p>
//         <Link to="/Signup">
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             Get Started
//           </button>
//         </Link>
//       </div>

//       {/* Segundo contenedor cuadrado con imagen */}
//         <div className="w-96 h-96 bg-gray-800 rounded-lg shadow-lg overflow-hidden image-container">
//       <img
//         src={exampleImage}
//         alt="Imagen de ejemplo"
//         className="image-slide image1"
//       />
//       <img
//         src={secondImage}
//         alt="Segunda Imagen"
//         className="image-slide image2"
//       />
//     </div>
//     </div>
//   );
// };

// export default Home;


import React from 'react'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
const Home = () => {
  return (
    <ParallaxProvider>

      <div className="relative z-20">
        {/* Hero Section */}
        <Parallax  className="h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 text-white">Welcome to Our Stunning World</h1>
            <p className="text-xl text-white">Scroll down to explore the magic</p>
          </div>
        </Parallax>

        {/* Content Section */}
        <div className="py-20">
          <Parallax  className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-semibold mb-6 text-white">About Our Journey</h2>
            <p className="text-lg mb-6 text-white">
              Embark on an extraordinary adventure through our digital landscape.
              Here, innovation meets creativity, and every scroll reveals a new wonder.
              Our world is designed to captivate, inspire, and transform your online experience.
            </p>
            <Parallax  className="mb-6">
              <img
                src="/placeholder.svg?height=300&width=600"
                alt="Our Journey"
                className="w-full rounded-lg shadow-lg"
              />
            </Parallax>
            <p className="text-lg text-white">
              As you explore further, you'll discover the perfect blend of technology and artistry.
              Our team of visionaries has crafted each element to ensure a seamless, engaging journey
              through our digital realm. Prepare to be amazed at every turn!
            </p>
          </Parallax>
        </div>

      </div>

      <div className="relative z-20">
        {/* Hero Section */}
        <Parallax  className="h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 text-white">Welcome to Our Stunning World</h1>
            <p className="text-xl text-white">Scroll down to explore the magic</p>
          </div>
        </Parallax>

        {/* Content Section */}
        <div className="py-20">
          <Parallax  className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-semibold mb-6 text-white">About Our Journey</h2>
            <p className="text-lg mb-6 text-white">
              Embark on an extraordinary adventure through our digital landscape.
              Here, innovation meets creativity, and every scroll reveals a new wonder.
              Our world is designed to captivate, inspire, and transform your online experience.
            </p>
            <Parallax  className="mb-6">
              <img
                src="/placeholder.svg?height=300&width=600"
                alt="Our Journey"
                className="w-full rounded-lg shadow-lg"
              />
            </Parallax>
            <p className="text-lg text-white">
              As you explore further, you'll discover the perfect blend of technology and artistry.
              Our team of visionaries has crafted each element to ensure a seamless, engaging journey
              through our digital realm. Prepare to be amazed at every turn!
            </p>
          </Parallax>
        </div>

      </div>

      <div className="relative z-20">
        {/* Hero Section */}
        <Parallax className="h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 text-white">Welcome to Our Stunning World</h1>
            <p className="text-xl text-white">Scroll down to explore the magic</p>
          </div>
        </Parallax>

        {/* Content Section */}
        <div className="py-20">
          <Parallax className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-semibold mb-6 text-white">About Our Journey</h2>
            <p className="text-lg mb-6 text-white">
              Embark on an extraordinary adventure through our digital landscape.
              Here, innovation meets creativity, and every scroll reveals a new wonder.
              Our world is designed to captivate, inspire, and transform your online experience.
            </p>
            <Parallax  className="mb-6">
              <img
                src="/placeholder.svg?height=300&width=600"
                alt="Our Journey"
                className="w-full rounded-lg shadow-lg"
              />
            </Parallax>
            <p className="text-lg text-white">
              As you explore further, you'll discover the perfect blend of technology and artistry.
              Our team of visionaries has crafted each element to ensure a seamless, engaging journey
              through our digital realm. Prepare to be amazed at every turn!
            </p>
          </Parallax>
        </div>

      </div>

      <div className="relative z-20">
        {/* Hero Section */}
        <Parallax  className="h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 text-white">Welcome to Our Stunning World</h1>
            <p className="text-xl text-white">Scroll down to explore the magic</p>
          </div>
        </Parallax>

        {/* Content Section */}
        <div className="py-20">
          <Parallax  className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-semibold mb-6 text-white">About Our Journey</h2>
            <p className="text-lg mb-6 text-white">
              Embark on an extraordinary adventure through our digital landscape.
              Here, innovation meets creativity, and every scroll reveals a new wonder.
              Our world is designed to captivate, inspire, and transform your online experience.
            </p>
            <Parallax  className="mb-6">
              <img
                src="/placeholder.svg?height=300&width=600"
                alt="Our Journey"
                className="w-full rounded-lg shadow-lg"
              />
            </Parallax>
            <p className="text-lg text-white">
              As you explore further, you'll discover the perfect blend of technology and artistry.
              Our team of visionaries has crafted each element to ensure a seamless, engaging journey
              through our digital realm. Prepare to be amazed at every turn!
            </p>
          </Parallax>
        </div>

      </div>
    </ParallaxProvider>


  )
}

export default Home