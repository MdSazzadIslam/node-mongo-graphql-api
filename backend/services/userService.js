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
    console.log(data);
    const user = new this.model({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    return await user.save();
  }

  //Checking whether user exists or not
  async isEmailExists(data) {
    const { email } = data;
    return await this.model.findOne({ email });
  }

  // User login
  async login(data) {
    const { email, password } = data;
    return await this.model.findOne({ email }).select("+password");
  }
}

module.exports = new UserService();
