import { container } from 'tsyringe';

import IPasswordHashProvider from '../providers/PasswordHashProvider/models/IPasswordHashProvider';
import BCryptHashProvider from '../providers/PasswordHashProvider/implementation/BCryptHashProvider';

import IAuthSessionProvider from '../providers/AuthSessionProvider/models/IAuthSessionProvider';
import JWTAuthSessionProvider from '../providers/AuthSessionProvider/implementation/JWTAuthSessionProvider';

container.registerSingleton<IPasswordHashProvider>(
    'PasswordHashProvider', 
    BCryptHashProvider,
);

container.registerSingleton<IAuthSessionProvider>(
    'AuthSessionProvider', 
    JWTAuthSessionProvider,
);