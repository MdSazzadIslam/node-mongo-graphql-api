"use strict";

const AppartmentService = require("../services/appartmentService");

class ApartmentController {
  getAll = async () => {
    return await AppartmentService.getAll();
  };

  getById = async (id) => {
    return await AppartmentService.getById(id);
  };

  getFavoriteAppartment = async () => {
    return await AppartmentService.getFavoriteAppartment();
  };

  createAppartment = async (data, id) => {
    const newData = {
      name: data.name,
      room: data.room,
      address: data.address,
      description: data.description,
      userId: id,
    };

    return await AppartmentService.createAppartment(newData);
  };

  updateAppartment = async (data) => {
    const isAppartmentExists = await AppartmentService.getById(data.id);
    console.log("Before", isAppartmentExists);
    if (isAppartmentExists) {
      Object.keys(data).map((field) => {
        isAppartmentExists[field] = data[field];
      });

      console.log("After", isAppartmentExists);

      return await AppartmentService.updateAppartment(
        data.id,
        isAppartmentExists
      );
    } else {
      throw new Error({ msg: "Record not found" });
    }
  };
}

module.exports = new ApartmentController();
