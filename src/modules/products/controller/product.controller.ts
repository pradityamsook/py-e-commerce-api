import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { logger } from "../../../utils/logger.util";
import { ProductMapper } from "../mapper/produt.mapper";
import { unlink } from 'node:fs/promises';


export class ProductController {

    getImage(arg0: string, getImage: any) {
        throw new Error("Method not implemented.");
    }

    constructor(
        private readonly productService: ProductService = new ProductService(),
        private readonly productMapper: ProductMapper = new ProductMapper()
    ) { };

    public async getProduct(req: Request, res: Response): Promise<any> {
        const LOG_NAME: string = "ProductController >> ";
        const productService: ProductService = new ProductService();
        const productMapper: ProductMapper = new ProductMapper();
        const id: any = req.query.id;

        logger.debug(`${LOG_NAME} getProduct :`, req.params);

        try {
            const result = await productService.getProduct(parseInt(id));

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
        const filename = req.file?.filename;
        reqProduct.image_url = filename;
        logger.debug(`${LOG_NAME} createProduct : `, JSON.stringify(req.file));

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
        const filename = req.file?.filename;
        if (filename) {
            reqProduct.image_url = filename;
        }
        logger.debug(`${LOG_NAME} updateProduct : `, JSON.stringify(reqProduct));

        const product = await productService.getProduct(parseInt(reqProduct.product_id));

        console.log("product -> ", product);

        try {
            const result = await productService.updateProduct(reqProduct);

            if (filename && product && product.recordset && product.recordset.length > 0) {
                unlink(process.cwd() + `/src/uploads/${product?.recordset?.[0]?.image_url}`);
            }

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

        logger.debug(`${LOG_NAME} deleteProduct : `, reqProduct);

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

    public async uploadImage(req: Request, res: Response) {
        const LOG_NAME: string = "ProductController >> ";
        logger.debug(`${LOG_NAME} uploadImage :`, req.file);
    }
}