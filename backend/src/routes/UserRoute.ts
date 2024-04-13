import { Router } from 'express';
import { authenticate } from '../controllers/authController';

const router = Router();

router.post('/login', authenticate);

export { router as userRouter };