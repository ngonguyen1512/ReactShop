import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getPermissions)
router.put('/update', controllers.updatePermissions)
router.post('/create', controllers.createPermissions)

export default router;