"use strict";

const UserService = require("../../services/userService");
const generateToken = require("../../middlewares/generateToken");
const matchPassword = require("../../middlewares/matchPassword");
const hashPassword = require("../../middlewares/hashPassword");

class UserResolver {
  getAll = async () => {
    return await UserService.getAll();
  };

  getById = async (params) => {
    return await UserService.getById(params.id);
  };

  login = async (data) => {
    // this will find a single record based on email and password return it.
    const { email, password } = data;
    const isExists = await UserService.isEmailExists(email);

    if (isExists) {
      var isValid = await matchPassword(password, isExists.password);

      if (!isValid) {
        throw new Error("Incorrect password");
      }

      const token = await generateToken(isExists._id, isExists.email); //creating token to pass identity of authenticated users
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
    const { name, email, password } = data;
    const isExists = await UserService.isEmailExists(email);

    if (!isExists) {
      const newPassword = await hashPassword(
        password,
        10 //saltRounds = 10;
      );

      const newUser = {
        name,
        email,
        password: newPassword,
      };

      try {
        const result = await UserService.registration(newUser);
        if (result) {
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
