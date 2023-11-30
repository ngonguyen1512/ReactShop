import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getAllocations)
router.get('/alls', controllers.getAllAllocations)
router.put('/update', controllers.updateAllocations)
router.post('/create', controllers.createAllocations)
router.delete('/delete', controllers.deleteAllocations)

export default router;