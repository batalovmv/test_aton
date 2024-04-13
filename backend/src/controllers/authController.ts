import { Request, Response } from 'express';
import { dbSetup } from 'src/database';
import bcryptjs from 'bcryptjs'




export const authenticate = async (req: Request, res: Response) => {
    const { login, password } = req.body;

    // Проверка на пустые значения логина или пароля
    if (!login || !password) {
        return res.status(400).json({ message: 'Логин и пароль не могут быть пустыми' });
    }

    const db = await dbSetup();

    // Попытка найти пользователя по логину
    const user = await db.get('SELECT * FROM users WHERE login = ?', [login]);

    // Проверка, найден ли пользователь
    if (!user) {
        return res.status(401).json({ message: 'Неверный логин' });
    }

    // Проверка пароля
    if (await bcryptjs.compare(password, user.password)) {
        const { fullName } = user;

        // Загрузка клиентов, связанных с ФИО пользователя
        const clients = await db.all("SELECT * FROM clients WHERE responsibleFIO = ?", [fullName]);

        res.json({
            message: 'Аутентификация успешна',
            user: { fullName },
            clients // Возвращаем список клиентов в ответе
        });
    } else {
        res.status(401).json({ message: 'Неверный пароль' });
    }
};