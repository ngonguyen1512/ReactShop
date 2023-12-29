import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getInvoices)
router.put('/update', controllers.updateInvoices)
router.put('/complete', controllers.completeInvoices)
router.put('/unsuccessful', controllers.unsuccessfulInvoices)
router.get('/count', controllers.getCountInvoices)
router.post('/create', controllers.createInvoices)
router.get('/seller', controllers.getSellerProducts)
router.get('/sellerac', controllers.getSellerAccounts)

export default router;