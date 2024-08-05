import {Router} from 'express'
import {changePasswordController} from "../controllers/changePassword.controller"
import { JWTverify } from '../utils/JWT';

const router = Router();


router.put("/change",JWTverify, changePasswordController)

export default router;