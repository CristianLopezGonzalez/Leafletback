import app from './app';
import { config } from './config/config';
import { prisma } from './config/prisma';

const PORT = config.PORT || 3000;

const server = app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log('Conexión a la base de datos exitosa');
  }catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    server.close(() => {
      process.exit(1);
    });
  }
});


const gracefulShutdown = async () => {
  console.log('Cerrando servidor...');
  server.close(async () => {
    try {
      await prisma.$disconnect();
      console.log('Base de datos desconectada');
      console.log('Servidor cerrado');
      process.exit(0);
    } catch (error) {
      console.error('Error durante el cierre del servidor:', error);
      process.exit(1);
    }
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);