import { Request, Response } from "express";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { loginUser, registerUser } from "./userControllers";
import mssql from "mssql";

describe("Register a new User", () => {
  it("registers a new user", async () => {
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

    jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("hashedPassword" as never);

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
    jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never);
    await registerUser(req as Request, res as any);

    //ASSERTIONS
    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockedInput).toHaveBeenCalledWith(
      "userName",
      mssql.VarChar,
      "Robinson Ngechu"
    );
    expect(mockedInput).toHaveBeenCalledWith(
      "email",
      mssql.VarChar,
      "robinson@gmail.com"
    );
    expect(mockedInput).toHaveBeenCalledWith(
      "password",
      mssql.VarChar,
      "hashedPassword"
    );
    expect(mockedInput).toHaveBeenCalledWith(
      "phone_no",
      mssql.VarChar,
      "0700123456"
    );
  });
});

describe("Login user", () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("checks if user exists", async () => {
    const req = {
      body: {
        email: "correctEmail@gmail.com",
        password: "correctPassword",
      },
    };
  });

  it("checks if password is correct", async () => {
    const req = {
      body: {
        email: "correctEmail@gmail.com",
        password: "wrongPassword",
      },
    };
    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
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
    } as never);

    jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false as never);
    
    await loginUser(req as Request, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Incorrect password",
    });
  });

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
  }
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
