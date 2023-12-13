import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getInvoices)
router.put('/update', controllers.updateInvoices)
router.get('/count', controllers.getCountInvoices)
router.post('/create', controllers.createInvoices)
router.get('/topselling', controllers.getTopSellingProducts)

export default router;