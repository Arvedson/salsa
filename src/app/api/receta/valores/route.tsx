import { NextResponse } from 'next/server';
import { allowedTipos, allowedNivelDePicante, allowedUsos, allowedTexturas, allowedCategorias } from '../../../../lib/db/models/Recetas';

export async function GET() {
  return NextResponse.json({
    tipos: allowedTipos,
    nivelDePicante: allowedNivelDePicante,
    usos: allowedUsos,
    texturas: allowedTexturas,
    categorias: allowedCategorias
  });
}
