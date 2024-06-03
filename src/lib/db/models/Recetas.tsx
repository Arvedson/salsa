import mongoose, { Document, Schema, Model, models } from 'mongoose';

export interface IReceta extends Document {
  nombre: string;
  tipo: string;
  origen: string;
  nivelDePicante: string;
  uso: string;
  textura: string;
  ingredientes: {
    ingrediente: string;
    cantidad: number;
    categoria: string;
  }[];
}

const allowedTipos = ['Salsa Roja', 'Salsa Verde', 'Salsa de Chiles', 'Salsa Cremosa', 'Salsa de Frutas'];
const allowedNivelDePicante = ['Suave', 'Medio', 'Picante'];
const allowedUsos = ['Tacos', 'Mariscos', 'Carnes', 'Botanera'];
const allowedTexturas = ['Líquida', 'Espesa', 'Chunky'];
const allowedCategorias = [
  'Vegetal',
  'Fruta',
  'Hierba',
  'Especias',
  'Chiles',
  'Lácteo',
  'Aceites y Grasas',
  'Otros'
];

const RecetaSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, enum: allowedTipos, required: true },
  origen: { type: String, required: true },
  nivelDePicante: { type: String, enum: allowedNivelDePicante, required: true },
  uso: { type: String, enum: allowedUsos, required: true },
  textura: { type: String, enum: allowedTexturas, required: true },
  ingredientes: [{
    ingrediente: { type: String, required: true },
    cantidad: { type: Number, required: true },
    categoria: { type: String, enum: allowedCategorias, required: true },
  }],
});

const Receta: Model<IReceta> = models.Receta || mongoose.model<IReceta>('Receta', RecetaSchema);
export { allowedTipos, allowedNivelDePicante, allowedUsos, allowedTexturas, allowedCategorias };
export default Receta;
