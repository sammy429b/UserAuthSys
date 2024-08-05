"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const DBconnect_1 = __importDefault(require("./utils/DBconnect"));
const changePassword_route_1 = __importDefault(require("./routes/changePassword.route"));
const forgotPassword_route_1 = __importDefault(require("./routes/forgotPassword.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const ProxyServer_1 = __importDefault(require("./utils/ProxyServer"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT || 5000;
// Middleware'
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:8080',
    credentials: true
}));
// Routes
app.use("/auth", auth_route_1.default);
app.use("/password", changePassword_route_1.default);
app.use("/password", forgotPassword_route_1.default);
// Proxy
app.use('/', ProxyServer_1.default);
// Base route
app.get("/", (req, res) => {
    res.send("TypeScript with express");
    res.json({ message: "TypeScript with express" });
});
// Start the server after DB connection
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on http://localhost:${port}`);
    yield (0, DBconnect_1.default)();
}));
