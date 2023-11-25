import express from 'express';
import * as authController from '../controllers';

const router = express.Router();

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/forgot', authController.forgotPassword)

export default router;