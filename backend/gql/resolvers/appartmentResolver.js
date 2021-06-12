"use strict";

const AppartmentService = require("../../services/appartmentService");

class UserResolver {
  getAll = async () => {
    return await AppartmentService.getAll();
  };

  getById = async (params) => {
    return await AppartmentService.getById(params.id);
  };

  getFavoriteAppartment = async () => {
    return await AppartmentService.getFavoriteAppartment();
  };

  createAppartment = async (data, user) => {
    try {
      const result = await AppartmentService.createAppartment(data, user);
      if (result) {
        return result;
      } else {
        return new Error("Registration is not successfull.");
      }
    } catch (error) {
      return error;
    }
  };
}

module.exports = new UserResolver();
