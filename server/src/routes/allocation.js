import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getAllocations)
router.get('/alls', controllers.getAllAllocations)

export default router;