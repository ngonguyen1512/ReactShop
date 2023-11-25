import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as controllers from '../controllers';

const router = express.Router()

router.use(verifyToken)
router.get('/getcurrent', controllers.getCurrent)

export default router