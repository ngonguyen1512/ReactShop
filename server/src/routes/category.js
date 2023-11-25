import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getCategories)
router.put('/update', controllers.updateCategories)
router.post('/create', controllers.createCategories)

export default router;