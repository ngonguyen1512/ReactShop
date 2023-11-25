import express from 'express';
import { uploadImage } from '../controllers/uploadImage';

const router = express.Router();

router.post('/upload', uploadImage)

export default router;
