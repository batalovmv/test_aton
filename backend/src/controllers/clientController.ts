import { faker } from '@faker-js/faker';
import { Request, Response } from 'express';
import { dbSetup } from 'src/database';
import { Client } from 'src/models/Сlient';
export async function generateClients() {
    const db = await dbSetup();
    for (let i = 0; i < 10; i++) {
        const client = {
            accountId: faker.number.int({ min: 1000, max: 9999 }),
            lastName: faker.person.lastName(),
            firstName: faker.person.firstName(),
            middleName: faker.person.middleName(),
            birthDate: faker.date.past({ years: 30, refDate:'2000-01-01'}).toISOString().slice(0, 10),
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
}

// Получение списка клиентов
export const getClientsForUser = async (req: Request, res: Response) => {
    const userFullName = req.params.userFullName;
    const db = req.app.locals.db; 

    try {
        const rows = await db.all("SELECT * FROM clients WHERE responsibleFIO = ?", [userFullName]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Database error", error });
    }
};


export const updateClientStatus = async (req: Request, res: Response) => {
    const { accountId, newStatus } = req.body;
    const db = req.app.locals.db; // Assuming db is set in app.locals

    try {
        const result = await db.run("UPDATE clients SET status = ? WHERE accountId = ?", [newStatus, accountId]);
        if (result.changes) {
            res.json({ message: 'Статус обновлен' });
        } else {
            res.status(404).json({ message: 'Клиент не найден' });
        }
    } catch (error) {
        res.status(500).json({ message: "Database error", error });
    }
};
