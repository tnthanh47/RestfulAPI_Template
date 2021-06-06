import express, { Router } from 'express';
import { UserController } from '../controllers';
import ExtractJWT from '../middlewares/ExtractJWT';

const router = express.Router();

router.get('/validate', ExtractJWT, UserController.Validate);
router.post('/register', UserController.Register);
router.post('/login', UserController.Login);
router.get('/get/all', UserController.GetAllUser);

export default router;
