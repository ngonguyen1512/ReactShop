import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getMenus)
router.put('/update', controllers.updateMenus)
router.post('/create', controllers.createMenus)
router.delete('/delete', controllers.deleteMenus)

export default router;