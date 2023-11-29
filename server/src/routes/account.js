import express from 'express';
import * as controllers from '../controllers';

const router = express.Router();

router.get('/all', controllers.getAccounts)
router.post('/create', controllers.createAccount)
router.put('/updateone', controllers.updateAccountOne)
router.put('/updatebyad', controllers.updateAccountsByAdmin)

export default router;