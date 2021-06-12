"use strict";

const bcrypt = require("bcrypt"); // for storing hash password in the database
const UserService = require("../../services/userService");
const generateToken = require("../../middlewares/generateToken");
const User = require("../../models/userModel");
require("dotenv").config({ path: "../../../.env" });

class UserResolver {
  getAll = async () => {
    return await UserService.getAll();
  };

  getById = async (params) => {
    return await UserService.getById(params.id);
  };

  login = async (data) => {
    // this will find a single record based on email and password return it.
    const isExists = await UserService.isEmailExists(data);
    console.log(isExists.password, data.password);
    if (isExists) {
      const isPasswordValid = bcrypt.compareSync(
        isExists.password,
        data.password
      );
      console.log(isPasswordValid);

      const token = generateToken(isExists._id);
      return {
        token,
        id: isExists.id,
        name: isExists.name,
        email: isExists.email,
        status: isExists.status,
        role: isExists.role,
        msg: "Successfull",
      };
    } else {
      return new Error("Invalid login credentials.");
    }
  };

  registration = async (data) => {
    // this will find a single record based on email and password return it.
    console.log(data);
    const isExists = await UserService.isEmailExists(data);
    console.log(isExists);
    if (!isExists) {
      const passwordHash = await bcrypt.hash(
        data.password,
        10
        //process.env.SALT_WORK_FACTOR
      );
      const newUser = {
        name: data.name,
        email: data.email,
        password: passwordHash,
      };

      try {
        const result = await UserService.registration(data);
        if (result) {
          console.log(result);
          return result;
        } else {
          return new Error("Registration is not successfull.");
        }
      } catch (error) {
        return error;
      }
    } else {
      return new Error("Email already used");
    }
  };
}

module.exports = new UserResolver();
