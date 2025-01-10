let mongoose = require("mongoose");

const enquerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("user_enquery", enquerySchema);