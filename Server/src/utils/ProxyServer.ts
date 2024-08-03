import { createProxyMiddleware } from 'http-proxy-middleware';

const apiProxy = createProxyMiddleware({
    target: process.env.PROXY_URL || 'http://localhost:3030',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/'
    }
});

export default apiProxy;
