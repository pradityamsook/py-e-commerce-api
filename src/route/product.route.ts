import { Router } from "express";
import jwt = require("jsonwebtoken");
import bcrypt = require("bcrypt");
import { ProductController } from "../modules/products/controller/product.controller";
import { upload } from "../middleware/upload-image.middleware";

export const productRoute = Router();

const productController = new ProductController();

productRoute.get("/", productController.getProduct);
productRoute.get("/{productId}/", productController.getProduct);
productRoute.post("/", upload.single("image"), productController.createProduct);
productRoute.put("/", upload.single("image"), productController.updateProduct);
productRoute.delete("/:id", productController.deleteProduct);
// productRoute.get("/image/:id", productController.getImage);
// productRoute.post("image", uploadImageMiddleware.upload.single("image"), productController.uploadImage);