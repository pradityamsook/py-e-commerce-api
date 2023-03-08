import { GetProduct } from "../interface/product.interface"

export class ProductMapper {
    public mapperGetProduct(req: any): GetProduct[] {
        let product: GetProduct[] = [];
        for (let val of req) {
            const storeProduct = {
                "product_id": val.product_id,
                "name": val.name,
                "price": val.price,
                "image_url": val.image_url,
                "sale_active": val.sale_active,
                "amount": val.amount
            }
            product.push(storeProduct);
        }

        return product as GetProduct[];
    }

    public mapperReqProduct(req: any): GetProduct {
        const product: GetProduct = {
            "name": req.name,
            "price": req.price,
            "image_url": req.image_url,
            "sale_active": req.sale_active === true ? 1 : 0,
            "amount": req.amount
        } as GetProduct;

        return product;
    }

    public mapperUpdateProduct(req: any): GetProduct {
        const product: GetProduct = {
            "product_id": req.product_id,
            "name": req.name,
            "price": req.price,
            "image_url": req.image_url,
            "sale_active": req.sale_active === true ? 1 : 0,
            "amount": req.amount
        } as GetProduct;

        return product;
    }

    public mapperDeleteProduct(req: any): number {
        return parseInt(req.replace("/", ""));
    }
}