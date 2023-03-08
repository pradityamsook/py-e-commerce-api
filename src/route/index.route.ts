import { Router } from "express";
import jwt = require("jsonwebtoken");
import bcrypt = require("bcrypt");
import { authenRoute } from "./authen.route";
import { productRoute } from "./product.route";

export const route = Router();

route.use("/authenticate", authenRoute);
route.use("/product", productRoute);