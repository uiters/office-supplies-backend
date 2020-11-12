import express from 'express';
import userRoutes from './user.route'
import authRoutes from './auth.routes';
export class Routes {
    public init(app: express.Application): void {
       app.use('/api/user', userRoutes);
       app.use('/api/auth', authRoutes);
    }
}
