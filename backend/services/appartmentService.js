"use strict";

const Appartment = require("../models/apartmentModel"); // Get Data Models

class ApartmentService {
  constructor(model) {
    this.model = Appartment;
  }
  // Get all the appartments
  async getAll() {
    return await this.model.find({});
  }
  // Get single appartment
  async getById(id) {
    return await this.model.findById({ _id: id });
  }

  // Get all the favorite appartments
  async getFavoriteAppartment() {
    return await this.model.find({ favorite: "true" });
  }

  // Get appartments by filters
  async getAppartmentByFilters(args) {
    const { room, city, country, countryCode, streetName, formattedAddress } =
      args;
    return await Appartment.find({
      $or: [
        { city: city },
        { country: country },
        { countryCode: countryCode },
        { streetName: streetName },
        { formattedAddress: formattedAddress },
      ],
    });
  }

  // New appartment creation
  async createAppartment(data) {
    return await this.model(data).save();
  }
  // Update appartment
  async updateAppartment(id, data) {
    return await this.model.findOneAndUpdate({ _id: id }, { $set: data }); //$set operator is used to replace the value of a field to the specified value
  }
}

module.exports = new ApartmentService();
