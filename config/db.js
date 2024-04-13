const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected");
  } catch (err) {
    console.log("Error connecting DB");
  }
};

module.exports = connectDB;
