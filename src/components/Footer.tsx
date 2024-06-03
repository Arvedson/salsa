import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 flex flex-col sm:flex-row items-center justify-between">
      <div className="mb-4 sm:mb-0">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
          © 2024 Mi Sitio Web. Todos los derechos reservados.
        </p>
      </div>
      <div className="flex space-x-4">
        <a href="#" className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl hover:underline">Política de Privacidad</a>
        <a href="#" className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl hover:underline">Términos de Servicio</a>
        <a href="#" className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl hover:underline">Contacto</a>
      </div>
    </footer>
  );
}

export default Footer;
