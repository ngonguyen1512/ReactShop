import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getProducts)
router.put('/update', controllers.updateProducts)
router.get('/limit', controllers.getProductsLimit)
router.post('/create', controllers.createProducts)
router.get('/promotion', controllers.getProductsPromotion)
// router.get('/newproduct', controllers.getNewProducts)

export default router;