import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../lib/db/mongodb';
import Ingrediente from '../../../../lib/db/models/Ingrediente';

const actualizarEspectro = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();
      
      const { ingredientes, tipo } = req.body;

      if (!ingredientes || ingredientes.length === 0) {
        return res.status(400).json({ error: 'Debe ingresar al menos un ingrediente.' });
      }

      const pesoTotal = ingredientes.reduce((sum: number, ing: { cantidad: number }) => sum + ing.cantidad, 0);

      for (const ing of ingredientes) {
        const ingrediente = await Ingrediente.findOne({ nombre: ing.ingrediente });

        if (!ingrediente) {
          return res.status(400).json({ error: `El ingrediente ${ing.ingrediente} no existe en la base de datos.` });
        }

        const proporcion = (ing.cantidad / pesoTotal) * 100;

        if (!ingrediente.espectro[tipo]) {
          ingrediente.espectro = { ...ingrediente.espectro, [tipo]: 0 };
        }

        ingrediente.espectro = { ...ingrediente.espectro, [tipo]: ingrediente.espectro[tipo] + proporcion };
        await ingrediente.save();
      }

      res.status(200).json({ message: 'Espectros actualizados correctamente.' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error actualizando los espectros de los ingredientes.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
};

export default actualizarEspectro;
