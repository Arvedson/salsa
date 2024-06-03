
import React from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";


const Home: React.FC = () => {


  return (
    <div>
      <MaxWidthWrapper>
        <div>

          <div className='flex flex-col'>

          <h1 className="  scroll-m-20 pt-10 text-4xl font-extrabold tracking-tight lg:text-5xl">CREA TU PROPIA SALSA</h1>
          <h2 className="scroll-m-20  pt-6 text-3xl font-semibold tracking-tight first:mt-0"> Elige los ingredientes que quieras usando nuestra guia para hacerte cheff de salsas en un dia!</h2>
          <h3 className="scroll-m-20 pt-6 text-2xl font-semibold tracking-tight">Te enviamos una replica de tu receta deshidratada </h3>
          
          </div>

        </div>

      </MaxWidthWrapper>
    </div>
  );
};

export default Home;
