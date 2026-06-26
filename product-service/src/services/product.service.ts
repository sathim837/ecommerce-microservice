import { ProductRepository } from "../repositories/product.repository";

export class ProductService {

    constructor( 
        private productRepository = new ProductRepository()
    ) {}
    
    async createProduct(data: any) {
        console.log('Service received data for product creation:', data);
        const product = await this.productRepository.createProduct(data);
        console.log('Product created in service:', product);
        return product;
    }

    async getAllProducts(query: any) {
        return await this.productRepository.getAllProducts(query);
    }
}