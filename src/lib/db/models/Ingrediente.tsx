import mongoose, { Document, Schema, Model, models } from 'mongoose';


export const allowedCategorias = ['Vegetal', 'Fruta', 'Hierba', 'Especias', 'Chiles', 'Lácteo', 'Aceites y Grasas', 'Otros'];
export const allowedTexturas = ['Líquido', 'Cremoso', 'Sólido', 'Fibroso'];
export const allowedSabores = ['Dulce', 'Salado', 'Ácido', 'Picante', 'Umami', 'Amargo', 'Agrio'];


export interface IIngrediente extends Document {
  
  nombre: string;
  categoria: string;
  sabor: string;
  textura: string;
  compatibilidad: string[];
  picor?: number | null;
  solidos: number;
  agua: number;
  costo: number;
}


const IngredienteSchema: Schema = new Schema({
  
  nombre: { type: String, required: true },
  categoria: { type: String, enum: allowedCategorias, required: true },
  sabor: { type: String, enum: allowedSabores, required: true },
  textura: { type: String, enum: allowedTexturas, required: true },
  compatibilidad: { type: [String], default: [] },
  picor: { type: Number, required: true, min: 0 },
  solidos: { type: Number, required: true, min: 0 }, 
  agua: { type: Number, required: true, min: 0 }, 
  costo: { type: Number, required: true, min: 0 } 
});


const Ingrediente: Model<IIngrediente> = models.Ingrediente || mongoose.model<IIngrediente>('Ingrediente', IngredienteSchema);
export default Ingrediente;
