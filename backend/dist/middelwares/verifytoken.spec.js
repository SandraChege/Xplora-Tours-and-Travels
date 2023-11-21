"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifytoken_1 = require("./verifytoken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * 1. Import all dependencies
 * a)Mock request
 * b) create mock response
 * */
//create request
let mockRequest = () => {
    return {
        headers: {
            token: "valid_token_mocked_for_testing_eeee_sdfghjkl",
        },
    };
};
//create mock response
let mockResponse = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    };
};
let mockNext = jest.fn();
describe('Testing the middleware', () => {
    //TEST CASE 1: CHECK IF TOKEN IS MISSING
    it("if token is missing throw an error", () => {
        let req = {
            headers: {},
        };
        let res = mockResponse();
        let next = mockNext();
        (0, verifytoken_1.verifyToken)(req, res, next);
        expect(res.json).toHaveBeenCalledWith({
            message: "You do not have access",
        });
    });
    it("authorises the user", () => {
        let mockUser = {
            employee_id: "dfe28d07-2a3a-47f4-900c-cf376e1998db",
            name: "Daniel Kitheka",
            email: "dan@yopmail.com",
            role: "employee",
            isDeleted: true,
        };
        let outputResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            info: mockUser,
        };
        jest
            .spyOn(jsonwebtoken_1.default, "verify")
            .mockResolvedValueOnce({ outputResponse });
        (0, verifytoken_1.verifyToken)(mockRequest, outputResponse, mockNext);
        expect(mockNext).toHaveBeenCalled();
    });
});
