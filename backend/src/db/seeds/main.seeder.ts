import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Client } from '../../entities/client.entity';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

function generateRandomDate(): Date {
    const start = new Date(1970, 0, 1);
    const end = new Date(2000, 0, 1);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export default class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {


    const userRepository = dataSource.getRepository(User);
    const clientRepository = dataSource.getRepository(Client);

    const users = [];
    const clients = [];

    for (let i = 0; i < 20; i++) {
        const user = userRepository.create();
        users.push(user);
    }

    for (let i = 0; i < 15; i++) {
        const client = clientRepository.create({
            birthDate: generateRandomDate()
        });
        clients.push(client);
    }

    // Сохранение пользователей и клиентов в базе данных
    await userRepository.save(users);
    await clientRepository.save(clients);

    console.log('20 new users and 15 new clients have been created.');
}
}
