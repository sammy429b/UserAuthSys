import {Router} from 'express'
import { sendOTPController, verifyOTPController, forgotPasswordController, } from "../controllers/ForgotPassword.controller"

const router = Router();

router.post("/email", sendOTPController)
router.post("/otp", verifyOTPController)
router.post("/reset", forgotPasswordController)


export default router;