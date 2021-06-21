const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { SECRET_KEY, SALT } = require("../../config");
// validate input
// hash the password and create auth token
// make sure user doesnot already exist

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, password, email, confirmPassword } },
      context,
      info
    ) {
      const hashedPassword = await bcrypt.hash(password, SALT);
      const user = new User({
        username,
        hashedPassword,
        email,
        createdAt: new Date().toISOString(),
      });
      //save data to mongodb
      const response = await user.save();
      // generate jwt token
      const token = jwt.sign(
        {
          id: response.id,
          email: response.email,
          username: response.username,
        },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      return {
        ...response._doc,
        token,
        id: response.id,
      };
    },
  },
};
