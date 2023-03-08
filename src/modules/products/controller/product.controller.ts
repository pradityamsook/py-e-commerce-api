import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { logger } from "../../../utils/logger.util";
import { ProductMapper } from "../mapper/produt.mapper";


export class ProductController {
    
    constructor (
        private readonly productService: ProductService = new ProductService(),
        private readonly productMapper: ProductMapper = new ProductMapper()
    ) {};
    
    public async getProduct(req: Request, res: Response): Promise<any> {
        const LOG_NAME: string = "ProductController >> ";
        const productService: ProductService = new ProductService();
        const productMapper: ProductMapper = new ProductMapper();

        try {
            const result = await productService.getProduct();
            
            if (result.rowsAffected[0] == 0) {
                return res.json({
                    succes: false,
                    message: "User logged in unsuccessfully because wrong query",
                })
            }
            const mapResult = productMapper.mapperGetProduct(result.recordset);
            logger.debug(`${LOG_NAME} getProduct : ${mapResult}`);

            return res.json({
                succes: true,
                message: "get products successfully",
                result: mapResult
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Internal Server Error: ${error}`
            });
        }  
    }

    public async createProduct(req: Request, res: Response): Promise<any> {
        const LOG_NAME: string = "ProductController >> ";
        const productService: ProductService = new ProductService();
        const reqProduct = req.body;

        logger.debug(`${LOG_NAME} createProduct : ${JSON.stringify(reqProduct)}`);

        try {
            const result = await productService.createProduct(reqProduct);
            
            if (!result) {
                return res.json({
                    succes: false,
                    message: "User logged in unsuccessfully because wrong query or not found data",
                })
            }

            return res.json({
                succes: true,
                message: "get products successfully"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Internal Server Error: ${error}`
            });
        }
    }

    public async updateProduct(req: Request, res: Response): Promise<any> {
        const LOG_NAME: string = "ProductController >> ";
        const productService: ProductService = new ProductService();
        const reqProduct = req.body;

        logger.debug(`${LOG_NAME} updateProduct : ${JSON.stringify(reqProduct)}`);

        try {
            const result = await productService.updateProduct(reqProduct);
            
            if (!result) {
                return res.json({
                    succes: false,
                    message: "User logged in unsuccessfully because wrong query or not found data",
                })
            }

            return res.json({
                succes: true,
                message: "update products successfully"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Internal Server Error: ${error}`
            });
        }
    }

    public async deleteProduct(req: Request, res: Response): Promise<any> {
        const LOG_NAME: string = "ProductController >> ";
        const productService: ProductService = new ProductService();
        const reqProduct = req.path;

        logger.debug(`${LOG_NAME} deleteProduct : ${reqProduct}`);

        try {
            const result = await productService.deleteProduct(reqProduct);
            
            if (!result) {
                return res.json({
                    succes: false,
                    message: "User logged in unsuccessfully because wrong query or not found data",
                })
            }

            return res.json({
                succes: true,
                message: "delete products successfully"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Internal Server Error: ${error}`
            });
        }
    }
}