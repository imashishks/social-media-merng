const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { SECRET_KEY, SALT } = require("../../config");
const { UserInputError } = require("apollo-server");
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
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is already taken", {
          error: "Uername is already taken",
        });
      }
      const hashedPassword = await bcrypt.hash(password, SALT);
      const createdUser = new User({
        username,
        hashedPassword,
        email,
        createdAt: new Date().toISOString(),
      });
      //save data to mongodb
      const response = await createdUser.save();
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
