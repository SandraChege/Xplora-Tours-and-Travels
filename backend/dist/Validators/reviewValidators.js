"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaterReviewId = exports.addreviewValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addreviewValidationSchema = joi_1.default.object({
    reviewContent: joi_1.default.string().required(),
    tourID: joi_1.default.string().required(),
    userID: joi_1.default.string().required(),
});
exports.validaterReviewId = joi_1.default.object().keys({
    reviewID: joi_1.default.string().required(),
});
