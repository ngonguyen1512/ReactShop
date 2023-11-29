import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getPermissions)

export default router;