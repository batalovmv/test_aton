
import { Request, Response } from 'express';


// Получение списка клиентов
export const getClientsForUser = async (req: Request, res: Response) => {
    if (!req.session.user) {
        return res.status(403).json({ message: "Необходима аутентификация" });
    }

    const userFullName = req.session.user.fullName; 
    const db = req.app.locals.db;

    try {
        const clients = await db.all("SELECT * FROM clients WHERE responsibleFIO = ?", [userFullName]);
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: "Database error", error });
    }
};



export const updateClientStatus = async (req: Request, res: Response) => {
    if (!req.session.user) {
        return res.status(403).json({ message: "Необходима аутентификация" });
    }

    const Id = req.params.Id; 
    const { newStatus } = req.body; 
    const userFullName = req.session.user.fullName; // Используем имя пользователя из сессии
    const db = req.app.locals.db;

    try {
        // Проверяем существование клиента
        const checkClientExists = await db.get("SELECT * FROM clients WHERE Id = ?", [Id]);
        if (!checkClientExists) {
            return res.status(404).json({ message: "Клиент не найден" });
        }

        // Проверяем, является ли текущий пользователь ответственным за клиента
        const checkUserResponsibility = await db.get("SELECT * FROM clients WHERE Id = ? AND responsibleFIO = ?", [Id, userFullName]);
        if (!checkUserResponsibility) {
            return res.status(403).json({ message: "У вас нет прав на изменение этого клиента" });
        }

        // Обновление статуса клиента
        const result = await db.run("UPDATE clients SET status = ? WHERE Id = ?", [newStatus, Id]);
        if (result.changes) {
            res.json({ message: 'Статус обновлен' });
        } else {
            res.status(409).json({ message: 'Не удалось обновить статус клиента' });
        }
    } catch (error) {
        res.status(500).json({ message: "Database error", error });
    }
};
