import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const method = req.method;
    const url = req.originalUrl;
    const timestamp = new Date().toISOString();
  
    res.on("finish", () => {
      const duration = Date.now() - start;
      const status = res.statusCode;
      console.log(
        `[${timestamp}] ${method} ${url} → ${status} (${duration}ms)`
      );
    });
  
    next();
  };

  export default logger; 