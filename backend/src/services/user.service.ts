
import { validate } from 'class-validator';
import { UserRepository } from 'src/repositories/user.repository';


export class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    
    changeStatus = async (changeUserStatusDto: ChangeUserStatusDto): Promise<boolean> => {
        const editUserDto = plainToInstance(EditUserDto, changeUserStatusDto);
        return await this.repository.editUser(editUserDto);
    }
}