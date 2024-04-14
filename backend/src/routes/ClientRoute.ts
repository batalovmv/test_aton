import { Router } from 'express';
import { getClientsForUser, updateClientStatus } from 'src/controllers/clientController';


const router = Router();

router.patch('/updateStatus/:Id', updateClientStatus);
router.get('/getClientsList', getClientsForUser);

export { router as clientRouter };