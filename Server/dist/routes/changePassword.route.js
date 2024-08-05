"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const changePassword_controller_1 = require("../controllers/changePassword.controller");
const JWT_1 = require("../utils/JWT");
const router = (0, express_1.Router)();
router.put("/change", JWT_1.JWTverify, changePassword_controller_1.changePasswordController);
exports.default = router;
