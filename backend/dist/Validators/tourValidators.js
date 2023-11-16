"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTourId = exports.addtourValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addtourValidationSchema = joi_1.default.object({
    imageUrl: joi_1.default.string().required(),
    tourName: joi_1.default.string().required().min(2),
    tourDescription: joi_1.default.string().required().min(2),
    tourPrice: joi_1.default.string().required(),
    tourStartDate: joi_1.default.string().required(),
    tourEndDateName: joi_1.default.string().required(),
    tourCount: joi_1.default.string().required(),
});
exports.validateTourId = joi_1.default.object().keys({
    tourID: joi_1.default.string().required(),
});
