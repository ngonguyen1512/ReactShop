import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getLikes)
router.post('/create', controllers.createLikes)
router.delete('/delete', controllers.deleteLikes)

export default router;