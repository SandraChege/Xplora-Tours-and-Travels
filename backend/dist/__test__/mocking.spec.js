"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
jest.mock("uuid", () => ({
    v4: jest.fn(),
}));
jest.mock("bcrypt", () => ({
    bcrypt: jest.fn(),
}));
//Mocks implementation of uuid
describe("This mocks the uuid ", () => {
    it("generate a unique ID", () => {
        // const id = v4()
        const mockedV4 = jest.requireMock("uuid").v4;
        mockedV4.mockImplementation(() => "uniqueid_werfghjkzsxdfgvbhjnkmdfghn");
        console.log((0, uuid_1.v4)());
    });
});
//Mocks implementation of bcrypt
describe("This mocks bcrypt", () => {
    it("generates a unique password", () => {
        // const password = bcrypt;
        // console.log(bcrypt);
        const mockedbcypt = jest.requireMock("bcrypt").bcrypt;
        mockedbcypt.mockImplementation(() => "hashedpassword123");
        console.log(mockedbcypt());
    });
});
