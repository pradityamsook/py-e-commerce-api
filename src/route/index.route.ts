import express = require("express");
import { Router } from "express";
import jwt = require("jsonwebtoken");
import bcrypt = require("bcrypt");
import { AuthenticateController } from "../modules/authenticaion/controller/authen.controller";
import { authenRoute } from "./authen.route";

export const route = Router();

route.use("/authenticate", authenRoute);