

import { Faker } from '@faker-js/faker';
import { User } from '../../entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';


export const UserFactory = setSeederFactory(User, (faker: Faker) => {
    const user = new User();
    user.fullName = `${faker.person.firstName()} ${faker.person.lastName()}`;
    user.login = faker.internet.userName();
    user.password = 'password';
    user.hashPassword();
    return user;
});