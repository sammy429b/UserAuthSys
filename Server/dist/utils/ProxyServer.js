"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_proxy_middleware_1 = require("http-proxy-middleware");
const apiProxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: process.env.PROXY_URL || 'http://localhost:3030',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/'
    }
});
exports.default = apiProxy;
