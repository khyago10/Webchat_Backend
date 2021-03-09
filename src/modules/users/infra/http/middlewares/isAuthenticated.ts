import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';


import EnsureAuthenticatedService from '@modules/users/services/EnsureAuthenticatedService';

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if(!authHeader)
        throw new AppError('Authenticated token is missing', 401);
    
    try {
        const [, token] = authHeader.split(' ');

        const ensureAuthenticated = container.resolve(EnsureAuthenticatedService);

        const { id } = ensureAuthenticated.execute(token);

        request.user = {
            id
        } 
        
        return next();
    } catch ( err) {
        throw new AppError('Invalid token', 401);
    }  
}