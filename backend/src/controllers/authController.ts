import { Request, Response } from 'express';
import { User } from '../models/User';
import { faker } from '@faker-js/faker';
import { dbSetup } from 'src/database';
import bcryptjs from 'bcryptjs'




export const authenticate = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const db = await dbSetup();
    const user = await db.get('SELECT * FROM users WHERE login = ?', [login]);

    if (user && await bcryptjs.compare(password, user.password)) {
        const { fullName } = user; 
        res.json({ message: 'Аутентификация успешна', user: { fullName } });
    } else {
        res.status(401).json({ message: 'Неверные учетные данные' });
    }
};
