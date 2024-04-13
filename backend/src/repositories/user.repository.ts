import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { appDataSource } from 'src/dataSource';
import { SignInUserDto } from 'src/dto/signInUser.dto';
import { IUserWithoutPass } from 'src/interfaces/IUser.interface';
import bcryptjs from 'bcryptjs';
export class UserRepository extends Repository<User> {
    constructor() {
        super(User, appDataSource.createEntityManager());
    }
    async signInUser(userDto: SignInUserDto): Promise<IUserWithoutPass[]> {
        const { login, password } = userDto;
        const users = await this.find({ where: { login } });

        if (users.length === 0) {
            throw new Error('User does not exist');
        }

        const validUsers: IUserWithoutPass[] = [];

        for (const user of users) {
            const isPasswordValid = await this.comparePassword(password, user.password);
            if (isPasswordValid) {
                const { password, ...userWithoutPass } = user;
                validUsers.push(userWithoutPass as IUserWithoutPass);
            }
        }

        if (validUsers.length === 0) {
            throw new Error('Wrong password');
        } else {
            return validUsers;
        }
        
    }
    private comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
        return await bcryptjs.compare(password, hashedPassword);
    }
}