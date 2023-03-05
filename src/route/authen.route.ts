import express = require("express");
import { Router } from "express";
import jwt = require("jsonwebtoken");
import bcrypt = require("bcrypt");
import { AuthenticateController } from "../modules/authenticaion/controller/authen.controller";

export const authenRoute = Router();

const authenticationController = new AuthenticateController();
authenRoute.post("/login", authenticationController.login);
authenRoute.get("/", authenticationController.hello);