
import { Request, Response } from 'express';
import { sendError } from '../utils/serverHelpers';


export const getClientsForUser = async (req: Request, res: Response) => {
    if (!req.session.user) {
        return sendError(res, 403, "Необходима аутентификация");
    }

    const userFullName = req.session.user.fullName;
    const db = req.app.locals.db;

    try {
        const clients = await db.all("SELECT * FROM clients WHERE responsibleFIO = ?", [userFullName]);
        res.json(clients);
    } catch (error) {
        sendError(res, 500, "Database error");
    }
};

export const updateClientStatus = async (req: Request, res: Response) => {
    if (!req.session.user) {
        return sendError(res, 403, "Необходима аутентификация");
    }

    const Id = parseInt(req.params.Id);
    const { newStatus } = req.body as { newStatus: string };
    const userFullName = req.session.user.fullName;
    const db = req.app.locals.db;

    try {
        const checkClientExists = await db.get("SELECT * FROM clients WHERE Id = ?", [Id]);
        if (!checkClientExists) {
            return sendError(res, 404, "Клиент не найден");
        }

        const checkUserResponsibility = await db.get("SELECT * FROM clients WHERE Id = ? AND responsibleFIO = ?", [Id, userFullName]);
        if (!checkUserResponsibility) {
            return sendError(res, 403, "У вас нет прав на изменение этого клиента");
        }

        const result = await db.run("UPDATE clients SET status = ? WHERE Id = ?", [newStatus, Id]);
        if (result.changes) {
            res.json({ message: 'Статус обновлен' });
        } else {
            sendError(res, 409, "Не удалось обновить статус клиента");
        }
    } catch (error) {
        sendError(res, 500, "Database error");
    }
};
