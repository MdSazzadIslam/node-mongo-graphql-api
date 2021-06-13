const User = require("../models/userModel"); // Get Data Models

class UserService {
  constructor(model) {
    this.model = User;
  }
  // Get all users
  async getAll() {
    return await this.model.find({});
  }
  // Get single users
  async getById(id) {
    return await this.model.findById({ _id: id });
  }

  // User registration
  async registration(data) {
    return await this.model(data).save();
  }

  //Checking whether user exists or not
  async isEmailExists(email) {
    return await this.model.findOne({ email });
  }

  // User login
  async login(data) {
    const { email, password } = data;
    return await this.model.findOne({ email }).select("+password");
  }
}

module.exports = new UserService();
