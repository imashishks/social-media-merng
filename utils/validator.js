module.exports = {
  validator: (username, password, email, confirmPassword) => {
    // check if all fields are empty are not
    // check  if passwords match or not
    // check if email is of correct format or not
    let error = null;
    if (
      !username.trim().length ||
      !email.trim().length ||
      !password.trim().length ||
      !confirmPassword.trim().length
    ) {
      error = {
        message: "Input is invalid",
      };
      return error;
    }
    if (password !== confirmPassword) {
      error = {
        message: "Passwords dont match",
      };
      return error;
    }
    const remailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!remailRegex.test(String(email).toLowerCase())) {
      error = {
        message: "Email is invalid",
      };
      return error;
    }
    return error;
  },
};
