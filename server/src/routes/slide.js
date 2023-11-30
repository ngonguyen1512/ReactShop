import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getSlide)
router.put('/update', controllers.updateSlides)
router.post('/create', controllers.createSlides)
router.delete('/delete', controllers.deleteSlides)

export default router;