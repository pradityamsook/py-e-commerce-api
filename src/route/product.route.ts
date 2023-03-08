import { Router } from "express";
import jwt = require("jsonwebtoken");
import bcrypt = require("bcrypt");
import { ProductController } from "../modules/products/controller/product.controller";

export const productRoute = Router();

const productController = new ProductController();
productRoute.get("/", productController.getProduct);
productRoute.post("/", productController.createProduct);
productRoute.put("/", productController.updateProduct);
productRoute.delete("/:id", productController.deleteProduct);