import app from './app';
import { config } from './config/config';
import { prisma } from './config/prisma';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { locationSocket } from './sockets/locationSocket';

const PORT = config.PORT || 3000;

const server = createServer(app);

export const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true
    }
});

// Inicializar sockets de ubicación
locationSocket();

server.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log('Conexión a la base de datos exitosa');
    console.log('Socket.IO activo');
  }catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
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