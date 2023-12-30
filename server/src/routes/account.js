import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getAccounts)
router.post('/create', controllers.createAccount)
router.get('/count', controllers.getCountAccounts)
router.put('/updateone', controllers.updateAccountOne)
router.put('/updatepass', controllers.updateAccountPassword)
router.put('/updatebyad', controllers.updateAccountsByAdmin)

export default router;