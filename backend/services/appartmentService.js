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
    const newAppartment = new this.model({
      name: data.name,
      room: data.room,
      address: data.address,
      userId: data.userId,
    });

    return await newAppartment.save();
  }
}

module.exports = new ApartmentService();
