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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.deleteUser = exports.updateUserDetails = exports.getOneUser = exports.checkUserDetails = exports.getAllUsers = exports.loginUser = exports.registerUser = exports.TestApi = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sqlConfig_1 = require("../config/sqlConfig");
const userValidator_1 = require("../Validators/userValidator");
const dbHelper_1 = require("../helpers/dbHelper");
const TestApi = (req, res) => {
    res.send(res.send({ status: "ok!" }));
};
exports.TestApi = TestApi;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { userName, email, password, phone_no } = req.body;
        // console.log(req.body);
        const { error } = userValidator_1.userRegisterValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        // console.log(error);
        let userID = (0, uuid_1.v4)();
        const hashedPwd = yield bcrypt_1.default.hash(password, 8);
        const Procedure1 = "getUserByEmail";
        const Param = { email };
        const result = yield (0, dbHelper_1.execute)(Procedure1, Param);
        const user = result.recordset[0];
        // console.log(user);
        if (user) {
            return res.json({ error: "Email already exists. User not registered." });
        }
        else {
            const procedureName2 = "registerUser";
            const params = {
                userID,
                userName,
                email,
                phone_no,
                password: hashedPwd,
            };
            console.log("here");
            yield (0, dbHelper_1.execute)(procedureName2, params);
            res.status(200).json({
                message: "user registered successfully",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.registerUser = registerUser;
//LOGIN USER
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { error } = userValidator_1.userLoginValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        console.log(email, password);
        let user = yield (yield pool
            .request()
            .input("email", mssql_1.default.VarChar, email)
            .input("password", mssql_1.default.VarChar, password)
            .execute("loginUser")).recordset;
        if (user.length === 1) {
            const correctPwd = yield bcrypt_1.default.compare(password, user[0].password);
            if (!correctPwd) {
                return res.status(401).json({
                    message: "Incorrect password",
                });
            }
            const loginCredentials = user.map((record) => {
                const { phone_no, id_no, password } = record, rest = __rest(record, ["phone_no", "id_no", "password"]);
                return rest;
            });
            const token = jsonwebtoken_1.default.sign(loginCredentials[0], process.env.SECRET, {
                expiresIn: "86400s",
            });
            return res.status(200).json({
                message: "Logged in successfully",
                token,
            });
        }
        else {
            return res.status(401).json({
                message: "Email not found",
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.loginUser = loginUser;
//GET ALL USERS
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        let users = (yield pool.request().execute("fetchAllUsers")).recordset;
        return res.json({
            users: users,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error,
        });
    }
});
exports.getAllUsers = getAllUsers;
//CHECK USER DETAILS
const checkUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        return res.json({
            info: req.info,
        });
    }
});
exports.checkUserDetails = checkUserDetails;
//GET SINGLE USER
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const singleUser = yield pool
            .request()
            .input("email", mssql_1.default.VarChar, email)
            .execute("getSingleUser");
        console.log(singleUser);
        return res.status(200).json({
            user: singleUser,
            message: "Single User retrieved successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
});
exports.getOneUser = getOneUser;
//UPDATE USER
const updateUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, userName } = req.body;
        if (!userID || !userName) {
            return res.status(400).json({
                error: "Invalid request",
                details: "Both userID and userName are required for updating user details.",
            });
        }
        const updatedUser = {
            userID,
            userName,
            // email,
        };
        const updateuserprocedureName = "updateUserDetails";
        const params = updatedUser;
        yield (0, dbHelper_1.execute)(updateuserprocedureName, params);
        return res.send({ message: "User updated successfully" });
    }
    catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).send({
            error: "Internal server error"
        });
    }
});
exports.updateUserDetails = updateUserDetails;
//DELETE USER
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.id;
        if (!userID) {
            return res.send({ message: "enter id" });
        }
        const result = yield (0, dbHelper_1.execute)("deleteUser", { userID });
        console.log(result.recordset);
        // res.send({ message:"user deleted successfuly"})
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
});
exports.deleteUser = deleteUser;
//FORGOT PASSWORD
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        console.log(email);
        if (!email)
            return res.status(400).send({ message: "email is required" });
        console.log("here");
        //PART STARTS HERE
        // if (updatepassword.rowsAffected[0] > 0) {
        //   return res.json({
        //     message: "Password updated successfully",
        //   });
        // } else {
        //   return res.status(400).json({
        //     error: "Password update failed",
        //     details: "An error occurred while updating the password.",
        //   });
        // }
        //PART ENDS HERE
    }
    catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updatePassword = updatePassword;
// export const updatePassword = async (req: Request, res: Response) => {
//   try {
//     const { userID, password } = req.body;
//     const pool = await mssql.connect(sqlConfig);
//     const updatepassword = await pool
//       .request()
//       .input("password", mssql.VarChar, password)
//       .execute("UpdatePassword");
//     if (updatepassword.rowsAffected[0] > 0) {
//       return res.json({
//         message: "Password updated successfully",
//       });
//     } else {
//       return res.status(400).json({
//         error: "Password update failed",
//         details: "An error occurred while updating the password.",
//       });
//     }
//   } catch (error) {
//     console.error("Error updating password:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
