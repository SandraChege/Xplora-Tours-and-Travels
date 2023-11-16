import { Request, Response } from "express";
import mssql from "mssql";

import { v4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sqlConfig } from "../config/sqlConfig";
import {
  userLoginValidationSchema,
  userRegisterValidationSchema,
} from "../Validators/userValidator";
import { ExtendedUser } from "../middelwares/verifytoken";
import { execute } from "../helpers/dbHelper";
import { updatUser } from "../interface/user";

export const TestApi = (req: Request, res: Response) => {
  res.send(res.send({ status: "ok!" }));
};

//REGISTER USER

// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     let { userName, email, password, phone_no } = req.body;

//     const { error } = userRegisterValidationSchema.validate(req.body);

//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     let userID = v4();
//     const hashedPwd = await bcrypt.hash(password, 8);

//     const pool = await mssql.connect(sqlConfig);

//     const checkEmailQuery = `SELECT 1 FROM Users WHERE email = @email`;
//     const emailCheckResult = await pool
//       .request()
//       .input("email", mssql.VarChar, email)
//       .query(checkEmailQuery);

//     if (emailCheckResult.recordset.length > 0) {
//       return res
//         .status(400)
//         .json({ error: "Email already exists. User not registered." });
//     }

//     const registerQuery = `EXEC registerUser @userID, @userName, @email, @password, @phone_no`;

//     const data = await pool
//       .request()
//       .input("userID", mssql.VarChar, userID)
//       .input("userName", mssql.VarChar, userName)
//       .input("email", mssql.VarChar, email)
//       .input("password", mssql.VarChar, hashedPwd)
//       .input("phone_no", mssql.VarChar, phone_no)

//       .query(registerQuery);

//     return res.status(200).json({
//       message: "User registered successfully",
//     });
//   } catch (error) {
//     return res.json({
//       error: error,
//     });
//   }
// };

export const registerUser = async (req: Request, res: Response) => {
  try {
    let { userName, email, password, phone_no } = req.body;

    // console.log(req.body);

    const { error } = userRegisterValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // console.log(error);

    let userID = v4();
    const hashedPwd = await bcrypt.hash(password, 8);

    const Procedure1 = "getUserByEmail";
    const Param = { email };

    const result = await execute(Procedure1, Param);

    const user = result.recordset[0];

    // console.log(user);

    if (user) {
      return res.json({ error: "Email already exists. User not registered." });
    } else {
      const procedureName2 = "registerUser";
      const params = {
        userID,
        userName,
        email,
        phone_no,
        password: hashedPwd,
      };
      console.log("here");

      await execute(procedureName2, params);

      res.status(200).json({
        message: "user registered successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//LOGIN USER

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { error } = userLoginValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const pool = await mssql.connect(sqlConfig);

    console.log(email, password);

    let user = await (
      await pool
        .request()
        .input("email", mssql.VarChar, email)
        .input("password", mssql.VarChar, password)
        .execute("loginUser")
    ).recordset;

    if (user.length === 1) {
      const correctPwd = await bcrypt.compare(password, user[0].password);

      if (!correctPwd) {
        return res.status(401).json({
          message: "Incorrect password",
        });
      }

      const loginCredentials = user.map((record) => {
        const { phone_no, id_no, password, ...rest } = record;
        return rest;
      });

      const token = jwt.sign(
        loginCredentials[0],
        process.env.SECRET as string,
        {
          expiresIn: "86400s",
        }
      );

      return res.status(200).json({
        message: "Logged in successfully",
        token,
      });
    } else {
      return res.status(401).json({
        message: "Email not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//GET ALL USERS
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    let users = (await pool.request().execute("fetchAllUsers")).recordset;
    return res.json({
      users: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error,
    });
  }
};

//CHECK USER DETAILS
export const checkUserDetails = async (req: ExtendedUser, res: Response) => {
  if (req.info) {
    return res.json({
      info: req.info,
    });
  }
};

//GET SINGLE USER
export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const pool = await mssql.connect(sqlConfig);
    const singleUser = await pool
      .request()
      .input("email", mssql.VarChar, email)
      .execute("getSingleUser");
    console.log(singleUser);

    return res.status(200).json({
      user: singleUser,
      message: "Single User retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

//UPDATE USER
export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const { userID, userName, phone_no } = req.body;

    if (!userID || !userName || !phone_no) {
      // const updatedUserDetails: updatUser = {
      //   userID,
      //   userName,
      //   phone_no,
      // };
      // const updateuserprocedureName = "updateUserDetails";
      // const params = updatedUserDetails;
      // const result = await execute(updateuserprocedureName, params);
      // const user = result.recordset[0];
      // console.log(user);
    }
    return res.status(400).json({
      error: "User details update failed",
      details: "An error occurred while updating the user details.",
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userID = req.params.id;

    if (!userID) {
      return res.send({ message: "enter id" });
    }

    const result = await execute("deleteUser", { userID });

    console.log(result.recordset);

    // res.send({ message:"user deleted successfuly"})
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

//FORGOT PASSWORD
export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log(email);
    
    if (!email) return res.status(400).send({ message: "email is required" });
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
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
