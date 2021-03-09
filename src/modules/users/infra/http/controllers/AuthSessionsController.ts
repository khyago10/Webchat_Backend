import { Request, Response } from 'express';
import { container } from 'tsyringe';

import authenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class AuthSessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password } = request.body;
            
            const authUser = container.resolve(authenticateUserService);

            const authToken = await authUser.execute({
                email,
                password
            });
            
            delete authToken.user.password;

            return response.json(authToken);

        } catch(err) {
            return response.status(400).json({ error: err.message });
        }
    }
}

