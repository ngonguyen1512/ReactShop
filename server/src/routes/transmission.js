import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getTransmissions)
router.get('/alls', controllers.getAllTransmissions)

export default router;