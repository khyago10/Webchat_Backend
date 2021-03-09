import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/schemas/User';

class FakeUsersRepository implements IUsersRepository{
    private users: User[] = [];
    
    public async create(data: ICreateUserDTO): Promise<User> {        
        const user = new User();

        Object.assign(user, data);
        
        this.users.push(user);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(user => user.email === user.email);

        return user;
    }
    
}

export default FakeUsersRepository;