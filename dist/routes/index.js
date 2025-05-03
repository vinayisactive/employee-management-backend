"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth-routes"));
const employee_routes_1 = __importDefault(require("./employee-routes"));
const media_routes_1 = __importDefault(require("./media-routes"));
const apiV1Router = (0, express_1.Router)();
apiV1Router.use("/auth", auth_routes_1.default);
apiV1Router.use("/employees", employee_routes_1.default);
apiV1Router.use("/media", media_routes_1.default);
exports.default = apiV1Router;
