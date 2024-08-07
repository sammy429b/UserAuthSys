import {Router} from 'express'
import {changePasswordController} from "../controllers/changePassword.controller"
import { JWTverify } from '../utils/JWT';
import { forgotPasswordController, sendOTPController, verifyOTPController } from '../controllers/ForgotPassword.controller';

const router = Router();


router.put("/password/change",JWTverify, changePasswordController)

router.post("/password/email", sendOTPController)
router.post("/password/otp", verifyOTPController)
router.post("/password/reset", forgotPasswordController)

export default router;