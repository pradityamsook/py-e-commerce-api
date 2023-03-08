import { ConnectDatabase } from "../../../utils/connect-db.util";
import { GetProduct } from "../interface/product.interface";
import { logger } from "../../../utils/logger.util";


export class ProductRepository {
    private readonly LOG_NAME: string = "ProductRepository >> ";
    constructor (
        private readonly connect: ConnectDatabase = new ConnectDatabase(),
    ){}

    public async getProduct(req: GetProduct): Promise<any> {
        const SELECT_PRODUCT = 
            `SELECT
            ProductID as product_id,
            Name as name,
            Image as image_url,
            Price as price,
            sale as sale_active
            FROM products`.trim()
        ;
        const result = await this.connect.connection(SELECT_PRODUCT);

        if (result.rowsAffected[0] != 1) {
            logger.error(this.LOG_NAME + "getProduct : no query");
        }

        return result;
    }
}
