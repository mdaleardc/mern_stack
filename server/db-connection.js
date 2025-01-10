let mongoose = require("mongoose");
require("dotenv").config();


const uri = process.env.DB_URI;

module.exports = async () => {
  try {
  await mongoose.connect(uri);
  console.log(`Databse is connect with ${mongoose.connection.host}`);
  } catch (err) {
    console.error("Databse connection error: ", err.message);
  }
}