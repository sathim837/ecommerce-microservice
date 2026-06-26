import { ProductService } from "../services/product.service";

export class ProductController {
  constructor(private productService = new ProductService()) {}

  

  createProduct = async (req: any, res: any) => {
    //  console.log("this =", this);
    try {
      const product = await this.productService.createProduct(req.body);
      console.log("Product created:", product);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Error creating product", error });
    }
  };

  getAllProducts = async (req: any, res: any) => {
    try {
      const products = await this.productService.getAllProducts(req.query);
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
    }
  };
}
