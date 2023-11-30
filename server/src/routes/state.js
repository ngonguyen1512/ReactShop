import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getStates)
router.put('/update', controllers.updateStates)
router.post('/create', controllers.createStates)

export default router;