import React from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Ingredientselector from '@/components/Ingredientselector';



const Recetas: React.FC = () => {
    return (
        <div className="flex h-full">
            <MaxWidthWrapper>
                <div className="flex flex-col h-full"> {/* Usamos flex y flex-col para que el contenedor se expanda verticalmente */}
                    <Ingredientselector /> 
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default Recetas;
