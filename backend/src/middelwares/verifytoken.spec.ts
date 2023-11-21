import { verifyToken } from "./verifytoken";
import { Request } from "express";
import jwt from "jsonwebtoken";
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

let mockNext = jest.fn()

describe('Testing the middleware', () => {

    //TEST CASE 1: CHECK IF TOKEN IS MISSING
    it("if token is missing throw an error", () => {
      let req = {
        headers: {},
      };

      let res = mockResponse();

      let next = mockNext();

      verifyToken(req as Request, res as any, next);

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
        .spyOn(jwt, "verify")
        .mockResolvedValueOnce({ outputResponse } as never);

      verifyToken(mockRequest as any, outputResponse as any, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
})