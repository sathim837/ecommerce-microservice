import { Router } from "express";
import {
  createProxyMiddleware,
} from "http-proxy-middleware";

const router = Router();

router.use(
  "/users",
  createProxyMiddleware({
    target:
      process.env.USER_SERVICE_URL,

    changeOrigin: true,
    pathRewrite: {
      "^/": "/api/v1/",
    },
    logger: console,
  })
);

router.use(
  "/orders",
  createProxyMiddleware({
    target:
      process.env.ORDER_SERVICE_URL,

    changeOrigin: true,
  })
);

router.use(
  "/products",
  createProxyMiddleware({
    target:
      process.env.PRODUCT_SERVICE_URL,

    changeOrigin: true,
  })
);

export default router;