import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getTransfers)
router.put('/update', controllers.updateTransfers)
router.post('/create', controllers.createTransfers)
router.delete('/delete', controllers.deleteTransfers)

export default router;