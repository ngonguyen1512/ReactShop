import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getDimensions)
router.put('/update', controllers.updateDimensions)
router.post('/create', controllers.createDimensions)

export default router;