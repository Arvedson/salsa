"use client"
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider'; 
import { Button } from '@/components/ui/button'; 
import { Ingredientfocus } from './Ingredientefocus';
import { Progress } from "@/components/ui/progress"


const Ingredientselector = () => {
  return (
    <div className="flex flex-col  ">


            <h1 className="scroll-m-12 border-b text-4xl font-extrabold tracking-tight lg:text-5xl">
             Elije tus ingredientes
            </h1>
            

            
            <h2 className="mb-6 mt-6  scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Aqui se pone una descripcion del ingrediente en display 
            </h2>

        <Ingredientfocus/>


        <Slider className='mt-6'/>
        
        <Button className="mt-6">Eligir ingrediente</Button>



        

    </div>
    
  );
};

export default Ingredientselector;

