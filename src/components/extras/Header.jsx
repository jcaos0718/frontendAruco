import React from 'react';
import logo from '/Logo.png'; // Asegúrate de importar tu imagen del logo

function Header() {
  return (
    <div className="relative h-24 w-full bg-black flex items-center justify-between px-8">
      {/* Contenedor de los enlaces */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex space-x-8">
          <a href="#home" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="#about" className="text-white hover:text-gray-300">
            About Us
          </a>
        </div>
      </div>

      {/* Logo */}
      <img
        src={logo}
        alt="Logo de mi página"
        className="absolute w-180 h-40 top-[90%] left-[45%] transform -translate-y-1/2"
      />

      {/* Contenedor de inicio de sesión */}
      <div className="flex-1 flex items-center justify-end">
        <a href="#login" className="text-white hover:text-gray-300 mr-80"> {/* Ajusta el margen derecho para mover el enlace a la izquierda */}
          Log In
        </a>
      </div>
    </div>
  );
}

export default Header;

