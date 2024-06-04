import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/db/mongodb';
import Receta from '../../../../lib/db/models/Recetas';

// Asegúrate de importar o definir 'uri' correctamente
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('El URI de MongoDB no está definido. Asegúrate de que la variable de entorno MONGODB_URI esté configurada.');
}

export async function POST(request: Request) {
  try {
    await connectToDatabase(uri!);
    const body = await request.json();
    const newReceta = new Receta(body);
    await newReceta.save();
    return NextResponse.json({ message: 'Receta agregada exitosamente' }, { status: 201 });
  } catch (error) {
    console.error('Error al agregar receta:', error);
    return NextResponse.json({ message: 'Error al agregar receta' }, { status: 500 });
  }
}
