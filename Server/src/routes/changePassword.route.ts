import {Router} from 'express'
import {changePasswordController} from "../controllers/changePassword.controller"

const router = Router();

router.put("/password/change", changePasswordController)

export default router;