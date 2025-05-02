"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next) => {
    const start = Date.now();
    const method = req.method;
    const url = req.originalUrl;
    const timestamp = new Date().toISOString();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        console.log(`[${timestamp}] ${method} ${url} → ${status} (${duration}ms)`);
    });
    next();
};
exports.default = logger;
