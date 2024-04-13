
import { Request, Response } from 'express';


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
