import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getColors)
router.put('/update', controllers.updateColors)
router.post('/create', controllers.createColors)

export default router;