"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const media_controllers_1 = require("../controllers/media-controllers");
const mediaRouter = (0, express_1.Router)();
mediaRouter.post("/signed-url", media_controllers_1.getPreSignedUrl);
exports.default = mediaRouter;
