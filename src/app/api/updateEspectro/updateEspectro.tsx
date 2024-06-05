// pages/api/receta/updateespectro.ts
"use server"
import { NextApiRequest, NextApiResponse } from 'next';
import actualizarEspectro from '../../../lib/services/actualizarEspectro'; // Asegúrate de que la ruta sea correcta según tu estructura de archivos

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  // Puedes manejar diferentes métodos HTTP aquí si es necesario
  if (req.method === 'POST') {
    try {
      await actualizarEspectro(req, res); // Llama a la función actualizarEspectro con los mismos argumentos
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
