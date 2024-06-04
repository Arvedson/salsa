import mongoose from 'mongoose';

const MONGODB_URI: string = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Por favor, añade tu URI de MongoDB a las variables de entorno');
}

async function connectToDatabase(uri: string): Promise<typeof mongoose> {
  try {
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw new Error('No se pudo establecer la conexión a la base de datos');
  }

  return mongoose;
}

export default connectToDatabase;
