import { Request, Response } from 'express';
import { dbSetup } from 'src/database';
import bcryptjs from 'bcryptjs'
import { sendError } from 'src/utils/serverHelpers';




export const authenticate = async (req: Request, res: Response) => {
    const { login, password } = req.body as { login: string; password: string };
    if (!login || !password) {
        return sendError(res, 400, 'Логин и пароль не могут быть пустыми');
    }

    const db = req.app.locals.db;
    try {
        const user = await db.get('SELECT * FROM users WHERE login = ?', [login]);
        if (!user) {
            return sendError(res, 401, 'Неверный логин');
        }

        const passwordIsValid = await bcryptjs.compare(password, user.password);
        if (!passwordIsValid) {
            return sendError(res, 401, 'Неверный пароль');
        }

        req.session.user = { fullName: user.fullName, Id: user.Id };
        res.json({
            message: 'Аутентификация успешна',
            user: { fullName: user.fullName, Id: user.Id }
        });
    } catch (error) {
        console.error('Database error:', error);
        sendError(res, 500, 'Ошибка базы данных');
    }
};
