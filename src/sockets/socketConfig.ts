import { Server } from 'socket.io';
import { createServer } from 'http';
import app from '../app';
import { config } from '../config/config';

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: config.CLIENT_URL,
        credentials: true
    }
});

export { server, io };