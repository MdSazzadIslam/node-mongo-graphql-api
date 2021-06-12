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

  // New appartment creation
  async createAppartment(data) {
    return await this.model(data).save();
  }
  // Update appartment
  async updateAppartment(id, data) {
    return await this.model.findOneAndUpdate({ _id: id }, { $set: data });
  }
}

module.exports = new ApartmentService();
