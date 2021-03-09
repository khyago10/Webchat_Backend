import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../schemas/User';

class UsersRepository implements IUsersRepository {
    private ormRepository: MongoRepository<User>;
    
    constructor() {
        this.ormRepository = getMongoRepository(User);
    }

    public async create({ name, email, password, birthDate }: ICreateUserDTO ): Promise<User> {            
       const user = this.ormRepository.create({
           name,
           email,
           password,
           birthDate
       });

       await this.ormRepository.save(user);
       
       return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

}

export default UsersRepository;