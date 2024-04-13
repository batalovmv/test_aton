import { Request, Response } from 'express';
import { dbSetup } from 'src/database';
import bcryptjs from 'bcryptjs'




export const authenticate = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    if (!login || !password) {
        return res.status(400).json({ message: 'Логин и пароль не могут быть пустыми' });
    }

    const db = await dbSetup();

    const user = await db.get('SELECT * FROM users WHERE login = ?', [login]);

    if (!user) {
        return res.status(401).json({ message: 'Неверный логин' });
    }

    if (await bcryptjs.compare(password, user.password)) {
        req.session.user = { fullName: user.fullName, Id: user.Id }; // Сохраняем информацию о пользователе в сессии
        res.json({
            message: 'Аутентификация успешна',
            user: { fullName: user.fullName }
        });
    } else {
        res.status(401).json({ message: 'Неверный пароль' });
    }
};