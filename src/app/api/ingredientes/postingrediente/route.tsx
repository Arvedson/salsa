import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/db/mongodb';
import Ingrediente from '../../../../lib/db/models/Ingrediente';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { nombre, categoria, sabor, textura, solidos, agua, costo, compatibilidad, picor } = await req.json();
    
    const compatibilidadArray = compatibilidad.split(/[,\s]+/).filter(Boolean);

    const picorNumber = parseInt(picor, 10);

    if (!nombre || !categoria || !sabor || !textura || solidos == null || agua == null || costo == null) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    const nuevoIngrediente = new Ingrediente({
      nombre,
      categoria,
      sabor,
      textura,
      compatibilidad: compatibilidadArray, 
      picor: isNaN(picorNumber) ? null : picorNumber, 
      solidos,
      agua,
      costo,
    });

    await nuevoIngrediente.save();

    return NextResponse.json({ message: 'Ingrediente agregado con éxito' }, { status: 201 });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
  }
}
