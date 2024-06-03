import { NextResponse } from 'next/server';
import { allowedCategorias, allowedTexturas, allowedSabores } from '../../../../lib/db/models/Ingrediente';

export async function GET() {
  return NextResponse.json({
    categorias: allowedCategorias,
    texturas: allowedTexturas,
    sabores: allowedSabores
  });
}
