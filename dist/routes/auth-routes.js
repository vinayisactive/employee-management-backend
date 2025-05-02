"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth-controllers");
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
const authRouter = (0, express_1.Router)();
authRouter
    .get("/", auth_middleware_1.default, auth_controllers_1.getUserDetails)
    .post("/login", auth_controllers_1.logIn);
exports.default = authRouter;
