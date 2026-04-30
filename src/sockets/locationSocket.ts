import { io } from '../server';
import { prisma } from '../config/prisma';

const connectedUsers = new Map();

export const locationSocket = () => {
    io.on("connection", (socket) => {
        console.log(`Usuario conectado ${socket.id}`);

        socket.on('location:update', async (data) => {
            try {

                const { userId, latitude, longitude, username } = data;

                connectedUsers.set(socket.id, {
                    socketId: socket.id,
                    userId,
                    username,
                    latitude,
                    longitude
                });

                await prisma.$transaction([
                    prisma.user.update({
                        where: { id: userId },
                        data: {
                            latitude,
                            longitude,
                            isOnline: true
                        }
                    }),

                    prisma.locationHistory.create({
                        data: {
                            userId,
                            latitude,
                            longitude
                        }
                    })
                ])

                // Enviar lista actualizada a TODOS los clientes
                const usersList = Array.from(connectedUsers.values());
                io.emit('users:list', usersList);

            } catch (error) {
                console.error('Error al actualizar la ubicación:', error);
            }
        })

        // Evento: Cliente solicita lista actual de usuarios
        socket.on('users:get', () => {
            const usersList = Array.from(connectedUsers.values());
            socket.emit('users:list', usersList);
        });

        // Evento: Usuario se desconecta
        socket.on('disconnect', async () => {
            const user = connectedUsers.get(socket.id);
            connectedUsers.delete(socket.id);

            if (user) {
                await prisma.user.update({
                    where: { id: user.userId },
                    data: { isOnline: false }
                });
            }

            console.log(`Usuario desconectado: ${socket.id}`);

            // Notificar a todos que un usuario se fue
            const usersList = Array.from(connectedUsers.values());
            io.emit('users:list', usersList);
        });

    });
}