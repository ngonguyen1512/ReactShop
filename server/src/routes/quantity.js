import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getQuantities)
router.put('/update', controllers.updateQuantities)
router.post('/create', controllers.createQuantities)

export default router;