import {Router} from 'express'
import {changePasswordController} from "../controllers/changePassword.controller"
import { JWTverify } from '../utils/JWT';

const router = Router();

router.use(JWTverify)

router.put("/change", changePasswordController)

export default router;