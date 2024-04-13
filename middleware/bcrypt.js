const bcrypt = require("bcryptjs");

// Function to hash the password
const hashPassword = async (password) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

// Function to compare passwords
const comparePasswords = async (password, hashedPassword) => {
  try {
    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

module.exports = { hashPassword, comparePasswords };
