import { prisma } from '../config/prisma';

export class UserService {

    static async getUserProfile(userId: string) {
        try {

            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    isOnline: true,
                    latitude: true,
                    longitude: true,
                    markers: {
                        orderBy: {
                            createdAt: 'desc'
                        }
                    },
                    createdAt: true,
                }
            })

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            return user;

        } catch (error) {
            console.error('Error al obtener perfil de usuario:', error);
            throw new Error('Error al obtener perfil de usuario');
        }
    }

}