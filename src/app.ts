import express,{Express,Response,Request} from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de test para verificar que el backend funciona
app.get('/api/test', (_req: Request, res: Response) => {
  res.json({ message: 'Backend funcionando' });
});

// Manejo de rutas no encontradas
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

export default app;