import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/depend', controllers.getSamples)
router.get('/all', controllers.getAllSamples)
router.put('/update', controllers.updateSamples)
router.post('/create', controllers.createSamples)

export default router;