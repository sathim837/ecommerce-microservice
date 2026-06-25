import {Product} from '../models/product.model';

export class ProductRepository {

    async createProduct(data: any)  {
        const product = new Product(data);
        return await product.save();
    }

    async getAllProducts() {
        return await Product.find();
    }
}