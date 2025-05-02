"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = exports.logIn = void 0;
const database_config_1 = __importDefault(require("../utils/database.config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({
                message: "Invalid input, please provide both username and password.",
            });
            return;
        }
        const user = yield database_config_1.default.login.findFirst({
            where: {
                username: username,
            },
        });
        if (!user) {
            res.status(401).json({
                message: "Invalid credentials.",
            });
            return;
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(401).json({
                message: "Password is incorrect.",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            username: user.username,
        }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        res.status(200).json({
            message: "User logged in successfully.",
            data: {
                token,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.logIn = logIn;
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        res.status(200).json({
            message: "User details retrived successfully",
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error instanceof Error ? error.message : error
        });
    }
});
exports.getUserDetails = getUserDetails;
