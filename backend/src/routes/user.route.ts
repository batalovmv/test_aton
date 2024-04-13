import { Router } from "express";
import { UserController } from "src/controllers/user.controller";
import { IRoute } from "src/interfaces/IRoute.interface";


export class UserRoute implements IRoute {
    public path = '/user';
    public router = Router();
    private controller: UserController;

    constructor() {
        this.controller = new UserController();
        this.init();
    }

    private init() {
        this.router.get('/', roleChecker([ERole.admin, ERole.manager]), this.controller.getUsers);
        this.router.post('/addUser', roleChecker([ERole.admin, ERole.manager]), this.controller.addUser);
        this.router.patch('/:id/changeStatus', roleChecker([ERole.admin, ERole.manager]), this.controller.changeStatus);
        this.router.get('/export-csv', roleChecker([ERole.admin, ERole.manager]), this.controller.getUserCSV);
        this.router.get('/:id', roleChecker([ERole.admin, ERole.manager, ERole.customer, ERole.performer]), this.controller.getUser);
    }
}