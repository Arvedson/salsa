// /app/api/receta/postrecetas/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/db/mongodb';
import Receta from '../../../../lib/db/models/Recetas';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const newReceta = new Receta(body);
    await newReceta.save();
    return NextResponse.json({ message: 'Receta agregada exitosamente' }, { status: 201 });
  } catch (error) {
    console.error('Error al agregar receta:', error);
    return NextResponse.json({ message: 'Error al agregar receta' }, { status: 500 });
  }
}
