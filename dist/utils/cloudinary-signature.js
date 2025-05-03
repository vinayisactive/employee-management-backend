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
exports.generateSignature = void 0;
const generateSignature = (params, apiSecret) => __awaiter(void 0, void 0, void 0, function* () {
    const keys = Object.keys(params).sort();
    const signatureString = keys
        .filter(key => params[key] !== undefined && params[key] !== null && key !== 'file')
        .map(key => `${key}=${params[key]}`)
        .join('&');
    const msgUint8 = new TextEncoder().encode(signatureString + apiSecret);
    const hashBuffer = yield crypto.subtle.digest('SHA-1', msgUint8);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
});
exports.generateSignature = generateSignature;
