import { ProductRepository } from "../repository/product.repository";
import { ProductMapper } from "../mapper/produt.mapper";

export class ProductService {
    constructor (
        private readonly productRepository: ProductRepository = new ProductRepository(),
        private readonly productMapper: ProductMapper = new ProductMapper()
    ) {};

    public async getProduct(): Promise<any> {
        let result = await this.productRepository.getProduct();

        return result;
    }

    public async createProduct(req: any): Promise<any> {
        const reqMapper = this.productMapper.mapperReqProduct(req); 
        let result = await this.productRepository.createProduct(reqMapper);

        return result;
    }

    public async updateProduct(req: any): Promise<any> {
        const reqMapper = this.productMapper.mapperUpdateProduct(req); 
        let result = await this.productRepository.updateProduct(reqMapper);

        return result;
    }

    public async deleteProduct(req: any): Promise<any> {
        const reqMapper = this.productMapper.mapperDeleteProduct(req); 
        let result = await this.productRepository.deleteProduct(reqMapper);

        return result;
    }
}