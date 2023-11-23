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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const userControllers_1 = require("./userControllers");
const mssql_1 = __importDefault(require("mssql"));
describe("Register a new User", () => {
    it("registers a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                userName: "Robinson Ngechu",
                email: "robinson@gmail.com",
                password: "hashedPassword",
                phone_no: "0700123456",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        //Mocking bcrypt
        // jest.mock("bcrypt", () => ({
        //   hash: jest.fn().mockResolvedValue("hashedPassword_pppp_yyyyy_tttt"),
        // }));
        jest.spyOn(bcrypt_1.default, "hash").mockResolvedValueOnce("hashedPassword");
        //mocking uuid
        jest.mock("uuid", () => ({
            v4: jest.fn(),
        }));
        // const mockedbcypt = jest.requireMock("bcrypt").bcrypt;
        // mockedbcypt.mockImplementation(() => "hashedpassword123");
        const mockedInput = jest.fn().mockReturnThis(); //makes it chainable
        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute,
        };
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest),
        };
        jest.spyOn(mssql_1.default, "connect").mockResolvedValue(mockedPool);
        yield (0, userControllers_1.registerUser)(req, res);
        //ASSERTIONS
        expect(res.json).toHaveBeenCalledWith({
            message: "User registered successfully",
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(mockedInput).toHaveBeenCalledWith("userName", mssql_1.default.VarChar, "Robinson Ngechu");
        expect(mockedInput).toHaveBeenCalledWith("email", mssql_1.default.VarChar, "robinson@gmail.com");
        expect(mockedInput).toHaveBeenCalledWith("password", mssql_1.default.VarChar, "hashedPassword");
        expect(mockedInput).toHaveBeenCalledWith("phone_no", mssql_1.default.VarChar, "0700123456");
    }));
});
describe("Login user", () => {
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });
    it("checks if user exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: "correctEmail@gmail.com",
                password: "correctPassword",
            },
        };
    }));
    it("checks if password is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: "correctEmail@gmail.com",
                password: "wrongPassword",
            },
        };
        jest.spyOn(mssql_1.default, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: [
                    {
                        email: "correct@email.com",
                        password: "hashedPwd",
                    },
                ],
            }),
        });
        jest.spyOn(bcrypt_1.default, "compare").mockResolvedValueOnce(false);
        yield (0, userControllers_1.loginUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            message: "Incorrect password",
        });
    }));
    // it("logs a user and returns a token", async () => { 
    let expecctedUser = {
        userID: '9a055430-5a71-4645-b949-d38732244269',
        userName: 'Jane Doe',
        email: 'janr@gmail.com',
        phone_no: '0710000000',
        password: '$2b$08$THljbFjhzknBoGrm0.UnXegBeKjb/ks/r8GvyNFw3k4gMAQ.zzvB2',
        role: 'admin',
        isDeleted: false,
        Welcomed: false
    };
    //   const req = {
    //     body: {
    //       email: '9superbikes@gmail.com',
    //       role: 'admin',
    //       isDeleted: false,
    //       resetPassword: false,
    //       Welcomed: false
    //     }
    //   }
    // })
});
