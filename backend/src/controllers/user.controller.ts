import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import bcrypt from 'bcryptjs';
import { UserService } from 'src/services/user.service';
export class UserController {
    private service: UserService;

    constructor() {
        this.service = new UserService();
    }
    
    loginUser = async (req: Request, res: Response) => {
        const { login, password } = req.body;
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { login } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Logged in successfully', user });
    }



}
