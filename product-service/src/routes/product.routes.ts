import {Router} from "express";
import {ProductController} from "../controllers/product.controller";

const router = Router();
const productController = new ProductController();

router.post(
  "/",
  productController.createProduct
);

router.get(
  "/",
  productController.getAllProducts
);

router.get(
  "/:id",
  productController.getProductById
);

router.patch(
  "/:id/stock",
  productController.updateStock
);


export default router;