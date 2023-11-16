"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBookID = exports.bookingValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.bookingValidation = joi_1.default.object().keys({
    tourID: joi_1.default.string().required(),
    userID: joi_1.default.string().required(),
    totalBookCount: joi_1.default.number().min(1).required(),
    totalprice: joi_1.default.number().required()
});
exports.validateBookID = joi_1.default.object().keys({
    bookID: joi_1.default.string().min(8).required(),
});
