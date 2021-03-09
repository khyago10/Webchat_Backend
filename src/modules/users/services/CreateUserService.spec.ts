import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakePasswordHashProvider from '../providers/PasswordHashProvider/fake/FakePasswordHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be aple to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakePasswordHashProvider = new FakePasswordHashProvider();

        const createUserService = new CreateUserService(fakeUsersRepository, fakePasswordHashProvider);

        const user = await createUserService.execute({
            name: 'Teste',
            email: 'teste@mail.com',
            password: '123456',
            birthDate: new Date('01-01-1960'),
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with an existing email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakePasswordHashProvider = new FakePasswordHashProvider();

        const createUserService = new CreateUserService(fakeUsersRepository, fakePasswordHashProvider);

        const user = await createUserService.execute({
            name: 'Teste',
            email: 'teste@mail.com',
            password: '123456',
            birthDate: new Date('01-01-1960'),
        });

        expect(
            createUserService.execute({
                name: 'Teste',
                email: 'teste@mail.com',
                password: '123456',
                birthDate: new Date('01-01-1960'),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

