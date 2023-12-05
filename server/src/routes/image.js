import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getImages)
router.put('/update', controllers.updateImages)
router.post('/create', controllers.createImages)

export default router;