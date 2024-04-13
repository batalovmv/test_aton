import { faker } from "@faker-js/faker";
import { dbSetup } from "src/database";
import bcryptjs from 'bcryptjs'
const saltRounds = 10;//количество раундов хеширования

export async function generateData() {
    const db = await dbSetup();

    let accountId = 0
    
    // Клиенты
    for (let i = 0; i < 100; i++) {
        const client = {
            accountId: accountId++,
            lastName: faker.person.lastName(),
            firstName: faker.person.firstName(),
            middleName: faker.person.middleName(),
            birthDate: faker.date.past({ years: 30, refDate: '2000-01-01' }).toISOString().slice(0, 10),
            INN: faker.finance.accountNumber(12),
            responsibleFIO: `${faker.person.firstName()} ${faker.person.lastName()}`,
            status: 'Не в работе'
        };

        await db.run(`
            INSERT INTO clients (accountId, lastName, firstName, middleName, birthDate, INN, responsibleFIO, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [client.accountId, client.lastName, client.firstName, client.middleName, client.birthDate, client.INN, client.responsibleFIO, client.status]
        );
    }

    // Юзеры
    for (let i = 0; i < 8; i++) {
        let unique = false;
        let fullName, login, password;
        while (!unique) {
            fullName = `${faker.person.firstName()} ${faker.person.lastName()}`;
            login = faker.internet.userName();
            password = await bcryptjs.hash(faker.internet.password(), saltRounds);
            const exists = await db.get("SELECT login FROM users WHERE login = ?", [login]);
            if (!exists) {
                unique = true;
            }
        }

        await db.run('INSERT INTO users (fullName, login, password) VALUES (?, ?, ?)', [fullName, login, password]);
    }

    // Add a specific user with known login and password
    const hashedPassword = await bcryptjs.hash('test', saltRounds);
    await db.run('INSERT INTO users (fullName, login, password) VALUES (?, ?, ?)', ['Test User', 'test', hashedPassword]);
    for (let i = 0; i < 10; i++) {
    const responsibleUsers = await db.all("SELECT fullName FROM users ORDER BY RANDOM() ");
    responsibleUsers.forEach(async (user, index) => {
        const client = {
            accountId: accountId++,
            lastName: faker.person.lastName(),
            firstName: faker.person.firstName(),
            middleName: faker.person.middleName(),
            birthDate: faker.date.past({ years: 30, refDate: '2000-01-01' }).toISOString().slice(0, 10),
            INN: faker.finance.accountNumber(12),
            responsibleFIO: user.fullName,
            status: 'Не в работе'
        };

        await db.run(`
            INSERT INTO clients (accountId, lastName, firstName, middleName, birthDate, INN, responsibleFIO, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [client.accountId, client.lastName, client.firstName, client.middleName, client.birthDate, client.INN, client.responsibleFIO, client.status]
        );
    });
    
}
    

    console.log('Data generation complete.');

    db.close();
}

generateData().catch(console.error);
