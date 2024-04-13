import { Faker } from '@faker-js/faker';
import { User } from '../../entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { Client } from '../../entities/client.entity';


export const ClientFactory = setSeederFactory(Client, (faker: Faker) => {
    const client = new Client();
    client.accountNumber = faker.finance.account();
    client.lastName = faker.person.lastName();
    client.firstName = faker.person.firstName();
    client.middleName = faker.person.middleName();
    client.birthDate = faker.date.between('1970-01-01', '2000-12-31');
    client.taxNumber = faker.finance.bic();  // Используем BIC как пример ИНН
    client.responsiblePerson = `${faker.person.firstName()} ${faker.person.lastName()}`;
    client.status = 'Не в работе';
    return client;
});