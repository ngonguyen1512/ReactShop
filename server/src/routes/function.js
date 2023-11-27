import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getFunctions)
router.get('/alls', controllers.getAllsFunctions)
router.put('/update', controllers.updateCategories)
router.post('/create', controllers.createFunctions)
router.delete('/delete', controllers.deleteFunctions)

export default router;