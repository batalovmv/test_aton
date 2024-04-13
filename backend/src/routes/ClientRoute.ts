import { Router } from 'express';
import { getClientsForUser, updateClientStatus } from 'src/controllers/clientController';


const router = Router();

router.post('/updateStatus', updateClientStatus);
router.get('/:userFullName', getClientsForUser);

export { router as clientRouter };