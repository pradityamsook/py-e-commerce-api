import { ConnectDatabase } from "../../../utils/connect-db.util";
import { GetProduct } from "../interface/product.interface";
import { logger } from "../../../utils/logger.util";


export class ProductRepository {
    private readonly LOG_NAME: string = "ProductRepository >> ";
    constructor (
        private readonly connect: ConnectDatabase = new ConnectDatabase(),
    ){}

    public async getProduct(): Promise<any> {
        const SELECT_PRODUCT = 
            `SELECT
            ProductID as product_id,
            Name as name,
            Image as image_url,
            Price as price,
            Sale as sale_active,
            Amount as amount
            FROM products`.trim()
        ;
        const result = await this.connect.connection(SELECT_PRODUCT);

        if (result.rowsAffected[0] != 1) {
            logger.error(this.LOG_NAME + "getProduct : no query");
        }

        return result;
    }

    public async createProduct(reqProduct: GetProduct) {
        const INSERT_PRODUCT = 
            `INSERT INTO products
            (
                Name, 
                Image, 
                Price, 
                sale, 
                Amount
            )
            VALUES
            (
                N'${reqProduct.name}',
                '${reqProduct.image_url}',
                ${reqProduct.price},
                ${reqProduct.sale_active},
                ${reqProduct.amount}
            )`.trim()
        ;

        const result = await this.connect.connection(INSERT_PRODUCT);

        if (!result) {
            logger.error(this.LOG_NAME + "getProduct :" + JSON.stringify(result));
        }

        return result;
    }

    public async updateProduct(reqProduct: GetProduct) {
        const UPDATE_PRODUCT = 
            `UPDATE products
            SET
                Name = N'${reqProduct.name}',
                Image = '${reqProduct.image_url}',
                Price = ${reqProduct.price},
                Sale = ${reqProduct.sale_active},
                Amount = ${reqProduct.amount},
                update_date = CURRENT_TIMESTAMP
            WHERE
                ProductID = ${reqProduct.product_id}
            `.trim()
        ;
        const result = await this.connect.connection(UPDATE_PRODUCT);

        if (!result) {
            logger.error(this.LOG_NAME + "updateProduct :" + JSON.stringify(result));
        }

        return result;
    }

    public async deleteProduct(reqProduct: number) {
        const UPDATE_PRODUCT = 
            `DELETE FROM products
            WHERE
                ProductID = ${reqProduct}
            `.trim()
        ;
        const result = await this.connect.connection(UPDATE_PRODUCT);

        if (!result) {
            logger.error(this.LOG_NAME + "deleteProduct :" + JSON.stringify(result));
        }

        return result;
    }
}
