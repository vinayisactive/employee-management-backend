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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreSignedUrl = void 0;
const cloudinary_signature_1 = require("../utils/cloudinary-signature");
const uuid_1 = require("uuid");
const getPreSignedUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileId = (0, uuid_1.v4)();
        const resourceType = "image";
        const publicId = fileId;
        const timestamp = Math.round(new Date().getTime() / 1000);
        const fields = {
            api_key: process.env.CLOUDINARY_API_KEY,
            timestamp: timestamp.toString(),
            public_id: publicId,
            signature: yield (0, cloudinary_signature_1.generateSignature)({ timestamp, public_id: publicId }, process.env.CLOUDINARY_API_SECRET)
        };
        res.status(200).json({
            data: {
                url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
                fields,
                imageUrl: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/v1/${publicId}`
            }
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Something went wrong.",
            error: err instanceof Error ? err.message : err,
        });
    }
});
exports.getPreSignedUrl = getPreSignedUrl;
