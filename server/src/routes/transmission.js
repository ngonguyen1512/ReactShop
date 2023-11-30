import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getTransmissions)
router.get('/alls', controllers.getAllTransmissions)
router.put('/update', controllers.updateTransmissions)
router.post('/create', controllers.createTransmissions)
router.delete('/delete', controllers.deleteTransmissions)

export default router;